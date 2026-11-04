#include "CricketGameGUI.h"

CricketGameGUI::CricketGameGUI() : human(nullptr), computer(nullptr), isGameActive(false) {
    srand(time(0));
    loadCredentials();
    setupAuthUI();
    
    setWindowTitle("Cricket Game - Ultimate Edition");
    setMinimumSize(900, 700);
    setStyleSheet(
        "QMainWindow { background-color: #1a472a; }"
        "QScrollBar:vertical { background-color: #2d5a3b; width: 12px; }"
        "QScrollBar::handle:vertical { background-color: #ffd700; border-radius: 6px; }"
    );
}

CricketGameGUI::~CricketGameGUI() {
    delete human;
    delete computer;
    if (animationTimer) delete animationTimer;
}

void CricketGameGUI::loadCredentials() {
    QFile file(QString::fromStdString(CREDENTIALS_FILE));
    if (file.open(QIODevice::ReadOnly | QIODevice::Text)) {
        QTextStream in(&file);
        while (!in.atEnd()) {
            QString line = in.readLine();
            QStringList parts = line.split(":");
            if (parts.size() == 2) {
                User user;
                user.username = parts[0].toStdString();
                user.password = parts[1].toStdString();
                users.push_back(user);
            }
        }
        file.close();
    }
}

void CricketGameGUI::saveCredentials(std::string username, std::string password) {
    QFile file(QString::fromStdString(CREDENTIALS_FILE));
    if (file.open(QIODevice::Append | QIODevice::Text)) {
        QTextStream out(&file);
        out << QString::fromStdString(username) << ":" << QString::fromStdString(password) << "\n";
        file.close();
    }
}

bool CricketGameGUI::authenticate(std::string username, std::string password) {
    for (const auto& user : users) {
        if (user.username == username && user.password == password) {
            return true;
        }
    }
    return false;
}

bool CricketGameGUI::userExists(std::string username) {
    for (const auto& user : users) {
        if (user.username == username) {
            return true;
        }
    }
    return false;
}

void CricketGameGUI::setupAuthUI() {
    stackedWidget = new QStackedWidget(this);
    setCentralWidget(stackedWidget);
    
    // Authentication Widget
    authWidget = new QWidget();
    QVBoxLayout* authLayout = new QVBoxLayout(authWidget);
    authLayout->setSpacing(20);
    
    // Title
    QLabel* titleLabel = new QLabel("🏏 CRICKET GAME 🏏");
    titleLabel->setAlignment(Qt::AlignCenter);
    QFont titleFont("Arial", 28, QFont::Bold);
    titleLabel->setFont(titleFont);
    titleLabel->setStyleSheet("color: #ffd700; padding: 30px; background-color: #0d2818; border-radius: 15px; margin: 20px;");
    authLayout->addWidget(titleLabel);
    
    // Input fields
    QGroupBox* inputGroup = new QGroupBox("Authentication");
    inputGroup->setStyleSheet("QGroupBox { color: white; font-size: 16px; font-weight: bold; border: 2px solid #ffd700; border-radius: 10px; margin-top: 10px; }"
                              "QGroupBox::title { subcontrol-origin: margin; left: 10px; padding: 0 5px 0 5px; }");
    QVBoxLayout* inputLayout = new QVBoxLayout(inputGroup);
    inputLayout->setSpacing(15);
    
    usernameEdit = new QLineEdit();
    usernameEdit->setPlaceholderText("Enter username");
    usernameEdit->setStyleSheet("QLineEdit { padding: 12px; font-size: 14px; border-radius: 5px; border: 1px solid #ffd700; background-color: white; }");
    inputLayout->addWidget(usernameEdit);
    
    passwordEdit = new QLineEdit();
    passwordEdit->setPlaceholderText("Enter password");
    passwordEdit->setEchoMode(QLineEdit::Password);
    passwordEdit->setStyleSheet("QLineEdit { padding: 12px; font-size: 14px; border-radius: 5px; border: 1px solid #ffd700; background-color: white; }");
    inputLayout->addWidget(passwordEdit);
    
    authLayout->addWidget(inputGroup);
    
    // Buttons
    QHBoxLayout* buttonLayout = new QHBoxLayout();
    buttonLayout->setSpacing(20);
    
    QPushButton* loginBtn = new QPushButton("🔑 LOGIN");
    QPushButton* signupBtn = new QPushButton("📝 SIGN UP");
    
    QString buttonStyle = "QPushButton { background-color: #ffd700; color: #1a472a; padding: 12px; font-size: 16px; font-weight: bold; border-radius: 8px; }"
                          "QPushButton:hover { background-color: #ffed4a; }"
                          "QPushButton:pressed { background-color: #ffc107; }";
    
    loginBtn->setStyleSheet(buttonStyle);
    signupBtn->setStyleSheet(buttonStyle);
    
    buttonLayout->addWidget(loginBtn);
    buttonLayout->addWidget(signupBtn);
    authLayout->addLayout(buttonLayout);
    
    // Message display
    messageDisplay = new QTextEdit();
    messageDisplay->setReadOnly(true);
    messageDisplay->setMaximumHeight(120);
    messageDisplay->setStyleSheet("QTextEdit { background-color: #0d2818; color: #4ecdc4; font-size: 13px; border-radius: 8px; padding: 10px; }");
    authLayout->addWidget(messageDisplay);
    
    authLayout->addStretch();
    
    connect(loginBtn, &QPushButton::clicked, this, &CricketGameGUI::onLogin);
    connect(signupBtn, &QPushButton::clicked, this, &CricketGameGUI::onSignup);
    
    stackedWidget->addWidget(authWidget);
}

void CricketGameGUI::setupGameUI() {
    gameWidget = new QWidget();
    QVBoxLayout* mainLayout = new QVBoxLayout(gameWidget);
    mainLayout->setSpacing(15);
    
    // Header
    QLabel* gameTitle = new QLabel("🏏 LIVE CRICKET MATCH 🏏");
    gameTitle->setAlignment(Qt::AlignCenter);
    gameTitle->setFont(QFont("Arial", 22, QFont::Bold));
    gameTitle->setStyleSheet("color: #ffd700; padding: 15px; background-color: #0d2818; border-radius: 12px;");
    mainLayout->addWidget(gameTitle);
    
    // Animation label for ball
    animationLabel = new QLabel();
    animationLabel->setAlignment(Qt::AlignCenter);
    animationLabel->setFont(QFont("Arial", 24));
    animationLabel->setStyleSheet("background-color: #0d2818; border-radius: 10px; padding: 10px;");
    animationLabel->hide();
    mainLayout->addWidget(animationLabel);
    
    // Scoreboard
    QGroupBox* scoreGroup = new QGroupBox("📊 SCOREBOARD");
    scoreGroup->setStyleSheet("QGroupBox { color: #ffd700; font-size: 15px; font-weight: bold; border: 2px solid #ffd700; border-radius: 10px; margin-top: 10px; }"
                              "QGroupBox::title { subcontrol-origin: margin; left: 10px; padding: 0 5px 0 5px; }");
    QGridLayout* scoreLayout = new QGridLayout(scoreGroup);
    scoreLayout->setSpacing(15);
    
    inningsLabel = new QLabel("🏏 1st Innings");
    targetLabel = new QLabel("🎯 Target: -");
    scoreLabel = new QLabel("📈 Score: 0/0");
    wicketLabel = new QLabel("🎯 Wickets: 0");
    ballsLabel = new QLabel("⚾ Balls: 0/12");
    
    QFont scoreFont("Arial", 14, QFont::Bold);
    inningsLabel->setFont(scoreFont);
    targetLabel->setFont(scoreFont);
    scoreLabel->setFont(scoreFont);
    wicketLabel->setFont(scoreFont);
    ballsLabel->setFont(scoreFont);
    
    inningsLabel->setStyleSheet("color: #4ecdc4; background-color: #0d2818; padding: 8px; border-radius: 5px;");
    targetLabel->setStyleSheet("color: #ff6b6b; background-color: #0d2818; padding: 8px; border-radius: 5px;");
    scoreLabel->setStyleSheet("color: #ffd700; background-color: #0d2818; padding: 8px; border-radius: 5px; font-size: 18px;");
    wicketLabel->setStyleSheet("color: #ffa500; background-color: #0d2818; padding: 8px; border-radius: 5px;");
    ballsLabel->setStyleSheet("color: #white; background-color: #0d2818; padding: 8px; border-radius: 5px;");
    
    scoreLayout->addWidget(inningsLabel, 0, 0);
    scoreLayout->addWidget(targetLabel, 0, 1);
    scoreLayout->addWidget(scoreLabel, 1, 0);
    scoreLayout->addWidget(wicketLabel, 1, 1);
    scoreLayout->addWidget(ballsLabel, 2, 0, 1, 2);
    
    mainLayout->addWidget(scoreGroup);
    
    // Players info
    QHBoxLayout* playersLayout = new QHBoxLayout();
    playersLayout->setSpacing(20);
    batsmanLabel = new QLabel("🏏 Batsman: You");
    bowlerLabel = new QLabel("🎯 Bowler: Computer");
    batsmanLabel->setStyleSheet("color: white; font-size: 14px; font-weight: bold; background-color: #2d5a3b; padding: 8px; border-radius: 8px;");
    bowlerLabel->setStyleSheet("color: white; font-size: 14px; font-weight: bold; background-color: #2d5a3b; padding: 8px; border-radius: 8px;");
    playersLayout->addWidget(batsmanLabel);
    playersLayout->addWidget(bowlerLabel);
    mainLayout->addLayout(playersLayout);
    
    // Innings progress
    inningsProgress = new QProgressBar();
    inningsProgress->setRange(0, 12);
    inningsProgress->setTextVisible(true);
    inningsProgress->setFormat("Overs: %v/12 balls");
    inningsProgress->setStyleSheet(
        "QProgressBar { border: 2px solid #ffd700; border-radius: 8px; text-align: center; color: white; font-weight: bold; background-color: #0d2818; }"
        "QProgressBar::chunk { background-color: #ffd700; border-radius: 6px; }"
    );
    mainLayout->addWidget(inningsProgress);
    
    // Choice buttons
    QGroupBox* choiceGroup = new QGroupBox("🎮 SELECT YOUR SHOT (1-6)");
    choiceGroup->setStyleSheet("QGroupBox { color: #ffd700; font-size: 14px; font-weight: bold; border: 2px solid #ffd700; border-radius: 10px; margin-top: 10px; }");
    QGridLayout* choiceLayout = new QGridLayout(choiceGroup);
    choiceLayout->setSpacing(20);
    
    for (int i = 0; i < 6; i++) {
        choiceButtons[i] = new QPushButton(QString::number(i + 1));
        choiceButtons[i]->setFixedSize(100, 100);
        choiceButtons[i]->setFont(QFont("Arial", 28, QFont::Bold));
        choiceButtons[i]->setStyleSheet(
            "QPushButton { background-color: #ffd700; color: #1a472a; border-radius: 50px; }"
            "QPushButton:hover { background-color: #ffed4a; transform: scale(1.05); }"
            "QPushButton:pressed { background-color: #ffc107; }"
            "QPushButton:disabled { background-color: #cccccc; color: #666666; }"
        );
        choiceLayout->addWidget(choiceButtons[i], i / 3, i % 3);
        connect(choiceButtons[i], &QPushButton::clicked, [this, i]() { onChoiceClicked(i + 1); });
    }
    
    mainLayout->addWidget(choiceGroup);
    
    // Commentary box
    QGroupBox* commentaryGroup = new QGroupBox("📝 LIVE COMMENTARY");
    commentaryGroup->setStyleSheet("QGroupBox { color: #ffd700; font-size: 14px; font-weight: bold; border: 2px solid #ffd700; border-radius: 10px; margin-top: 10px; }");
    QVBoxLayout* commentaryLayout = new QVBoxLayout(commentaryGroup);
    commentaryBox = new QTextEdit();
    commentaryBox->setReadOnly(true);
    commentaryBox->setMinimumHeight(150);
    commentaryBox->setStyleSheet(
        "QTextEdit { background-color: #0d2818; color: #4ecdc4; font-size: 12px; font-family: 'Courier New', monospace; border-radius: 8px; padding: 10px; }"
    );
    commentaryLayout->addWidget(commentaryBox);
    mainLayout->addWidget(commentaryGroup);
    
    // Disable buttons initially
    for (int i = 0; i < 6; i++) {
        choiceButtons[i]->setEnabled(false);
    }
    
    stackedWidget->addWidget(gameWidget);
    
    // Animation timer
    animationTimer = new QTimer(this);
    connect(animationTimer, &QTimer::timeout, this, &CricketGameGUI::onAnimationTimeout);
}

void CricketGameGUI::addCommentary(const QString& text) {
    QString timestamp = QTime::currentTime().toString("hh:mm:ss");
    commentaryBox->append(QString("[%1] %2").arg(timestamp).arg(text));
    commentaryBox->verticalScrollBar()->setValue(commentaryBox->verticalScrollBar()->maximum());
}

void CricketGameGUI::updateScoreDisplay() {
    scoreLabel->setText(QString("📈 Score: %1/%2").arg(currentRuns).arg(currentWickets));
    wicketLabel->setText(QString("🎯 Wickets: %1").arg(currentWickets));
    ballsLabel->setText(QString("⚾ Balls: %1/12").arg(ballsBowled));
    inningsProgress->setValue(ballsBowled);
    
    if (!isFirstInnings && target > 0 && target != INT_MAX) {
        int runsNeeded = target - currentRuns;
        if (runsNeeded > 0) {
            targetLabel->setText(QString("🎯 Need %1 runs to win").arg(runsNeeded));
        } else if (runsNeeded == 0) {
            targetLabel->setText("🎉 TARGET ACHIEVED! 🎉");
        }
    }
}

void CricketGameGUI::resetGame() {
    if (human) delete human;
    if (computer) delete computer;
    
    human = new HumanPlayer(usernameEdit->text().toStdString());
    computer = new ComputerPlayer("Computer");
    
    currentRuns = 0;
    currentWickets = 0;
    ballsBowled = 0;
    firstInningsRuns = 0;
    firstInningsWickets = 0;
    isFirstInnings = true;
    target = INT_MAX;
    isGameActive = true;
    
    // Random toss
    int tossResult = rand() % 2;
    humanBatsFirst = (tossResult == 0);
    
    inningsLabel->setText("🏏 1st Innings");
    targetLabel->setText("🎯 Target: -");
    updateScoreDisplay();
    commentaryBox->clear();
    
    addCommentary("🏏 === NEW MATCH STARTED === 🏏");
    if (humanBatsFirst) {
        addCommentary("🎲 You won the toss and chose to BAT first!");
        batsmanLabel->setText("🏏 Batsman: You");
        bowlerLabel->setText("🎯 Bowler: Computer");
    } else {
        addCommentary("💻 Computer won the toss and chose to BAT first!");
        batsmanLabel->setText("🏏 Batsman: Computer");
        bowlerLabel->setText("🎯 Bowler: You");
    }
    addCommentary("⚡ Let the game begin! ⚡");
    
    // Enable choice buttons for human
    for (int i = 0; i < 6; i++) {
        choiceButtons[i]->setEnabled(true);
    }
}

void CricketGameGUI::playInnings() {
    if (!isGameActive) return;
    
    if (ballsBowled >= 12 || currentWickets >= 2) {
        if (isFirstInnings) {
            firstInningsRuns = currentRuns;
            firstInningsWickets = currentWickets;
            
            addCommentary("");
            addCommentary("═══════════════════════════════");
            addCommentary("🏏 END OF FIRST INNINGS 🏏");
            addCommentary(QString("📊 First Innings Score: %1/%2").arg(firstInningsRuns).arg(firstInningsWickets));
            addCommentary("═══════════════════════════════");
            
            // Reset for second innings
            isFirstInnings = false;
            currentRuns = 0;
            currentWickets = 0;
            ballsBowled = 0;
            target = firstInningsRuns + 1;
            
            // Reset player choices
            human->resetChoice();
            
            inningsLabel->setText("🏏 2nd Innings");
            targetLabel->setText(QString("🎯 Target: %1 runs").arg(target));
            updateScoreDisplay();
            
            addCommentary("");
            addCommentary("═══════════════════════════════");
            addCommentary("🏏 SECOND INNINGS BEGINS 🏏");
            addCommentary(QString("🎯 Target: %1 runs to win").arg(target));
            
            // Swap roles for second innings
            if (humanBatsFirst) {
                batsmanLabel->setText("🏏 Batsman: Computer");
                bowlerLabel->setText("🎯 Bowler: You");
                addCommentary("💻 Computer is now batting");
                addCommentary("🎯 You are now bowling - Choose numbers 1-6 to bowl");
                // Computer's turn automatically
                QTimer::singleShot(1000, this, &CricketGameGUI::computerChoice);
            } else {
                batsmanLabel->setText("🏏 Batsman: You");
                bowlerLabel->setText("🎯 Bowler: Computer");
                addCommentary("🏏 You are now batting");
                addCommentary("⚡ Choose a number to hit (1-6)");
                // Enable buttons for batting
                for (int i = 0; i < 6; i++) {
                    choiceButtons[i]->setEnabled(true);
                }
            }
            addCommentary("═══════════════════════════════");
        } else {
            endGame();
        }
        return;
    }
    
    // Check if target achieved in second innings
    if (!isFirstInnings && currentRuns >= target) {
        endGame();
        return;
    }
    
    // Automate computer's batting in second innings
    if (!isFirstInnings && !humanBatsFirst && isGameActive) {
        computerChoice();
    }
}

void CricketGameGUI::computerChoice() {
    if (!isGameActive) return;
    
    int computerChoice = computer->getChoice();
    
    if ((isFirstInnings && !humanBatsFirst) || (!isFirstInnings && humanBatsFirst)) {
        // Computer is batting, human is bowling
        if (human->getChoice() == 0) {
            addCommentary("⚠️ Please select a number to bowl!");
            return;
        }
        showBallAnimation(human->getChoice(), computerChoice);
    }
}

void CricketGameGUI::onChoiceClicked(int choice) {
    if (!isGameActive) return;
    
    human->setChoice(choice);
    
    if ((isFirstInnings && humanBatsFirst) || (!isFirstInnings && !humanBatsFirst)) {
        // Human is batting
        int computerChoice = computer->getChoice();
        showBallAnimation(choice, computerChoice);
    } else {
        // Human is bowling
        addCommentary(QString("🎯 You bowled: %1").arg(choice));
        computerChoice();
    }
}

void CricketGameGUI::showBallAnimation(int humanChoice, int computerChoice) {
    // Disable buttons during animation
    for (int i = 0; i < 6; i++) {
        choiceButtons[i]->setEnabled(false);
    }
    
    // Show animation
    animationLabel->show();
    animationFrame = 0;
    animationTimer->start(80);
    
    addCommentary(QString("⚡ Shot: %1  |  Ball: %2 ⚡").arg(humanChoice).arg(computerChoice));
    
    if (humanChoice == computerChoice) {
        currentWickets++;
        addCommentary("❌❌❌ OUT! The batsman is dismissed! ❌❌❌");
        
        if (currentWickets == 1) {
            addCommentary("🔄 New batsman walks in... 🔄");
        } else if (currentWickets >= 2) {
            addCommentary("🏏 Innings ended! All wickets fallen! 🏏");
        }
    } else {
        currentRuns += humanChoice;
        
        QString runText;
        if (humanChoice == 1) runText = "🏃 Single taken! 🏃";
        else if (humanChoice == 2) runText = "🏃🏃 Double! Good running! 🏃🏃";
        else if (humanChoice == 3) runText = "🏃🏃🏃 Three runs! Excellent running! 🏃🏃🏃";
        else if (humanChoice == 4) runText = "💥💥 FOUR! Boundary! 💥💥";
        else if (humanChoice == 5) runText = "🌟 Five runs! Rare but well played! 🌟";
        else runText = "🚀🚀 SIX! Maximum! The ball sails over the boundary! 🚀🚀";
        
        addCommentary(runText);
    }
    
    ballsBowled++;
    updateScoreDisplay();
    
    if (ballsBowled % 6 == 0 && ballsBowled > 0) {
        addCommentary("🔄 End of over! Fielding side changes ends 🔄");
    }
    
    // Check for end of innings conditions
    if (currentWickets >= 2 || ballsBowled >= 12) {
        QTimer::singleShot(2000, this, &CricketGameGUI::playInnings);
    } else if (!isFirstInnings && currentRuns >= target) {
        QTimer::singleShot(2000, this, &CricketGameGUI::endGame);
    } else {
        QTimer::singleShot(2000, [this]() {
            animationTimer->stop();
            animationLabel->hide();
            playInnings();
            
            // Re-enable buttons if game still active and human's turn
            if (isGameActive) {
                if ((isFirstInnings && humanBatsFirst) || (!isFirstInnings && !humanBatsFirst)) {
                    for (int i = 0; i < 6; i++) {
                        choiceButtons[i]->setEnabled(true);
                    }
                }
            }
        });
    }
}

void CricketGameGUI::onAnimationTimeout() {
    animationFrame++;
    QString animation[] = {"⚾", "🏏", "⚾", "🏏"};
    animationLabel->setText(animation[animationFrame % 4]);
}

void CricketGameGUI::endGame() {
    isGameActive = false;
    animationTimer->stop();
    animationLabel->hide();
    
    // Disable all choice buttons
    for (int i = 0; i < 6; i++) {
        choiceButtons[i]->setEnabled(false);
    }
    
    addCommentary("");
    addCommentary("═══════════════════════════════");
    addCommentary("🏏 MATCH SUMMARY 🏏");
    addCommentary(QString("First Innings: %1/%2").arg(firstInningsRuns).arg(firstInningsWickets));
    addCommentary(QString("Second Innings: %1/%2").arg(currentRuns).arg(currentWickets));
    
    QString result;
    if (humanBatsFirst) {
        if (firstInningsRuns > currentRuns) {
            result = QString("🎉🎉🎉 YOU WIN by %1 runs! 🎉🎉🎉").arg(firstInningsRuns - currentRuns);
        } else if (currentRuns > firstInningsRuns) {
            result = QString("💻💻💻 COMPUTER WINS by %1 wickets! 💻💻💻").arg(2 - currentWickets);
        } else {
            result = "🤝🤝🤝 IT'S A TIE! 🤝🤝🤝";
        }
    } else {
        if (firstInningsRuns > currentRuns) {
            result = QString("💻💻💻 COMPUTER WINS by %1 runs! 💻💻💻").arg(firstInningsRuns - currentRuns);
        } else if (currentRuns > firstInningsRuns) {
            result = QString("🎉🎉🎉 YOU WIN by %1 wickets! 🎉🎉🎉").arg(2 - currentWickets);
        } else {
            result = "🤝🤝🤝 IT'S A TIE! 🤝🤝🤝";
        }
    }
    
    addCommentary("");
    addCommentary(result);
    addCommentary("═══════════════════════════════");
    
    QMessageBox::information(this, "🏆 Match Result 🏆", result);
    
    // Ask to play again
    QMessageBox::StandardButton reply = QMessageBox::question(this, "Play Again?", 
        "Would you like to play another match?",
        QMessageBox::Yes | QMessageBox::No);
    
    if (reply == QMessageBox::Yes) {
        resetGame();
        playInnings();
    }
}

void CricketGameGUI::onLogin() {
    std::string username = usernameEdit->text().toStdString();
    std::string password = passwordEdit->text().toStdString();
    
    if (username.empty() || password.empty()) {
        messageDisplay->setText("❌ Please enter both username and password!");
        return;
    }
    
    if (authenticate(username, password)) {
        messageDisplay->setText("✅ Login successful! Loading game...");
        setupGameUI();
        resetGame();
        stackedWidget->setCurrentWidget(gameWidget);
    } else {
        messageDisplay->setText("❌ Invalid username or password!");
    }
}

void CricketGameGUI::onSignup() {
    std::string username = usernameEdit->text().toStdString();
    std::string password = passwordEdit->text().toStdString();
    
    if (username.empty() || password.empty()) {
        messageDisplay->setText("❌ Username and password cannot be empty!");
        return;
    }
    
    if (userExists(username)) {
        messageDisplay->setText("❌ Username already exists! Please choose another.");
        return;
    }
    
    User newUser;
    newUser.username = username;
    newUser.password = password;
    users.push_back(newUser);
    saveCredentials(username, password);
    
    messageDisplay->setText("✅ Signup successful! Please login with your credentials.");
    usernameEdit->clear();
    passwordEdit->clear();
}