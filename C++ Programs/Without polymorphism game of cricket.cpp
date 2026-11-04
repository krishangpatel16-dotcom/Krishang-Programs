#include <iostream>
#include <fstream>
#include <string>
#include <cstdlib>
#include <ctime>
#include <climits>
using namespace std;

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

    void addRuns(int r) {
        runs += r;
    }

    void addWicket() {
        wickets++;
    }

    void addWickets(int w) {
        wickets += w;
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

    void setRuns(int r) {
        runs = r;
    }

    void setWickets(int w) {
        wickets = w;
    }
};

// Derived class HumanPlayer
class HumanPlayer : public Player {
public:
    HumanPlayer(string playerName) : Player(playerName) {}

    int getChoice() {
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

    string getType() {
        return "Human";
    }
};

// Derived class ComputerPlayer
class ComputerPlayer : public Player {
public:
    ComputerPlayer(string playerName) : Player(playerName) {}

    int getChoice() {
        return (rand() % 6) + 1;
    }

    string getType() {
        return "Computer";
    }
};

// Authentication class
class AuthenticationManager {
private:
    struct User {
        string username;
        string password;
    };

    User users[100];
    int userCount;
    const string CREDENTIALS_FILE = "user_data.txt";

    void loadCredentials() {
        ifstream file(CREDENTIALS_FILE);
        if (!file.is_open()) return;

        userCount = 0;
        string line;
        while (getline(file, line) && userCount < 100) {
            int pos = line.find(':');
            if (pos != -1) {
                users[userCount].username = line.substr(0, pos);
                users[userCount].password = line.substr(pos + 1);
                userCount++;
            }
        }
        file.close();
    }

    void saveCredentials(string username, string password) {
        ofstream file(CREDENTIALS_FILE, ios::app);
        if (file.is_open()) {
            file << username << ":" << password << endl;
            file.close();
        }
    }

    bool findUser(string username, string& password) {
        for (int i = 0; i < userCount; i++) {
            if (users[i].username == username) {
                password = users[i].password;
                return true;
            }
        }
        return false;
    }

    bool userExists(string username) {
        string temp;
        return findUser(username, temp);
    }

public:
    AuthenticationManager() {
        userCount = 0;
        loadCredentials();
    }

    bool login(string& username) {
        string password;
        cout << "Enter your username: ";
        cin >> username;
        cout << "Enter your password: ";
        cin >> password;

        string storedPassword;
        if (findUser(username, storedPassword) && storedPassword == password) {
            cout << "Login successful!" << endl;
            return true;
        }
        cout << "Invalid username or password!" << endl;
        return false;
    }

    bool signup(string& username) {
        cout << "Enter a new username: ";
        cin >> username;

        if (userExists(username)) {
            cout << "Username already exists. Please choose another one." << endl;
            return false;
        }

        string password;
        cout << "Enter a password: ";
        cin >> password;

        if (userCount < 100) {
            users[userCount].username = username;
            users[userCount].password = password;
            userCount++;
            saveCredentials(username, password);
            cout << "Registration successful!" << endl;
            return true;
        }

        cout << "User limit reached!" << endl;
        return false;
    }
};

// Game class
class CricketGame {
private:
    HumanPlayer* human;
    ComputerPlayer* computer;
    AuthenticationManager auth;
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

    void playInnings(HumanPlayer* human, ComputerPlayer* computer, bool isHumanBatting,
                     int& totalRuns, int& totalWickets, int& ballsBowled, int target) {
        if (isHumanBatting) {
            cout << "\n" << human->getName() << " (" << human->getType() << ") is batting" << endl;
            cout << computer->getName() << " (" << computer->getType() << ") is bowling" << endl;
        } else {
            cout << "\n" << computer->getName() << " (" << computer->getType() << ") is batting" << endl;
            cout << human->getName() << " (" << human->getType() << ") is bowling" << endl;
        }

        while (totalWickets < 2 && ballsBowled < 12 && totalRuns < target) {
            int batsmanChoice, bowlerChoice;

            if (isHumanBatting) {
                batsmanChoice = human->getChoice();
                bowlerChoice = computer->getChoice();
            } else {
                batsmanChoice = computer->getChoice();
                bowlerChoice = human->getChoice();
            }

            if (isHumanBatting) {
                cout << human->getName() << "'s choice: " << batsmanChoice
                     << " | " << computer->getName() << "'s choice: " << bowlerChoice << endl;
            } else {
                cout << computer->getName() << "'s choice: " << batsmanChoice
                     << " | " << human->getName() << "'s choice: " << bowlerChoice << endl;
            }

            if (batsmanChoice == bowlerChoice) {
                totalWickets++;
                if (isHumanBatting) {
                    cout << "WICKET! " << human->getName() << " is OUT!" << endl;
                } else {
                    cout << "WICKET! " << computer->getName() << " is OUT!" << endl;
                }
            } else {
                totalRuns += batsmanChoice;
                cout << "Added " << batsmanChoice << " runs!" << endl;
            }

            ballsBowled++;
            cout << "Score: " << totalRuns << "/" << totalWickets << endl;

            if (ballsBowled == 6) cout << "End of Over 1" << endl;
            if (ballsBowled == 12) cout << "End of Over 2" << endl;
            cout << "Balls remaining: " << (12 - ballsBowled) << endl << endl;
        }
    }

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

        if (tossResult) { // human batted first
            if (r1 > r2) {
                cout << "\n🎉 You WIN by " << (r1 - r2) << " runs! 🎉" << endl;
            } else if (r2 > r1) {
                cout << "\n💻 Computer WINS by " << (2 - w2) << " wickets! 💻" << endl;
            } else {
                cout << "\n🤝 It's a TIE! 🤝" << endl;
            }
        } else { // computer batted first
            if (r1 > r2) {
                cout << "\n💻 Computer WINS by " << (r1 - r2) << " runs! 💻" << endl;
            } else if (r2 > r1) {
                cout << "\n🎉 You WIN by " << (2 - w2) << " wickets! 🎉" << endl;
            } else {
                cout << "\n🤝 It's a TIE! 🤝" << endl;
            }
        }
    }

public:
    CricketGame() : human(nullptr), computer(nullptr), humanBatsFirst(false) {
        srand(time(0));
    }

    ~CricketGame() {
        delete human;
        delete computer;
    }

    void start() {
        string username;

        // Authentication
        while (true) {
            cout << "\n=== CRICKET GAME ===" << endl;
            cout << "Do you want to login or signup? (login/signup): ";
            string choice;
            cin >> choice;

            if (choice == "login") {
                if (auth.login(username)) break;
            } else if (choice == "signup") {
                if (auth.signup(username)) break;
            } else {
                cout << "Invalid choice! Please enter 'login' or 'signup'" << endl;
            }
        }

        // Create players using inheritance
        human = new HumanPlayer(username);
        computer = new ComputerPlayer("Computer");

        displayInstructions();
        int tossResult = toss();

        // First Innings
        cout << "\n========== First Innings Begins ==========" << endl;
        int firstInningsRuns = 0, firstInningsWickets = 0, balls1 = 0;

        if (tossResult) { // human bats first
            playInnings(human, computer, true, firstInningsRuns, firstInningsWickets, balls1, INT_MAX);
            human->setRuns(firstInningsRuns);
            human->setWickets(firstInningsWickets);
        } else { // computer bats first
            playInnings(human, computer, false, firstInningsRuns, firstInningsWickets, balls1, INT_MAX);
            computer->setRuns(firstInningsRuns);
            computer->setWickets(firstInningsWickets);
        }

        // Second Innings
        cout << "\n========== Second Innings Begins ==========" << endl;
        int secondInningsRuns = 0, secondInningsWickets = 0, balls2 = 0;

        if (tossResult) { // computer bats second
            playInnings(human, computer, false, secondInningsRuns, secondInningsWickets, balls2, firstInningsRuns + 1);
            computer->setRuns(secondInningsRuns);
            computer->setWickets(secondInningsWickets);
        } else { // human bats second
            playInnings(human, computer, true, secondInningsRuns, secondInningsWickets, balls2, firstInningsRuns + 1);
            human->setRuns(secondInningsRuns);
            human->setWickets(secondInningsWickets);
        }

        displayResult(firstInningsRuns, firstInningsWickets, secondInningsRuns, secondInningsWickets, tossResult);

        // Display final player stats
        cout << "\n========== Final Stats ==========" << endl;
        cout << human->getName() << " (" << human->getType() << "): "
             << human->getRuns() << "/" << human->getWickets() << endl;
        cout << computer->getName() << " (" << computer->getType() << "): "
             << computer->getRuns() << "/" << computer->getWickets() << endl;
    }
};

int main() {
    CricketGame game;
    game.start();
    return 0;
}
