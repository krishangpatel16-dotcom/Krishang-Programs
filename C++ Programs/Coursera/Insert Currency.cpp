#include <iostream>
#include <map>
#include <string>
#include <stdexcept>

using namespace std;

class Wallet {
private:
    map<string, double> currencies;

public:
    void insertCurrency(const string& type, double amount);
    void printBalances() const;
};

void Wallet::insertCurrency(const string& type, double amount) {
    if (amount < 0) {
        throw invalid_argument("Amount cannot be less than 0");
    }
    
    // In C++, map[key] += value creates the key if it doesn't exist,
    // so we can simplify the original logic significantly.
    currencies[type] += amount;
}

void Wallet::printBalances() const {
    cout << "--- Wallet Balances ---" << endl;
    for (auto const& [type, amount] : currencies) {
        cout << type << ": " << amount << endl;
    }
}

int main() {
    Wallet w;
    try {
        w.insertCurrency("USD", 100);
        w.insertCurrency("USD", 50);
        w.insertCurrency("BTC", 0.005);
        
        // Testing the exception
        cout << "Attempting to add negative amount..." << endl;
        w.insertCurrency("USD", -10); 
    } 
    catch (const invalid_argument& e) {
        cerr << "Error: " << e.what() << endl;
    }

    w.printBalances();
    return 0;
}