# prometheus_merged.py
# Merged futuristic GUI + Prometheus AI features
# Save next to optional files: thinking.gif, model.h5, label_map.pkl, user_photo.jpg

import sys, os, time, datetime, threading
from collections import deque

import cv2
import numpy as np
import psutil
from PIL import Image
from PyQt6 import QtCore, QtGui, QtWidgets
import pyqtgraph as pg

# try optional libraries
MEDIA_PIPE_AVAILABLE = False
SPEECH_AVAILABLE = False
TTS_AVAILABLE = False
TF_AVAILABLE = False

try:
    import mediapipe as mp
    MEDIA_PIPE_AVAILABLE = True
    mp_hands = mp.solutions.hands
except Exception:
    MEDIA_PIPE_AVAILABLE = False

try:
    import speech_recognition as sr
    SPEECH_AVAILABLE = True
except Exception:
    SPEECH_AVAILABLE = False

try:
    import pyttsx3
    tts_engine = pyttsx3.init()
    TTS_AVAILABLE = True
except Exception:
    TTS_AVAILABLE = False

try:
    import tensorflow as tf
    from tensorflow.keras.models import load_model
    TF_AVAILABLE = True
except Exception:
    TF_AVAILABLE = False

import pickle

# ---------------- Helpers ----------------
def cvimg_to_qt(img_bgr):
    img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
    h, w, ch = img_rgb.shape
    bytes_per_line = ch * w
    qimg = QtGui.QImage(img_rgb.data, w, h, bytes_per_line, QtGui.QImage.Format.Format_RGB888)
    return QtGui.QPixmap.fromImage(qimg)

# Optional: load trained model (if exists)
MODEL = None
LABEL_ENCODER = None
MODEL_PATH = "model.h5"
LABEL_MAP_PATH = "label_map.pkl"

if TF_AVAILABLE and os.path.exists(MODEL_PATH):
    try:
        MODEL = load_model(MODEL_PATH)
        print("Loaded model:", MODEL_PATH)
    except Exception as e:
        print("Failed to load model.h5:", e)
        MODEL = None

if os.path.exists(LABEL_MAP_PATH):
    try:
        with open(LABEL_MAP_PATH, "rb") as f:
            LABEL_ENCODER = pickle.load(f)
        print("Loaded label map:", LABEL_MAP_PATH)
    except Exception as e:
        print("Failed to load label_map.pkl:", e)
        LABEL_ENCODER = None

# Convert mediapipe landmarks list -> feature vector for model
def landmarks_to_vector(landmarks):
    # landmarks: list of landmark objects with .x, .y (and .z)
    vec = []
    for lm in landmarks:
        vec.append(lm.x)
        vec.append(lm.y)
        # include z if model expects it; comment out if not
        # vec.append(lm.z)
    return np.array(vec, dtype=np.float32)

# Classifier that uses MODEL if available, else simple heuristic
def classify_gesture(landmarks):
    try:
        if MODEL is not None and LABEL_ENCODER is not None:
            vec = landmarks_to_vector(landmarks)  # shape (42,) or (63,)
            vec = vec.reshape(1, -1)
            preds = MODEL.predict(vec)
            idx = int(np.argmax(preds, axis=1)[0])
            label = LABEL_ENCODER.inverse_transform([idx])[0] if hasattr(LABEL_ENCODER, "inverse_transform") else str(idx)
            return label.upper()
        else:
            # fallback heuristic: index tip above middle tip => HELLO (very naive)
            idx = landmarks[8]
            mid = landmarks[12]
            if idx.y < mid.y:
                return "HELLO"
            return "UNKNOWN"
    except Exception as e:
        print("classify_gesture error:", e)
        return "UNKNOWN"

# ---------------- Video Thread ----------------
class VideoThread(QtCore.QThread):
    frame_data = QtCore.pyqtSignal(np.ndarray)
    gesture_detected = QtCore.pyqtSignal(str)

    def _init_(self, use_mediapipe=True, parent=None):
        super()._init_(parent)
        self._run_flag = False
        self._pause = False
        self.cap = None
        self.use_mediapipe = use_mediapipe and MEDIA_PIPE_AVAILABLE
        self.mp_instance = None
        if self.use_mediapipe:
            self.mp_instance = mp_hands.Hands(static_image_mode=False,
                                              max_num_hands=1,
                                              min_detection_confidence=0.6,
                                              min_tracking_confidence=0.5)

    def run(self):
        self.cap = cv2.VideoCapture(0, cv2.CAP_DSHOW if sys.platform.startswith("win") else 0)
        self._run_flag = True
        while self._run_flag:
            if self._pause:
                time.sleep(0.05)
                continue
            ret, frame = self.cap.read()
            if not ret:
                time.sleep(0.05)
                continue
            frame = cv2.flip(frame, 1)
            if self.use_mediapipe and self.mp_instance:
                img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                results = self.mp_instance.process(img_rgb)
                if results.multi_hand_landmarks:
                    for hand_landmarks in results.multi_hand_landmarks:
                        mp.solutions.drawing_utils.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)
                        gesture = classify_gesture(hand_landmarks.landmark)
                        self.gesture_detected.emit(gesture)
            self.frame_data.emit(frame)
            time.sleep(0.02)
        if self.cap:
            self.cap.release()

    def stop(self):
        self._run_flag = False
        self.wait()

    def pause(self, toggle=True):
        self._pause = toggle

# ---------------- Main window ----------------
class PrometheusWindow(QtWidgets.QMainWindow):
    def _init_(self):
        super()._init_()
        self.setWindowTitle("Prometheus - Merged")
        self.setMinimumSize(1200, 760)
        # frameless + draggable if you like; keep default for simplicity
        self.central = QtWidgets.QWidget()
        self.setCentralWidget(self.central)
        self.layout = QtWidgets.QVBoxLayout(self.central)
        self.layout.setContentsMargins(8,8,8,8)
        self._build_ui()

        # state
        self.video_thread = None
        self.prev_chats = deque(maxlen=400)
        self.last_net = psutil.net_io_counters()
        self.last_net_time = time.time()

        # timers
        self.status_timer = QtCore.QTimer()
        self.status_timer.timeout.connect(self._update_machine_stats)
        self.status_timer.start(900)
        self.clock_timer = QtCore.QTimer()
        self.clock_timer.timeout.connect(self._update_clock)
        self.clock_timer.start(1000)

    def _build_ui(self):
        # Top heading
        top = QtWidgets.QLabel("PROMETHEUS")
        top.setAlignment(QtCore.Qt.AlignmentFlag.AlignCenter)
        top.setStyleSheet("font-size:32px; font-weight:800; color: qlineargradient(spread:pad, x1:0, y1:0, x2:1, y2:0, stop:0 #7bdff6, stop:1 #4a6cff);")
        self.layout.addWidget(top)

        # Middle layout
        mid = QtWidgets.QHBoxLayout()
        # Left panel
        left_panel = QtWidgets.QFrame()
        left_panel.setMinimumWidth(300)
        left_layout = QtWidgets.QVBoxLayout(left_panel)
        # Photo
        photo = QtWidgets.QLabel()
        photo.setFixedSize(160,160)
        photo.setStyleSheet("border-radius:80px; background:#222;")
        if os.path.exists("user_photo.jpg"):
            pix = QtGui.QPixmap("user_photo.jpg").scaled(160,160, QtCore.Qt.AspectRatioMode.KeepAspectRatioByExpanding)
            photo.setPixmap(pix)
        left_layout.addWidget(photo, alignment=QtCore.Qt.AlignmentFlag.AlignCenter)
        self.name_label = QtWidgets.QLabel("Name: Neel Agrawal")
        left_layout.addWidget(self.name_label)
        self.age_label = QtWidgets.QLabel("Age: 18")
        left_layout.addWidget(self.age_label)
        self.date_label = QtWidgets.QLabel("Date: --")
        self.time_label = QtWidgets.QLabel("Time: --")
        left_layout.addWidget(self.date_label)
        left_layout.addWidget(self.time_label)

        # machine status in bottom-left
        left_layout.addSpacing(8)
        self.cpu_label = QtWidgets.QLabel("CPU %: --")
        self.cpu_freq_label = QtWidgets.QLabel("CPU Speed: --")
        self.cpu_temp_label = QtWidgets.QLabel("CPU Temp: --")
        self.ram_label = QtWidgets.QLabel("RAM %: --")
        self.disk_label = QtWidgets.QLabel("Disk %: --")
        self.batt_label = QtWidgets.QLabel("Battery: --")
        self.net_label = QtWidgets.QLabel("Net: --")
        for w in (self.cpu_label, self.cpu_freq_label, self.cpu_temp_label, self.ram_label, self.disk_label, self.batt_label, self.net_label):
            left_layout.addWidget(w)
        mid.addWidget(left_panel)

        # Center panel: webcam + output (webcam ~55%, output ~45%)
        center_panel = QtWidgets.QFrame()
        center_layout = QtWidgets.QHBoxLayout(center_panel)

        # Webcam frame
        cam_frame = QtWidgets.QFrame()
        cam_layout = QtWidgets.QVBoxLayout(cam_frame)
        cam_label = QtWidgets.QLabel("Webcam Input")
        cam_layout.addWidget(cam_label)
        self.webcam_label = QtWidgets.QLabel()
        self.webcam_label.setFixedSize(640,480)
        placeholder = QtGui.QPixmap(640,480); placeholder.fill(QtGui.QColor("#000"))
        self.webcam_label.setPixmap(placeholder)
        cam_layout.addWidget(self.webcam_label)
        center_layout.addWidget(cam_frame, stretch=55)

        # Output panel
        out_frame = QtWidgets.QFrame()
        out_layout = QtWidgets.QVBoxLayout(out_frame)
        out_title = QtWidgets.QLabel("Assistant Output")
        out_layout.addWidget(out_title)
        self.output_text = QtWidgets.QTextEdit()
        self.output_text.setReadOnly(True)
        out_layout.addWidget(self.output_text)
        # thinking animation area
        self.movie_label = QtWidgets.QLabel(); self.movie_label.setFixedSize(160,120)
        out_layout.addWidget(self.movie_label, alignment=QtCore.Qt.AlignmentFlag.AlignCenter)
        # load GIF if available
        if os.path.exists("thinking.gif"):
            try:
                self.movie = QtGui.QMovie("thinking.gif")
                self.movie_label.setMovie(self.movie)
            except Exception:
                self.movie = None
        else:
            self.movie = None
        center_layout.addWidget(out_frame, stretch=45)
        mid.addWidget(center_panel, stretch=1)

        # Right panel - previous chats
        right_panel = QtWidgets.QFrame()
        right_panel.setFixedWidth(320)
        rp_layout = QtWidgets.QVBoxLayout(right_panel)
        rp_layout.addWidget(QtWidgets.QLabel("Previous Chats"))
        self.prev_list = QtWidgets.QListWidget()
        rp_layout.addWidget(self.prev_list)
        mid.addWidget(right_panel)

        self.layout.addLayout(mid)

        # Bottom controls
        bottom = QtWidgets.QFrame()
        b_layout = QtWidgets.QHBoxLayout(bottom)
        # left machine summary
        self.status_summary = QtWidgets.QLabel("CPU: -- | RAM: -- | Disk: --")
        b_layout.addWidget(self.status_summary, stretch=2)
        # control buttons
        btns = QtWidgets.QFrame()
        btn_layout = QtWidgets.QHBoxLayout(btns)
        style_btn = "padding:8px; font-weight:700;"
        self.btn_start = QtWidgets.QPushButton("Start"); self.btn_start.setStyleSheet(style_btn); self.btn_start.clicked.connect(self.start_camera)
        self.btn_pause = QtWidgets.QPushButton("Pause"); self.btn_pause.setStyleSheet(style_btn); self.btn_pause.clicked.connect(self.pause_camera)
        self.btn_stop = QtWidgets.QPushButton("Stop"); self.btn_stop.setStyleSheet(style_btn); self.btn_stop.clicked.connect(self.stop_camera)
        self.btn_close = QtWidgets.QPushButton("Close"); self.btn_close.setStyleSheet(style_btn); self.btn_close.clicked.connect(self.close_app)
        self.btn_mic = QtWidgets.QPushButton("Mic"); self.btn_mic.setStyleSheet(style_btn); self.btn_mic.clicked.connect(self._on_mic)
        self.btn_hand = QtWidgets.QPushButton("Hand Gestures"); self.btn_hand.setCheckable(True); self.btn_hand.setStyleSheet(style_btn)
        self.btn_video = QtWidgets.QPushButton("Video"); self.btn_video.setStyleSheet(style_btn)
        self.btn_speaker = QtWidgets.QPushButton("Speaker"); self.btn_speaker.setCheckable(True); self.btn_speaker.setStyleSheet(style_btn)
        for w in (self.btn_start, self.btn_pause, self.btn_stop, self.btn_close, self.btn_mic, self.btn_hand, self.btn_video, self.btn_speaker):
            btn_layout.addWidget(w)
        b_layout.addWidget(btns, stretch=6)
        self.layout.addWidget(bottom)

    # ---------------- Controls ----------------
    def start_camera(self):
        if self.video_thread and self.video_thread.isRunning():
            self._append_output("Camera already running.")
            return
        self._append_output("Starting camera...")
        use_mp = self.btn_hand.isChecked()
        self.video_thread = VideoThread(use_mediapipe=use_mp)
        self.video_thread.frame_data.connect(self.update_frame)
        self.video_thread.gesture_detected.connect(self.on_gesture_detected)
        self.video_thread.start()

    def stop_camera(self):
        if self.video_thread:
            self._append_output("Stopping camera...")
            self.video_thread.stop()
            self.video_thread = None
            placeholder = QtGui.QPixmap(self.webcam_label.size()); placeholder.fill(QtGui.QColor("#000"))
            self.webcam_label.setPixmap(placeholder)
        else:
            self._append_output("Camera not running.")

    def pause_camera(self):
        if self.video_thread:
            paused = not getattr(self.video_thread, "_pause", False)
            self.video_thread.pause(paused)
            self._append_output("Camera paused." if paused else "Camera resumed.")
        else:
            self._append_output("Camera not running.")

    def close_app(self):
        self._append_output("Closing...")
        self.stop_camera()
        QtCore.QCoreApplication.quit()

    def _on_mic(self):
        if not SPEECH_AVAILABLE:
            self._append_output("SpeechRecognition not installed.")
            return
        threading.Thread(target=self._capture_mic, daemon=True).start()

    def _capture_mic(self):
        recognizer = sr.Recognizer()
        with sr.Microphone() as source:
            self._append_output("Listening...")
            try:
                audio = recognizer.listen(source, timeout=6)
                text = recognizer.recognize_google(audio)
                self._append_output("You: " + text)
                if TTS_AVAILABLE and self.btn_speaker.isChecked():
                    tts_engine.say(text); tts_engine.runAndWait()
                # basic voice commands
                if "open browser" in text.lower():
                    QtGui.QDesktopServices.openUrl(QtCore.QUrl("https://www.google.com"))
                if "time" in text.lower():
                    now = datetime.datetime.now().strftime("%H:%M")
                    self._append_output("Time: " + now)
            except Exception as e:
                self._append_output("Voice error: " + str(e))

    # ---------------- Frame & gesture handlers ----------------
    @QtCore.pyqtSlot(np.ndarray)
    def update_frame(self, frame):
        pix = cvimg_to_qt(frame)
        pix = pix.scaled(self.webcam_label.size(), QtCore.Qt.AspectRatioMode.KeepAspectRatio)
        self.webcam_label.setPixmap(pix)

    @QtCore.pyqtSlot(str)
    def on_gesture_detected(self, gesture):
        self._append_output("Gesture: " + gesture)
        # map gestures to actions (extend this table)
        g = gesture.upper()
        if "HELLO" in g:
            self._assistant_say("Hello, I am Prometheus.")
        elif "TIME" in g:
            now = datetime.datetime.now().strftime("%H:%M")
            self._assistant_say("The time is " + now)
        elif "OPEN" in g and "BROWSER" in g:
            QtGui.QDesktopServices.openUrl(QtCore.QUrl("https://www.google.com"))
            self._assistant_say("Opening browser.")
        elif "SCREEN" in g or "SHOT" in g:
            # take screenshot
            fname = f"screenshot_{int(time.time())}.png"
            # frame capture: try to get current pixmap
            pix = self.webcam_label.pixmap()
            if pix:
                pix.save(fname)
                self._assistant_say("Screenshot saved as " + fname)
        elif "EXIT" in g or "CLOSE" in g:
            self._assistant_say("Goodbye.")
            self.close_app()
        # push to prev chats
        self.prev_chats.appendleft(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] {gesture}")
        self._refresh_prev_list()

    # ---------------- UI helpers ----------------
    def _append_output(self, text):
        ts = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.output_text.append(f"[{ts}] {text}")
        self.prev_chats.appendleft(f"[{ts}] {text}")
        self._refresh_prev_list()

    def _refresh_prev_list(self):
        self.prev_list.clear()
        for it in list(self.prev_chats)[:300]:
            self.prev_list.addItem(it)

    def _assistant_say(self, text):
        self._append_output("Assistant: " + text)
        if TTS_AVAILABLE and self.btn_speaker.isChecked():
            threading.Thread(target=lambda: (tts_engine.say(text), tts_engine.runAndWait()), daemon=True).start()
        # play thinking gif briefly
        try:
            if self.movie:
                self.movie.start()
                QtCore.QTimer.singleShot(1400, self.movie.stop)
        except Exception:
            pass

    # ---------------- Clock & Stats ----------------
    def _update_clock(self):
        now = datetime.datetime.now()
        self.date_label.setText("Date: " + now.strftime("%Y-%m-%d"))
        self.time_label.setText("Time: " + now.strftime("%H:%M:%S"))

    def _update_machine_stats(self):
        cpu = psutil.cpu_percent(interval=None)
        ram = psutil.virtual_memory().percent
        disk = psutil.disk_usage('/').percent
        self.cpu_label.setText(f"CPU %: {cpu}%")
        # cpu freq
        try:
            freq = psutil.cpu_freq()
            self.cpu_freq_label.setText(f"CPU Speed: {freq.current:.1f} MHz" if freq else "CPU Speed: --")
        except Exception:
            self.cpu_freq_label.setText("CPU Speed: --")
        # temps
        try:
            temps = psutil.sensors_temperatures()
            if temps:
                for k,v in temps.items():
                    if v:
                        self.cpu_temp_label.setText(f"CPU Temp: {v[0].current:.1f}°C")
                        break
                    else:
                        self.cpu_temp_label.setText("CPU Temp: --")
            else:
                self.cpu_temp_label.setText("CPU Temp: --")
        except Exception:
            self.cpu_temp_label.setText("CPU Temp: --")
        self.ram_label.setText(f"RAM %: {ram}%")
        self.disk_label.setText(f"Disk %: {disk}%")
        # battery
        try:
            b = psutil.sensors_battery()
            if b:
                self.batt_label.setText(f"Battery: {int(b.percent)}% {'(Charging)' if b.power_plugged else ''}")
            else:
                self.batt_label.setText("Battery: --")
        except Exception:
            self.batt_label.setText("Battery: --")
        # network speed
        now_t = time.time()
        cur = psutil.net_io_counters()
        elapsed = max(1e-6, now_t - self.last_net_time)
        up_kbps = ((cur.bytes_sent - self.last_net.bytes_sent) * 8) / (elapsed * 1000)
        down_kbps = ((cur.bytes_recv - self.last_net.bytes_recv) * 8) / (elapsed * 1000)
        self.last_net = cur
        self.last_net_time = now_t
        self.net_label.setText(f"Net: ↑{up_kbps:.1f}kbps ↓{down_kbps:.1f}kbps")
        self.status_summary.setText(f"CPU: {cpu:.0f}% | RAM: {ram:.0f}% | Disk: {disk:.0f}%")

# ---------------- Run ----------------
def main():
    app = QtWidgets.QApplication(sys.argv)
    # optional dark palette
    palette = QtGui.QPalette()
    palette.setColor(QtGui.QPalette.ColorRole.Window, QtGui.QColor(10,12,20))
    palette.setColor(QtGui.QPalette.ColorRole.WindowText, QtGui.QColor(220,240,255))
    app.setPalette(palette)

    win = PrometheusWindow()
    win.show()
    sys.exit(app.exec())

if _name_ == "_main_":
    main()
