#include <iostream>
#include <fstream>
#include <string>
#include <cstdlib>
#include <ctime>
#include <climits>
#include <SFML/Graphics.hpp>
#include <SFML/Window.hpp>
#include <sstream>
using namespace std;
using namespace sf;

// Base class Player (Inheritance)
class Player {
protected:
    string name;
    int runs;
    int wickets;
    
public:
    Player(string playerName = "") {
        name = playerName;
        runs = 0;
        wickets = 0;
    }
    
    virtual int getChoice() = 0;
    virtual string getType() = 0;
    
    void addRuns(int r) {
        runs += r;
    }
    
    void addWicket() {
        wickets++;
    }
    
    string getName() {
        return name;
    }
    
    int getRuns() {
        return runs;
    }
    
    int getWickets() {
        return wickets;
    }
    
    virtual ~Player() {}
};

// Derived class HumanPlayer
class HumanPlayer : public Player {
private:
    int lastChoice;
public:
    HumanPlayer(string playerName) : Player(playerName), lastChoice(0) {}
    
    int getChoice() override {
        return lastChoice;
    }
    
    void setChoice(int choice) {
        if (choice >= 1 && choice <= 6) {
            lastChoice = choice;
        }
    }
    
    string getType() override {
        return "Human";
    }
};

// Derived class ComputerPlayer
class ComputerPlayer : public Player {
public:
    ComputerPlayer(string playerName) : Player(playerName) {}
    
    int getChoice() override {
        return (rand() % 6) + 1;
    }
    
    string getType() override {
        return "Computer";
    }
};

// GUI Class
class CricketGameGUI {
private:
    RenderWindow window;
    Font font;
    HumanPlayer* human;
    ComputerPlayer* computer;
    
    // Game state variables
    int firstInningsRuns, firstInningsWickets, balls1;
    int secondInningsRuns, secondInningsWickets, balls2;
    bool gameStarted, firstInningsComplete;
    int humanBatsFirst;
    string gameMessage;
    int humanChoice, computerChoice;
    bool roundComplete;
    
    void loadFont() {
        // Try to load a system font (Windows)
        if (!font.loadFromFile("C:\\Windows\\Fonts\\arial.ttf")) {
            // If Arial not found, try another common font
            if (!font.loadFromFile("C:\\Windows\\Fonts\\calibrib.ttf")) {
                cerr << "Warning: Could not load font. Text rendering may not work properly." << endl;
            }
        }
    }
    
    void drawCricketField(RenderTarget& target) {
        // Draw grass background
        CircleShape field(400);
        field.setPosition(100, 50);
        field.setFillColor(Color(34, 139, 34)); // Forest green
        target.draw(field);
        
        // Draw pitch (rectangle in center)
        RectangleShape pitch(Vector2f(120, 400));
        pitch.setPosition(390, 100);
        pitch.setFillColor(Color(210, 180, 140)); // Tan color
        target.draw(pitch);
        
        // Draw crease lines
        RectangleShape crease(Vector2f(120, 3));
        crease.setPosition(390, 280);
        crease.setFillColor(Color(255, 255, 255)); // White
        target.draw(crease);
        
        // Draw bowling crease
        RectangleShape bowlingCrease(Vector2f(120, 3));
        bowlingCrease.setPosition(390, 320);
        bowlingCrease.setFillColor(Color(255, 255, 255));
        target.draw(bowlingCrease);
    }
    
    void drawBatsman(RenderTarget& target, Vector2f position) {
        // Draw batsman (simple stick figure)
        CircleShape head(10);
        head.setPosition(position.x - 5, position.y - 30);
        head.setFillColor(Color(255, 200, 100));
        target.draw(head);
        
        RectangleShape body(Vector2f(5, 20));
        body.setPosition(position.x - 2.5f, position.y - 20);
        body.setFillColor(Color::Blue);
        target.draw(body);
        
        RectangleShape bat(Vector2f(8, 40));
        bat.setPosition(position.x + 5, position.y - 25);
        bat.setFillColor(Color(139, 69, 19)); // Brown
        target.draw(bat);
    }
    
    void drawBowler(RenderTarget& target, Vector2f position) {
        // Draw bowler
        CircleShape head(10);
        head.setPosition(position.x - 5, position.y - 30);
        head.setFillColor(Color(255, 200, 100));
        target.draw(head);
        
        RectangleShape body(Vector2f(5, 20));
        body.setPosition(position.x - 2.5f, position.y - 20);
        body.setFillColor(Color::Red);
        target.draw(body);
    }
    
    void drawBall(RenderTarget& target, Vector2f position) {
        CircleShape ball(5);
        ball.setPosition(position.x - 5, position.y - 5);
        ball.setFillColor(Color::Red);
        target.draw(ball);
    }
    
    void drawScoreboard(RenderTarget& target) {
        // Scoreboard background
        RectangleShape scoreboard(Vector2f(250, 150));
        scoreboard.setPosition(950, 50);
        scoreboard.setFillColor(Color(50, 50, 50));
        target.draw(scoreboard);
        
        // Draw text
        Text title("SCOREBOARD", font, 20);
        title.setPosition(975, 60);
        title.setFillColor(Color::White);
        target.draw(title);
        
        if (!firstInningsComplete) {
            Text runs1("1st Inns: " + to_string(firstInningsRuns) + "/" + to_string(firstInningsWickets), font, 14);
            runs1.setPosition(975, 90);
            runs1.setFillColor(Color::Yellow);
            target.draw(runs1);
            
            Text balls("Balls: " + to_string(balls1) + "/12", font, 14);
            balls.setPosition(975, 110);
            balls.setFillColor(Color::White);
            target.draw(balls);
        } else {
            Text runs1("1st: " + to_string(firstInningsRuns) + "/" + to_string(firstInningsWickets), font, 12);
            runs1.setPosition(975, 90);
            runs1.setFillColor(Color::Yellow);
            target.draw(runs1);
            
            Text runs2("2nd: " + to_string(secondInningsRuns) + "/" + to_string(secondInningsWickets), font, 12);
            runs2.setPosition(975, 105);
            runs2.setFillColor(Color::Cyan);
            target.draw(runs2);
            
            Text ballsText("Balls: " + to_string(balls2) + "/12", font, 14);
            ballsText.setPosition(975, 125);
            ballsText.setFillColor(Color::White);
            target.draw(ballsText);
        }
    }
    
    void drawControls(RenderTarget& target) {
        RectangleShape controlBox(Vector2f(250, 200));
        controlBox.setPosition(950, 220);
        controlBox.setFillColor(Color(50, 50, 50));
        target.draw(controlBox);
        
        Text controlTitle("CONTROLS", font, 16);
        controlTitle.setPosition(975, 230);
        controlTitle.setFillColor(Color::White);
        target.draw(controlTitle);
        
        Text controls("Choose: 1-6\nPress SPACE\nto submit", font, 12);
        controls.setPosition(975, 260);
        controls.setFillColor(Color::Green);
        target.draw(controls);
        
        Text choiceText("Your Choice: " + (humanChoice > 0 ? to_string(humanChoice) : "-"), font, 14);
        choiceText.setPosition(975, 320);
        choiceText.setFillColor(Color::Yellow);
        target.draw(choiceText);
    }
    
    void drawGameMessage(RenderTarget& target) {
        Text message(gameMessage, font, 14);
        message.setPosition(200, 550);
        message.setFillColor(Color::White);
        target.draw(message);
    }
    
public:
    CricketGameGUI() : window(VideoMode(1250, 700), "Cricket Game"),
                       human(nullptr), computer(nullptr),
                       firstInningsRuns(0), firstInningsWickets(0), balls1(0),
                       secondInningsRuns(0), secondInningsWickets(0), balls2(0),
                       gameStarted(false), firstInningsComplete(false),
                       humanBatsFirst(0), humanChoice(0), computerChoice(0),
                       roundComplete(false) {
        window.setFramerateLimit(60);
        loadFont();
        srand(time(0));
    }
    
    ~CricketGameGUI() {
        delete human;
        delete computer;
    }
    
    void playInnings(bool isFirstInnings) {
        int& totalRuns = isFirstInnings ? firstInningsRuns : secondInningsRuns;
        int& totalWickets = isFirstInnings ? firstInningsWickets : secondInningsWickets;
        int& ballsBowled = isFirstInnings ? balls1 : balls2;
        int target = isFirstInnings ? INT_MAX : (firstInningsRuns + 1);
        
        Player* batsman = (isFirstInnings == humanBatsFirst) ? static_cast<Player*>(human) : static_cast<Player*>(computer);
        Player* bowler = (isFirstInnings == humanBatsFirst) ? static_cast<Player*>(computer) : static_cast<Player*>(human);
        
        while (window.isOpen() && totalWickets < 2 && ballsBowled < 12 && totalRuns < target) {
            Event event;
            while (window.pollEvent(event)) {
                if (event.type == Event::Closed) {
                    window.close();
                    return;
                }
                if (event.type == Event::KeyPressed) {
                    if (event.key.code >= Keyboard::Num1 && event.key.code <= Keyboard::Num6) {
                        humanChoice = (event.key.code - Keyboard::Num1) + 1;
                        gameMessage = "You chose: " + to_string(humanChoice) + ". Press SPACE to play!";
                    }
                    if (event.key.code == Keyboard::Space && humanChoice > 0) {
                        computerChoice = computer->getChoice();
                        
                        stringstream ss;
                        ss << "You: " << humanChoice << " vs Computer: " << computerChoice;
                        
                        if (humanChoice == computerChoice) {
                            totalWickets++;
                            gameMessage = ss.str() + " - WICKET!";
                        } else {
                            totalRuns += humanChoice;
                            gameMessage = ss.str() + " - " + to_string(humanChoice) + " runs!";
                        }
                        
                        ballsBowled++;
                        humanChoice = 0;
                        roundComplete = true;
                    }
                }
            }
            
            window.clear(Color(25, 25, 30));
            drawCricketField(window);
            
            // Draw players
            drawBatsman(window, Vector2f(450, 300));
            drawBowler(window, Vector2f(450, 150));
            
            // Draw ball in motion (animated)
            if (roundComplete) {
                drawBall(window, Vector2f(450, 200));
            }
            
            drawScoreboard(window);
            drawControls(window);
            drawGameMessage(window);
            
            window.display();
            
            if (roundComplete) {
                sleep(milliseconds(1500));
                roundComplete = false;
            }
        }
    }
    
    void run() {
        // Setup players
        human = new HumanPlayer("Player");
        computer = new ComputerPlayer("Computer");
        
        // Display intro
        gameMessage = "Welcome to Cricket Game! Press any number (1-6) to start.";
        bool gameStarting = true;
        
        while (window.isOpen() && gameStarting) {
            Event event;
            while (window.pollEvent(event)) {
                if (event.type == Event::Closed) {
                    window.close();
                    return;
                }
                if (event.type == Event::KeyPressed && event.key.code >= Keyboard::Num1 && event.key.code <= Keyboard::Num6) {
                    humanBatsFirst = 1;
                    gameStarting = false;
                }
            }
            
            window.clear(Color(25, 25, 30));
            drawCricketField(window);
            
            Text intro("CRICKET GAME - GUI VERSION", font, 28);
            intro.setPosition(350, 300);
            intro.setFillColor(Color::Yellow);
            window.draw(intro);
            
            Text startMsg("Press any number (1-6) to begin", font, 16);
            startMsg.setPosition(400, 400);
            startMsg.setFillColor(Color::Green);
            window.draw(startMsg);
            
            window.display();
        }
        
        if (!window.isOpen()) return;
        
        // First Innings
        gameMessage = "First Innings Begins! You are batting!";
        playInnings(true);
        
        if (!window.isOpen()) return;
        
        firstInningsComplete = true;
        sleep(milliseconds(1000));
        
        // Second Innings
        gameMessage = "Second Innings Begins! Computer is batting!";
        playInnings(false);
        
        if (!window.isOpen()) return;
        
        // Display Result
        displayResult();
    }
    
    void displayResult() {
        bool showResult = true;
        
        while (window.isOpen() && showResult) {
            Event event;
            while (window.pollEvent(event)) {
                if (event.type == Event::Closed) {
                    window.close();
                    return;
                }
                if (event.type == Event::KeyPressed) {
                    showResult = false;
                }
            }
            
            window.clear(Color(25, 25, 30));
            drawCricketField(window);
            
            RectangleShape resultBox(Vector2f(400, 200));
            resultBox.setPosition(425, 200);
            resultBox.setFillColor(Color(50, 50, 50));
            window.draw(resultBox);
            
            Text resultTitle("MATCH RESULT", font, 24);
            resultTitle.setPosition(475, 220);
            resultTitle.setFillColor(Color::Yellow);
            window.draw(resultTitle);
            
            Text runs1("1st Innings: " + to_string(firstInningsRuns) + "/" + to_string(firstInningsWickets), font, 14);
            runs1.setPosition(450, 260);
            runs1.setFillColor(Color::White);
            window.draw(runs1);
            
            Text runs2("2nd Innings: " + to_string(secondInningsRuns) + "/" + to_string(secondInningsWickets), font, 14);
            runs2.setPosition(450, 290);
            runs2.setFillColor(Color::White);
            window.draw(runs2);
            
            string winnerText;
            Color winnerColor;
            
            if (firstInningsRuns > secondInningsRuns) {
                winnerText = "First Innings WINS!";
                winnerColor = Color::Green;
            } else if (secondInningsRuns > firstInningsRuns) {
                winnerText = "Second Innings WINS!";
                winnerColor = Color::Green;
            } else {
                winnerText = "It's a TIE!";
                winnerColor = Color::Cyan;
            }
            
            Text winner(winnerText, font, 18);
            winner.setPosition(475, 330);
            winner.setFillColor(winnerColor);
            window.draw(winner);
            
            Text pressKey("Press any key to exit", font, 12);
            pressKey.setPosition(475, 370);
            pressKey.setFillColor(Color::White);
            window.draw(pressKey);
            
            window.display();
        }
    }
};

int main() {
    try {
        CricketGameGUI game;
        game.run();
    } catch (const exception& e) {
        cerr << "Error: " << e.what() << endl;
        return 1;
    }
    return 0;
}
