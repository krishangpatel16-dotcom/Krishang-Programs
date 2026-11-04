#ifndef CRICKETGAMEGUI_H
#define CRICKETGAMEGUI_H

#include <QMainWindow>
#include <QStackedWidget>
#include <QLabel>
#include <QPushButton>
#include <QLineEdit>
#include <QTextEdit>
#include <QProgressBar>
#include <QTimer>
#include <QGridLayout>
#include <QVBoxLayout>
#include <QHBoxLayout>
#include <QGroupBox>
#include <QMessageBox>
#include <QFile>
#include <QTextStream>
#include <QTime>
#include <QScrollBar>
#include <climits>
#include <vector>
#include <string>
#include <cstdlib>
#include <ctime>

class Player {
protected:
    std::string name;
    int runs;
    int wickets;
    
public:
    Player(std::string playerName = "") : name(playerName), runs(0), wickets(0) {}
    virtual int getChoice() = 0;
    virtual std::string getType() = 0;
    void addRuns(int r) { runs += r; }
    void addWicket() { wickets++; }
    void addWicket(int w) { wickets += w; }
    std::string getName() { return name; }
    int getRuns() { return runs; }
    int getWickets() { return wickets; }
    void resetStats() { runs = 0; wickets = 0; }
    virtual ~Player() {}
};

class HumanPlayer : public Player {
private:
    int selectedChoice;
    
public:
    HumanPlayer(std::string playerName) : Player(playerName), selectedChoice(0) {}
    int getChoice() override { return selectedChoice; }
    std::string getType() override { return "Human"; }
    void setChoice(int choice) { selectedChoice = choice; }
    void resetChoice() { selectedChoice = 0; }
};

class ComputerPlayer : public Player {
public:
    ComputerPlayer(std::string playerName) : Player(playerName) {}
    int getChoice() override { return (rand() % 6) + 1; }
    std::string getType() override { return "Computer"; }
};

class CricketGameGUI : public QMainWindow {
    Q_OBJECT

private:
    QStackedWidget* stackedWidget;
    
    // Login/Signup widgets
    QWidget* authWidget;
    QLineEdit* usernameEdit;
    QLineEdit* passwordEdit;
    QTextEdit* messageDisplay;
    
    // Game widgets
    QWidget* gameWidget;
    QLabel* scoreLabel;
    QLabel* wicketLabel;
    QLabel* ballsLabel;
    QLabel* targetLabel;
    QLabel* inningsLabel;
    QLabel* batsmanLabel;
    QLabel* bowlerLabel;
    QProgressBar* inningsProgress;
    QTextEdit* commentaryBox;
    QPushButton* choiceButtons[6];
    QLabel* animationLabel;
    
    // Game state
    HumanPlayer* human;
    ComputerPlayer* computer;
    bool humanBatsFirst;
    bool isFirstInnings;
    int firstInningsRuns;
    int firstInningsWickets;
    int currentRuns;
    int currentWickets;
    int ballsBowled;
    int target;
    QTimer* animationTimer;
    int animationFrame;
    bool isGameActive;
    
    // Authentication
    struct User {
        std::string username;
        std::string password;
    };
    std::vector<User> users;
    const std::string CREDENTIALS_FILE = "user_data.txt";
    
    void setupAuthUI();
    void setupGameUI();
    void loadCredentials();
    void saveCredentials(std::string username, std::string password);
    bool authenticate(std::string username, std::string password);
    bool userExists(std::string username);
    void addCommentary(const QString& text);
    void updateScoreDisplay();
    void resetGame();
    void playInnings();
    void computerChoice();
    void showBallAnimation(int humanChoice, int computerChoice);
    void endGame();

public:
    CricketGameGUI();
    ~CricketGameGUI();
    
private slots:
    void onLogin();
    void onSignup();
    void onChoiceClicked(int choice);
    void onAnimationTimeout();
};

#endif