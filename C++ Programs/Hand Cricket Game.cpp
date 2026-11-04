#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <map>
#include <cstdlib>
#include <ctime>
#include <iomanip>
#include <climits>
using namespace std;

// Abstract base class for Player (Abstraction)
class Player {
protected:
    string name;
    int runs;
    int wickets;

public:
    Player(string playerName = "") : name(playerName), runs(0), wickets(0) {}

    // Pure virtual functions for polymorphism
    virtual void bat(int userChoice, int compChoice) = 0;
    virtual void bowl(int userChoice, int compChoice) = 0;
    virtual void displayScore() const = 0;

    // Common getter methods (Encapsulation)
    string getName() const { return name; }
    int getRuns() const { return runs; }
    int getWickets() const { return wickets; }

    void setName(string newName) { name = newName; }
    void addRuns(int r) { runs += r; }
    void addWicket() { wickets++; }
    void resetStats() { runs = 0; wickets = 0; }

    virtual ~Player() {} // Virtual destructor for proper cleanup
};

// HumanPlayer class inheriting from Player (Inheritance)
class HumanPlayer : public Player {
public:
    HumanPlayer(string playerName) : Player(playerName) {}

    void bat(int userChoice, int compChoice) override {
        if (userChoice != compChoice) {
            addRuns(userChoice);
        } else {
            addWicket();
        }
    }

    void bowl(int userChoice, int compChoice) override {
        if (userChoice == compChoice) {
            addWicket();
        }
    }

    void displayScore() const override {
        cout << "Your Score: " << runs << "/" << wickets << endl;
    }

    int getUserInput() {
        int choice;
        while (true) {
            cout << "Choose any number from 1 to 6: ";
            cin >> choice;
            if (choice >= 1 && choice <= 6) {
                return choice;
            }
            cout << "Please choose a value from 1 to 6." << endl;
        }
    }
};

// ComputerPlayer class inheriting from Player (Inheritance + Polymorphism)
class ComputerPlayer : public Player {
public:
    ComputerPlayer(string playerName) : Player(playerName) {}

    void bat(int userChoice, int compChoice) override {
        if (userChoice != compChoice) {
            addRuns(compChoice);
        } else {
            addWicket();
        }
    }

    void bowl(int userChoice, int compChoice) override {
        if (userChoice == compChoice) {
            addWicket();
        }
    }

    void displayScore() const override {
        cout << "Computer Score: " << runs << "/" << wickets << endl;
    }

    int getRandomChoice() {
        return (rand() % 6) + 1;
    }
};

// AuthenticationManager class (Encapsulation + File Handling)
class AuthenticationManager {
private:
    map<string, string> credentials;
    const string CREDENTIALS_FILE = "user_data.txt";

    void loadCredentials() {
        ifstream file(CREDENTIALS_FILE);
        if (!file.is_open()) return;

        string line;
        while (getline(file, line)) {
            size_t pos = line.find(':');
            if (pos != string::npos) {
                string username = line.substr(0, pos);
                string password = line.substr(pos + 1);
                credentials[username] = password;
            }
        }
        file.close();
    }

    void saveCredentials(const string& username, const string& password) {
        ofstream file(CREDENTIALS_FILE, ios::app);
        if (file.is_open()) {
            file << username << ":" << password << endl;
            file.close();
        }
    }

public:
    AuthenticationManager() {
        loadCredentials();
    }

    bool login(string& username) {
        string password;
        cout << "Enter your username: ";
        cin >> username;
        cout << "Enter your password: ";
        cin >> password;

        if (credentials.find(username) != credentials.end() &&
            credentials[username] == password) {
            cout << "Login successful!" << endl;
            return true;
        }
        return false;
    }

    bool signup(string& username) {
        cout << "Enter a new username: ";
        cin >> username;
        if (credentials.find(username) != credentials.end()) {
            cout << "Username already exists. Please choose another one." << endl;
            return false;
        }

        string password;
        cout << "Enter a password: ";
        cin >> password;
        saveCredentials(username, password);
        cout << "Registration successful!" << endl;
        return true;
    }
};

// CricketGame class (Encapsulation + Main game logic)
class CricketGame {
private:
    HumanPlayer* human;
    ComputerPlayer* computer;
    bool humanBatsFirst;

    int toss() {
        string choice;
        cout << "Choose heads or tails: ";
        cin >> choice;

        int tossResult = (rand() % 2) + 1; // 1 = heads, 2 = tails
        bool userWonToss = (tossResult == 1 && choice == "heads") ||
                          (tossResult == 2 && choice == "tails");

        if (userWonToss) {
            cout << "You won the toss!" << endl;
            string userChoice;
            cout << "Choose bat or ball: ";
            cin >> userChoice;
            humanBatsFirst = (userChoice == "bat");
        } else {
            cout << "You lost the toss. Computer chooses to ";
            humanBatsFirst = (rand() % 2 == 0);
            cout << (humanBatsFirst ? "bowl" : "bat") << endl;
        }
        return humanBatsFirst ? 1 : 0;
    }

    void playInnings(Player* batsman, Player* bowler, int& totalRuns, int& totalWickets, int& ballsBowled, int target = INT_MAX) {
        while (totalWickets < 2 && ballsBowled < 12 && totalRuns < target) {
            int batsmanChoice, bowlerChoice;
            if (batsman == human) {
                batsmanChoice = human->getUserInput();
                bowlerChoice = computer->getRandomChoice();
            } else {
                batsmanChoice = computer->getRandomChoice();
                bowlerChoice = human->getUserInput();
            }

            cout << batsman->getName() << "'s choice: " << batsmanChoice << " | " << bowler->getName() << "'s choice: " << bowlerChoice << endl;

            if (batsmanChoice == bowlerChoice) {
                totalWickets++;
                cout << "WICKET! " << batsman->getName() << " is OUT!" << endl;
            } else {
                totalRuns += batsmanChoice;
            }

            ballsBowled++;
            cout << "Score: " << totalRuns << "/" << totalWickets << endl;

            if (ballsBowled == 6) cout << "End of Over 1" << endl;
            if (ballsBowled == 12) cout << "End of Over 2" << endl;
            cout << "Balls remaining: " << (12 - ballsBowled) << endl;
        }
    }

public:
    CricketGame() : human(nullptr), computer(nullptr), humanBatsFirst(false) {
        srand(time(0));
    }

    void initializePlayers(const string& username) {
        if (human) delete human;
        if (computer) delete computer;
        
        human = new HumanPlayer(username);
        computer = new ComputerPlayer("Computer");
    }

    void startNewGame() {
        if (!human || !computer) {
            cout << "Error: Players not initialized!" << endl;
            return;
        }
        
        // Reset player stats
        human->resetStats();
        computer->resetStats();
        
        displayInstructions();
        int tossResult = toss();

        // First Innings
        cout << "\n---------- First Innings Begins ----------" << endl;
        int firstInningsRuns = 0, firstInningsWickets = 0, balls1 = 0;
        Player* firstBatsman = tossResult ? static_cast<Player*>(human) : static_cast<Player*>(computer);
        Player* firstBowler = tossResult ? static_cast<Player*>(computer) : static_cast<Player*>(human);
        playInnings(firstBatsman, firstBowler, firstInningsRuns, firstInningsWickets, balls1, INT_MAX);

        // Second Innings
        cout << "\n---------- Second Innings Begins ----------" << endl;
        int secondInningsRuns = 0, secondInningsWickets = 0, balls2 = 0;
        Player* secondBatsman = tossResult ? static_cast<Player*>(computer) : static_cast<Player*>(human);
        Player* secondBowler = tossResult ? static_cast<Player*>(human) : static_cast<Player*>(computer);

        playInnings(secondBatsman, secondBowler, secondInningsRuns, secondInningsWickets, balls2, firstInningsRuns + 1);

        displayResult(firstInningsRuns, firstInningsWickets, secondInningsRuns, secondInningsWickets, tossResult);
    }

    void start() {
        string username;
        AuthenticationManager auth;

        // Authentication
        while (true) {
            cout << "\n========== CRICKET GAME ==========" << endl;
            cout << "1. Login" << endl;
            cout << "2. Signup" << endl;
            cout << "3. Exit" << endl;
            cout << "Enter your choice: ";
            
            int choice;
            cin >> choice;
            
            if (choice == 1) {
                if (auth.login(username)) break;
                else cout << "Invalid credentials. Please try again." << endl;
            } else if (choice == 2) {
                if (auth.signup(username)) break;
            } else if (choice == 3) {
                cout << "Thank you for playing! Goodbye!" << endl;
                exit(0);
            } else {
                cout << "Invalid choice. Please try again." << endl;
            }
        }
        
        initializePlayers(username);
        
        // Main game loop
        bool continuePlaying = true;
        while (continuePlaying) {
            startNewGame();
            
            // Ask to play again
            cout << "\n========== MENU ==========" << endl;
            cout << "1. Play Again" << endl;
            cout << "2. Exit" << endl;
            cout << "Enter your choice: ";
            
            int playChoice;
            cin >> playChoice;
            
            if (playChoice == 2) {
                continuePlaying = false;
                cout << "\nThanks for playing, " << username << "! See you next time!" << endl;
            } else if (playChoice != 1) {
                cout << "Invalid choice. Exiting game." << endl;
                continuePlaying = false;
            }
        }
        
        delete human;
        delete computer;
    }

private:
    void displayInstructions() {
        cout << "\n~~~~~~~~~~ Game of Cricket ~~~~~~~~~~" << endl;
        cout << "Instructions:" << endl;
        cout << "1. You select a number from 1 to 6. Computer also selects randomly." << endl;
        cout << "2. While batting: Different numbers = runs added, Same = wicket lost" << endl;
        cout << "3. While bowling: Same numbers = opponent wicket lost" << endl;
        cout << "4. Each team gets 2 wickets and 2 overs (12 balls)" << endl;
        cout << "5. Highest score wins!" << endl;
        cout << "\n---------- Start Game ----------" << endl;
    }

    void displayResult(int r1, int w1, int r2, int w2, int tossResult) {
        cout << "\n~~~~~~~~~~ Result ~~~~~~~~~~" << endl;
        cout << "First Innings: " << r1 << "/" << w1 << endl;
        cout << "Second Innings: " << r2 << "/" << w2 << endl;

        int target = r1 + 1;
        if (tossResult) { // human batted first, computer chasing
            if (r2 >= target) {
                cout << "Computer WINS by " << (2 - w2) << " wickets!" << endl;
            } else {
                cout << "You WIN by " << (r1 - r2) << " runs!" << endl;
            }
        } else { // computer batted first, human chasing
            if (r2 >= target) {
                cout << "You WIN by " << (2 - w2) << " wickets!" << endl;
            } else {
                cout << "Computer WINS by " << (r1 - r2) << " runs!" << endl;
            }
        }
    }
};

int main() {
    CricketGame game;
    game.start();
    return 0;
}