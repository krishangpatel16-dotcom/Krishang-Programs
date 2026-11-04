import pandas
import sys
import json
import time
import queue
import threading
import datetime
from collections import deque
from pathlib import Path

import tkinter as tk
from tkinter import ttk, filedialog, messagebox
import ttkbootstrap as tb
from ttkbootstrap.constants import *
from PIL import Image, ImageTk

# Optional libraries
try:
    import cv2
except Exception:
    cv2 = None

try:
    import psutil
except Exception:
    psutil = None

try:
    import mediapipe as mp
    MEDIA_PIPE_AVAILABLE = True
except Exception:
    MEDIA_PIPE_AVAILABLE = False

try:
    import speech_recognition as sr
    SPEECH_AVAILABLE = True
except Exception:
    SPEECH_AVAILABLE = False

try:
    import pyttsx3
    TTS_AVAILABLE = True
    tts_engine = pyttsx3.init()
except Exception:
    TTS_AVAILABLE = False

# Optional model loading (placeholder)
try:
    import tensorflow as tf
    TF_AVAILABLE = True
except Exception:
    TF_AVAILABLE = False

APP_DIR = Path.cwd()
USERS_FILE = APP_DIR / "users.json"
FEEDBACK_FILE = APP_DIR / "feedback.txt"

# Helper: load/save users
def load_users():
    if USERS_FILE.exists():
        try:
            return json.loads(USERS_FILE.read_text(encoding="utf-8"))
        except Exception:
            return {}
    return {}

def save_users(users):
    USERS_FILE.write_text(json.dumps(users, indent=2), encoding="utf-8")

# Create default users file if not exists
if not USERS_FILE.exists():
    save_users({})

# ---------- Thread-safe event queue ----------
ui_queue = queue.Queue()

def run_on_ui(fn, *args, **kwargs):
    ui_queue.put((fn, args, kwargs))

# ---------- Gesture classifier placeholder ----------
def classify_gesture_from_landmarks(landmarks):
    """
    landmarks: list of mediapipe landmarks (each has .x, .y, .z)
    Replace this with your trained model inference.
    """
    try:
        # Simple heuristic: if index fingertip above middle fingertip -> HELLO
        idx = landmarks[8]
        mid = landmarks[12]
        if idx.y < mid.y:
            return "HELLO"
        return "UNKNOWN"
    except Exception:
        return "UNKNOWN"

# ---------- Simple assistant reply (replace with LLM or your logic) ----------
def assistant_reply(user_text):
    # Very simple rule-based function. Replace with API call to GPT/LLM if you want.
    text = user_text.lower()
    if "hello" in text or "hi" in text:
        return "Hello! I am Prometheus. How can I assist you today?"
    if "time" in text:
        return f"The current time is {datetime.datetime.now().strftime('%H:%M:%S')}."
    if "open browser" in text:
        return "Opening browser for you."
    return "I understood: " + user_text

# ---------- Main Application Class ----------
class PrometheusApp:
    def init(self):
        # bootstrap style: dark neon-ish theme
        self.root = tb.Window(themename="darkly")
        self.root.title("Prometheus AI - Login")
        self.root.geometry("1200x780")
        self.root.protocol("WM_DELETE_WINDOW", self.on_close)

        # shared state
        self.current_user = None
        self.video_thread = None
        self.video_running = False
        self.video_pause = False
        self.cap = None
        self.mp_hands = mp.solutions.hands if MEDIA_PIPE_AVAILABLE else None
        self.mp_instance = None
        self.prev_chats = deque(maxlen=300)

        # system stats
        self.last_net = None
        self.last_net_time = time.time()

        # UI frames
        self.login_frame = None
        self.main_frame = None
        self.exit_frame = None

        # load users
        self.users = load_users()
        # optional model (not implemented; placeholder)
        self.model = None
        self.label_map = None

        # build login UI
        self.build_login()

        # UI queue processor
        self.root.after(100, self._process_ui_queue)

    # ---------- UI queue runner ----------
    def _process_ui_queue(self):
        try:
            while True:
                fn, args, kwargs = ui_queue.get_nowait()
                try:
                    fn(*args, **kwargs)
                except Exception as e:
                    print("UI-queue fn error:", e)
        except queue.Empty:
            pass
        self.root.after(50, self._process_ui_queue)

    # ---------- Login Page ----------
    def build_login(self):
        if self.main_frame:
            self.main_frame.pack_forget()
        if self.exit_frame:
            self.exit_frame.pack_forget()
        if self.login_frame:
            self.login_frame.destroy()
        self.root.title("Prometheus AI - Login")
        self.login_frame = tb.Frame(self.root, padding=20)
        self.login_frame.pack(fill=BOTH, expand=YES)

        # Title
        title = tb.Label(self.login_frame, text="PROMETHEUS", font=("Orbitron", 36), bootstyle="inverse-primary")
        title.pack(pady=(10,20))

        form = tb.Frame(self.login_frame)
        form.pack(pady=10)

        tb.Label(form, text="Name:", font=("Segoe UI", 12)).grid(row=0, column=0, sticky=W, padx=6, pady=6)
        self.login_name = tb.Entry(form, width=30)
        self.login_name.grid(row=0, column=1, padx=6, pady=6)

        tb.Label(form, text="Password:", font=("Segoe UI", 12)).grid(row=1, column=0, sticky=W, padx=6, pady=6)
        self.login_password = tb.Entry(form, width=30, show="*")
        self.login_password.grid(row=1, column=1, padx=6, pady=6)

        btn_frame = tb.Frame(self.login_frame)
        btn_frame.pack(pady=(12,6))

        login_btn = tb.Button(btn_frame, text="Login", bootstyle="success", command=self._on_login)
        login_btn.grid(row=0, column=0, padx=8)

        register_btn = tb.Button(btn_frame, text="Register New Account", bootstyle="primary", command=self._on_register)
        register_btn.grid(row=0, column=1, padx=8)

        hint = tb.Label(self.login_frame, text="(New accounts are saved locally in users.json)", font=("Segoe UI", 9), bootstyle="secondary")
        hint.pack(pady=(12,0))

    def _on_register(self):
        name = self.login_name.get().strip()
        pwd = self.login_password.get().strip()
        if not name or not pwd:
            messagebox.showerror("Error", "Please enter name and password to register.")
            return
        if name in self.users:
            messagebox.showerror("Error", "User already exists.")
            return
        # simple user record; you can expand (age, photo path etc.)
        self.users[name] = {"password": pwd, "age": 18, "photo": ""}
        save_users(self.users)
        messagebox.showinfo("Registered", f"User '{name}' registered. You can now login.")

    def _on_login(self):
        name = self.login_name.get().strip()
        pwd = self.login_password.get().strip()
        if not name or not pwd:
            messagebox.showerror("Error", "Enter both name and password.")
            return
        if name not in self.users or self.users[name]["password"] != pwd:
            messagebox.showerror("Error", "Invalid credentials.")
            return
        # login ok
        self.current_user = name
        # update title
        self.build_main()

    # ---------- Main Page ----------
    def build_main(self):
        # destroy login
        if self.login_frame:
            self.login_frame.destroy()
            self.login_frame = None
        self.root.title(f"Prometheus - {self.current_user}")

        # main container
        self.main_frame = tb.Frame(self.root, padding=6)
        self.main_frame.pack(fill=BOTH, expand=YES)

        # Top heading
        top = tb.Frame(self.main_frame)
        top.pack(fill=X)
        lbl_title = tb.Label(top, text="PROMETHEUS", font=("Orbitron", 28), bootstyle="inverse-primary")
        lbl_title.pack(pady=6)

        # Middle layout: left, center, right
        middle = tb.Frame(self.main_frame)
        middle.pack(fill=BOTH, expand=YES, pady=6)

        # LEFT panel: user details + machine stats
        left = tb.Frame(middle, width=280)
        left.pack(side=LEFT, fill=Y, padx=6)
        # user photo
        photo_frame = tb.Frame(left)
        photo_frame.pack(pady=6)
        self.photo_label = tb.Label(photo_frame, text="No Photo", width=18, bootstyle="light")
        self.photo_label.pack()
        # load user photo if saved
        userinfo = self.users.get(self.current_user, {})
        photo_path = userinfo.get("photo", "")
        if photo_path and os.path.exists(photo_path):
            pix = Image.open(photo_path).resize((160,160))
            self.photo_img = ImageTk.PhotoImage(pix)
            self.photo_label.configure(image=self.photo_img, text="")
        # name/age/date/time
        self.lbl_name = tb.Label(left, text=f"Name: {self.current_user}")
        self.lbl_name.pack(anchor=W, padx=8, pady=2)
        self.lbl_age = tb.Label(left, text=f"Age: {userinfo.get('age', 'N/A')}")
        self.lbl_age.pack(anchor=W, padx=8, pady=2)
        self.lbl_date = tb.Label(left, text="Date: --")
        self.lbl_date.pack(anchor=W, padx=8, pady=2)
        self.lbl_time = tb.Label(left, text="Time: --")
        self.lbl_time.pack(anchor=W, padx=8, pady=2)

        tb.Separator(left, orient=HORIZONTAL).pack(fill=X, pady=8)

        # machine stats group
        stats_label = tb.Label(left, text="Machine Status", font=("Segoe UI", 11, "bold"))
        stats_label.pack(anchor=W, padx=6)
        self.stat_cpu = tb.Label(left, text="CPU %: --")
        self.stat_cpu.pack(anchor=W, padx=8)
        self.stat_cpu_speed = tb.Label(left, text="CPU Speed: --")
        self.stat_cpu_speed.pack(anchor=W, padx=8)
        self.stat_cpu_temp = tb.Label(left, text="CPU Temp: --")
        self.stat_cpu_temp.pack(anchor=W, padx=8)
        self.stat_ram = tb.Label(left, text="RAM %: --")
        self.stat_ram.pack(anchor=W, padx=8)
        self.stat_disk = tb.Label(left, text="Disk %: --")
        self.stat_disk.pack(anchor=W, padx=8)
        self.stat_batt = tb.Label(left, text="Battery: --")
        self.stat_batt.pack(anchor=W, padx=8)
        self.stat_net = tb.Label(left, text="Net: --")
        self.stat_net.pack(anchor=W, padx=8)

        # CENTER: webcam + assistant output (webcam left, output right ~45%)
        center = tb.Frame(middle)
        center.pack(side=LEFT, fill=BOTH, expand=YES)

        # Sub-left: webcam area
        webcam_frame = tb.Frame(center)
        webcam_frame.pack(side=LEFT, fill=Y, padx=8, pady=4)
        tb.Label(webcam_frame, text="Webcam Input", font=("Segoe UI", 10, "bold")).pack()
        self.webcam_canvas = tk.Label(webcam_frame, bg="#000", width=640, height=480)
        self.webcam_canvas.pack(padx=4, pady=6)

        # Sub-right: assistant output with chat bubbles
        output_frame = tb.Frame(center)
        output_frame.pack(side=LEFT, fill=BOTH, expand=YES, padx=8)
        tb.Label(output_frame, text="Assistant Output", font=("Segoe UI", 10, "bold")).pack(anchor=W)
        # chat canvas (scrollable)
        self.chat_canvas_container = tb.Frame(output_frame)
        self.chat_canvas_container.pack(fill=BOTH, expand=YES, pady=6)
        self.chat_canvas = tk.Canvas(self.chat_canvas_container, bg="#0b1020", highlightthickness=0)
        self.chat_scroll = ttk.Scrollbar(self.chat_canvas_container, orient="vertical", command=self.chat_canvas.yview)
        self.chat_canvas.configure(yscrollcommand=self.chat_scroll.set)
        self.chat_scroll.pack(side=RIGHT, fill=Y)
        self.chat_canvas.pack(side=LEFT, fill=BOTH, expand=YES)
        self.chat_frame_inner = tk.Frame(self.chat_canvas, bg="#0b1020")
        self.chat_canvas.create_window((0,0), window=self.chat_frame_inner, anchor="nw")
        self.chat_frame_inner.bind("<Configure>", lambda e: self.chat_canvas.configure(scrollregion=self.chat_canvas.bbox("all")))

        # thinking animation (GIF) placeholder
        self.thinking_label = tk.Label(output_frame, bg="#0b1020")
        self.thinking_label.pack(pady=6)
        # load thinking.gif if present
        self.thinking_anim = None
        if (APP_DIR / "thinking.gif").exists():
            try:
                from itertools import cycle
                gif = Image.open(APP_DIR / "thinking.gif")
                frames = []
                try:
                    while True:
                        frame = gif.copy().convert("RGBA")
                        frames.append(ImageTk.PhotoImage(frame.resize((120,80))))
                        gif.seek(len(frames))  # next frame
                except EOFError:
                    pass
                self.thinking_frames = frames
                self._thinking_cycle = cycle(frames)
            except Exception:
                self.thinking_frames = None

        # RIGHT: previous chats
        right = tb.Frame(middle, width=300)
        right.pack(side=LEFT, fill=Y, padx=6)
        tb.Label(right, text="Previous Chats", font=("Segoe UI", 10, "bold")).pack(anchor=W, padx=4)
        self.prev_listbox = tk.Listbox(right, bg="#051225", fg="#cfefff")
        self.prev_listbox.pack(fill=BOTH, expand=YES, padx=4, pady=6)

        # BOTTOM: control buttons and status
        bottom = tb.Frame(self.main_frame)
        bottom.pack(side=BOTTOM, fill=X, pady=8)
        # machine summary on bottom-left
        self.summary_label = tb.Label(bottom, text="CPU: -- | RAM: -- | Disk: --")
        self.summary_label.pack(side=LEFT, padx=6)

        # control buttons center
        controls = tb.Frame(bottom)
        controls.pack(side=LEFT, expand=YES)
        btn_kwargs = {"width":12}
        self.btn_start = tb.Button(controls, text="Start", bootstyle="success", command=self.start_camera, **btn_kwargs)
        self.btn_start.grid(row=0, column=0, padx=4)
        self.btn_pause = tb.Button(controls, text="Pause", bootstyle="warning", command=self.pause_camera, **btn_kwargs)
        self.btn_pause.grid(row=0, column=1, padx=4)
        self.btn_stop = tb.Button(controls, text="Stop", bootstyle="danger", command=self.stop_camera, **btn_kwargs)
        self.btn_stop.grid(row=0, column=2, padx=4)
        self.btn_close = tb.Button(controls, text="Close", bootstyle="secondary", command=self._go_exit_page, **btn_kwargs)
        self.btn_close.grid(row=0, column=3, padx=4)
        self.btn_mic = tb.Button(controls, text="Mic", bootstyle="info", command=self._mic_command, **btn_kwargs)
        self.btn_mic.grid(row=0, column=4, padx=4)
        self.hand_var = tk.BooleanVar(value=True)
        self.btn_hand = tb.Checkbutton(controls, text="Hand Gestures", variable=self.hand_var, bootstyle="primary")
        self.btn_hand.grid(row=0, column=5, padx=6)
        self.btn_video = tb.Button(controls, text="Video", bootstyle="secondary", **btn_kwargs)
        self.btn_video.grid(row=0, column=6, padx=4)
        self.speaker_var = tk.BooleanVar(value=True)
        self.btn_speaker = tb.Checkbutton(controls, text="Speaker", variable=self.speaker_var, bootstyle="success")
        self.btn_speaker.grid(row=0, column=7, padx=6)

        # small animation: pulse start button
        self._pulse_button(self.btn_start)

        # Start periodic updates
        self._update_clock_and_stats()
        # Bind chat send on double click or similar (we can allow typed entry too later)
        # For demo, clicking prev_listbox item will send to assistant
        self.prev_listbox.bind("<Double-Button-1>", lambda e: self._simulate_prev_chat())

        # Append welcome
        self.add_chat_bubble("assistant", f"Welcome {self.current_user}! Prometheus is ready.")

    # ---------- Chat bubble helper ----------
    def add_chat_bubble(self, who, text):
        """
        who: 'user' or 'assistant'
        text: message text
        """
        # container frame
        wrap_width = 380
        bubble = tk.Frame(self.chat_frame_inner, bg="#0b1020")
        bubble.pack(fill=X, pady=6, padx=8, anchor="w" if who=="assistant" else "e")
        if who == "assistant":
            # left aligned bubble
            b = tk.Label(bubble, text=text, justify=LEFT, anchor="w",
                         bg="#0d2540", fg="#cfefff", bd=0, padx=10, pady=8, wraplength=wrap_width,
                         font=("Segoe UI",10))
            b.pack(side=LEFT, anchor="w")
        else:
            # user bubble - right
            b = tk.Label(bubble, text=text, justify=LEFT, anchor="e",
                         bg="#3f7bb8", fg="#ffffff", bd=0, padx=10, pady=8, wraplength=wrap_width,
                         font=("Segoe UI",10,"bold"))
            b.pack(side=RIGHT, anchor="e")
        # update scrollregion
        self.chat_canvas.update_idletasks()
        self.chat_canvas.yview_moveto(1.0)

        # also add to prev chats
        ts = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.prev_chats.appendleft(f"[{ts}] {who.upper()}: {text}")
        self.refresh_prev_listbox()

    def refresh_prev_listbox(self):
        self.prev_listbox.delete(0, END)
        for item in list(self.prev_chats)[:200]:
            self.prev_listbox.insert(END, item)

    # ---------- Camera & Video Thread ----------
    def start_camera(self):
        if cv2 is None:
            messagebox.showerror("Error", "OpenCV not installed. Webcam not available.")
            return
        if self.video_running:
            self.add_chat_bubble("assistant", "Camera already running.")
            return
        # initialize mediapipe if needed
        use_mp = self.hand_var.get() and MEDIA_PIPE_AVAILABLE
        self.mp_instance = mp.solutions.hands.Hands(static_image_mode=False, max_num_hands=1) if use_mp else None
        self.video_running = True
        self.video_pause = False
        self.cap = cv2.VideoCapture(0, cv2.CAP_DSHOW if sys.platform.startswith("win") else 0)
        self.video_thread = threading.Thread(target=self._video_loop, daemon=True)
        self.video_thread.start()
        self.add_chat_bubble("assistant", "Camera started.")

    def _video_loop(self):
        last_frame_time = time.time()
        while self.video_running:
            if self.video_pause:
                time.sleep(0.05)
                continue
            ret, frame = self.cap.read()
            if not ret:
                time.sleep(0.05)
                continue
            frame = cv2.flip(frame, 1)
            # optional mediapipe processing
            if self.mp_instance:
                img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                results = self.mp_instance.process(img_rgb)
                if results.multi_hand_landmarks:
                    for hand_landmarks in results.multi_hand_landmarks:
                        mp.solutions.drawing_utils.draw_landmarks(frame, hand_landmarks, mp.solutions.hands.HAND_CONNECTIONS)
                        gesture = classify_gesture_from_landmarks(hand_landmarks.landmark)
                        # run gesture response on UI thread
                        run_on_ui(self._on_gesture_detected, gesture)
            # convert to Tk image
            if cv2:
                img = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                img = Image.fromarray(img)
                img = img.resize((640,480))
                imgtk = ImageTk.PhotoImage(img)
                # push to UI
                run_on_ui(self._update_webcam_image, imgtk)
            # limit fps
            elapsed = time.time() - last_frame_time
            if elapsed < 0.03:
                time.sleep(0.03 - elapsed)
            last_frame_time = time.time()
        # release capture on exit
        if self.cap:
            self.cap.release()
            self.cap = None

    def _update_webcam_image(self, imgtk):
        # keep reference to avoid GC
        self._last_imgtk = imgtk
        self.webcam_canvas.configure(image=imgtk)

    def pause_camera(self):
        if not self.video_running:
            self.add_chat_bubble("assistant", "Camera not running.")
            return
        self.video_pause = not self.video_pause
        self.add_chat_bubble("assistant", "Camera paused." if self.video_pause else "Camera resumed.")

    def stop_camera(self):
        if not self.video_running:
            self.add_chat_bubble("assistant", "Camera not running.")
            return
        self.video_running = False
        # cap will be released by thread
        self.add_chat_bubble("assistant", "Camera stopped.")
        # clear webcam canvas
        placeholder = Image.new("RGB", (640,480), color=(10,10,20))
        self._last_imgtk = ImageTk.PhotoImage(placeholder)
        self.webcam_canvas.configure(image=self._last_imgtk)

    # ---------- Gesture reaction ----------
    def _on_gesture_detected(self, gesture):
        # simple mapping: extend as needed
        self.add_chat_bubble("assistant", f"Gesture detected: {gesture}")
        if "HELLO" in gesture:
            self._speak("Hello, I am Prometheus.")
        elif "TIME" in gesture:
            self._speak(f"The time is {datetime.datetime.now().strftime('%H:%M')}")
        elif "OPEN" in gesture.upper() and "BROWSER" in gesture.upper():
            import webbrowser
            webbrowser.open("https://www.google.com")
            self._speak("Opening browser.")
        elif "EXIT" in gesture or "CLOSE" in gesture:
            self._speak("Goodbye.")
            self._go_exit_page()

    # ---------- speech input ----------
    def _mic_command(self):
        if not SPEECH_AVAILABLE:
            self.add_chat_bubble("assistant", "SpeechRecognition not installed.")
            return
        def _listen():
            r = sr.Recognizer()
            try:
                with sr.Microphone() as source:
                    self.add_chat_bubble("assistant", "Listening...")
                    audio = r.listen(source, timeout=6)
                    text = r.recognize_google(audio)
                    run_on_ui(self.add_chat_bubble, "user", text)
                    # assistant reply
                    reply = assistant_reply(text)
                    run_on_ui(self.add_chat_bubble, "assistant", reply)
                    if self.speaker_var.get():
                        self._speak(reply)
            except Exception as e:
                run_on_ui(self.add_chat_bubble, "assistant", f"Voice error: {e}")
        threading.Thread(target=_listen, daemon=True).start()

    # ---------- TTS helper ----------
    def _speak(self, text):
        if not TTS_AVAILABLE:
            self.add_chat_bubble("assistant", "(TTS not available) " + text)
            return
        def _do():
            try:
                tts_engine.say(text)
                tts_engine.runAndWait()
            except Exception as e:
                print("TTS error:", e)
        threading.Thread(target=_do, daemon=True).start()

    # ---------- periodic stats & clock ----------
    def _update_clock_and_stats(self):
        now = datetime.datetime.now()
        self.lbl_date.configure(text="Date: " + now.strftime("%Y-%m-%d"))
        self.lbl_time.configure(text="Time: " + now.strftime("%H:%M:%S"))

        # system stats (psutil optional)
        if psutil:
            cpu = psutil.cpu_percent(interval=None)
            self.stat_cpu.configure(text=f"CPU %: {cpu}%")
            try:
                freq = psutil.cpu_freq()
                self.stat_cpu_speed.configure(text=f"CPU Speed: {freq.current:.1f} MHz" if freq else "CPU Speed: --")
            except Exception:
                self.stat_cpu_speed.configure(text="CPU Speed: --")

            # temps
            try:
                temps = psutil.sensors_temperatures()
                if temps:
                    # pick the first sensor
                    for k, v in temps.items():
                        if v:
                            self.stat_cpu_temp.configure(text=f"CPU Temp: {v[0].current:.1f}°C")
                            break
                        else:
                            self.stat_cpu_temp.configure(text="CPU Temp: --")
                else:
                    self.stat_cpu_temp.configure(text="CPU Temp: --")
            except Exception:
                self.stat_cpu_temp.configure(text="CPU Temp: --")

            ram = psutil.virtual_memory().percent
            self.stat_ram.configure(text=f"RAM %: {ram}%")
            disk = psutil.disk_usage('/').percent
            self.stat_disk.configure(text=f"Disk %: {disk}%")

            # battery
            try:
                b = psutil.sensors_battery()
                if b:
                    self.stat_batt.configure(text=f"Battery: {int(b.percent)}% {'(Charging)' if b.power_plugged else ''}")
                else:
                    self.stat_batt.configure(text="Battery: --")
            except Exception:
                self.stat_batt.configure(text="Battery: --")

            # network speed compute delta
            if self.last_net is None:
                self.last_net = psutil.net_io_counters()
                self.last_net_time = time.time()
                up = down = 0.0
            else:
                cur = psutil.net_io_counters()
                nowt = time.time()
                elapsed = max(1e-6, nowt - self.last_net_time)
                up = ((cur.bytes_sent - self.last_net.bytes_sent) * 8) / (elapsed * 1000)  # kbps
                down = ((cur.bytes_recv - self.last_net.bytes_recv) * 8) / (elapsed * 1000)
                self.last_net = cur
                self.last_net_time = nowt
            self.stat_net.configure(text=f"Net: ↑{up:.1f} kbps ↓{down:.1f} kbps")
            self.summary_label.configure(text=f"CPU: {cpu:.0f}% | RAM: {ram:.0f}% | Disk: {disk:.0f}%")
        else:
            self.stat_cpu.configure(text="CPU %: -- (psutil missing)")

        # thinking GIF frame update (if available)
        if getattr(self, "thinking_frames", None):
            try:
                f = next(self._thinking_cycle)
                self.thinking_label.configure(image=f)
                self.thinking_label.image = f
            except Exception:
                pass

        # schedule next update after 1 second
        self.root.after(1000, self._update_clock_and_stats)

    # ---------- exit page & feedback ----------
    def _go_exit_page(self):
        # stop camera
        if self.video_running:
            self.stop_camera()
        # hide main frame
        if self.main_frame:
            self.main_frame.destroy()
            self.main_frame = None
        self.root.title("Prometheus - Exit")
        self.exit_frame = tb.Frame(self.root, padding=12)
        self.exit_frame.pack(fill=BOTH, expand=YES)

        tb.Label(self.exit_frame, text="Thank you for using Prometheus", font=("Orbitron", 22)).pack(pady=10)
        tb.Label(self.exit_frame, text="Choose an option:", font=("Segoe UI", 12)).pack(pady=6)

        btn_frame = tb.Frame(self.exit_frame)
        btn_frame.pack(pady=8)
        tb.Button(btn_frame, text="Back to Desktop (close)", bootstyle="danger", command=self._close_desktop).grid(row=0, column=0, padx=6)
        tb.Button(btn_frame, text="Back to Prometheus", bootstyle="primary", command=self._back_to_prometheus).grid(row=0, column=1, padx=6)

        tb.Separator(self.exit_frame, orient=HORIZONTAL).pack(fill=X, pady=12)

        # feedback form
        fb_frame = tb.Frame(self.exit_frame)
        fb_frame.pack(fill=BOTH, expand=YES, pady=6)
        tb.Label(fb_frame, text="Feedback (saved to feedback.txt)", font=("Segoe UI", 10)).pack(anchor=W, padx=6)
        self.feedback_text = tk.Text(fb_frame, height=8, bg="#0c1622", fg="#e6fbff")
        self.feedback_text.pack(fill=BOTH, expand=YES, padx=6, pady=6)
        fb_btns = tb.Frame(self.exit_frame)
        fb_btns.pack()
        tb.Button(fb_btns, text="Submit Feedback", bootstyle="success", command=self._submit_feedback).grid(row=0, column=0, padx=6)
        tb.Button(fb_btns, text="Back without feedback", bootstyle="secondary", command=self._back_to_prometheus).grid(row=0, column=1, padx=6)

    def _submit_feedback(self):
        text = self.feedback_text.get("1.0", END).strip()
        if not text:
            messagebox.showinfo("Empty", "Please write feedback before submitting.")
            return
        with open(FEEDBACK_FILE, "a", encoding="utf-8") as f:
            f.write(f"[{datetime.datetime.now().isoformat()}] {self.current_user}: {text}\n\n")
        messagebox.showinfo("Thanks", "Feedback saved. Thank you!")
        self._back_to_prometheus()

    def _close_desktop(self):
        self.root.destroy()
        sys.exit(0)

    def _back_to_prometheus(self):
        if self.exit_frame:
            self.exit_frame.destroy()
            self.exit_frame = None
        # rebuild main
        self.build_main()

    # ---------- utils ----------
    def _simulate_prev_chat(self):
        sel = self.prev_listbox.curselection()
        if not sel:
            return
        text = self.prev_listbox.get(sel[0]).split("] ", 1)[-1]
        # send to assistant
        run_on_ui(self.add_chat_bubble, "user", text)
        reply = assistant_reply(text)
        run_on_ui(self.add_chat_bubble, "assistant", reply)
        if self.speaker_var.get():
            self._speak(reply)

    def on_close(self):
        # cleanup threads
        self.video_running = False
        if self.cap:
            try:
                self.cap.release()
            except Exception:
                pass
        self.root.destroy()
        sys.exit(0)

    # small UI effect: pulsing start button
    def _pulse_button(self, btn):
        def pulse():
            current = btn.cget("bootstyle")
            # toggle a style temporarily (ttkbootstrap doesn't easily support CSS animation, so we'll faked)
            btn.configure(bootstyle="success" if current!="success" else "primary")
            self.root.after(700, pulse)
        self.root.after(700, pulse)

    def run(self):
        self.root.mainloop()

# ---------- run app ----------
if name == "main":
    app = PrometheusApp()
    app.run()