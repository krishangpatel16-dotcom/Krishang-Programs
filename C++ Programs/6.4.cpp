// ============================================================================
// BANKING SYSTEM - HIERARCHICAL CLASS DESIGN
// ============================================================================
// Purpose: Implement a structured banking system using inheritance and 
//          encapsulation to demonstrate real-world account operations.
//
// Concepts Covered:
// - Base class with secure encapsulation
// - Derived classes (Savings Account, Current Account)
// - Constructors and Destructors for resource management
// - Transaction history with undo functionality
// - Polymorphism through method overriding
// ============================================================================

#include <iostream>
#include <string>

using namespace std;

// ============================================================================
// BASE CLASS: Account
// ============================================================================
// Purpose: Provide fundamental account operations and transaction tracking
// Access Control:
//   - private: accountNumber, balance, transactions (secure from outside)
//   - protected: addTransaction (accessible to derived classes)
//   - public: deposit, withdraw, display, history management
// ============================================================================

class Account {
protected:
    // Account attributes (protected for encapsulation)
    string accountNumber;
    double balance;
    
    // Transaction history storage
    string transactionType[20];      // Type: "Deposit", "Withdraw", "Interest"
    double transactionAmount[20];    // Amount involved in transaction
    double transactionPrevBalance[20]; // Balance state before transaction
    int transactionCount;            // Current number of transactions

public:
    // CONSTRUCTOR: Initialize account with account number and balance
    Account(string accountNumber, double initialBalance)
        : accountNumber(accountNumber), balance(initialBalance), transactionCount(0) {
        cout << ">> Account " << accountNumber << " created with balance $" 
             << balance << "\n";
    }

    // DESTRUCTOR: Clean up resources when account is destroyed
    ~Account() {
        cout << ">> Account " << accountNumber << " closed.\n";
    }

    // DEPOSIT: Add funds to the account
    // Security: Validates amount and records transaction
    void deposit(double amount) {
        // Input validation
        if (amount <= 0) {
            cout << "   ERROR: Deposit amount must be positive.\n";
            return;
        }
        
        // Record transaction before updating balance (for undo capability)
        addTransaction("Deposit", amount, balance);
        balance += amount;
        
        cout << "   DEPOSIT: $" << amount << " -> New Balance: $" << balance << "\n";
    }

    // WITHDRAW: Remove funds from the account
    // Security: Ensures sufficient funds before withdrawal
    void withdraw(double amount) {
        // Input validation
        if (amount <= 0) {
            cout << "   ERROR: Withdrawal amount must be positive.\n";
            return;
        }
        
        // Check if sufficient funds
        if (amount > balance) {
            cout << "   ERROR: Insufficient funds. Available: $" << balance << "\n";
            return;
        }
        
        // Record and process transaction
        addTransaction("Withdraw", amount, balance);
        balance -= amount;
        
        cout << "   WITHDRAW: $" << amount << " -> New Balance: $" << balance << "\n";
    }

    // DISPLAY: Show current account details
    // Purpose: Demonstrates encapsulation by controlling how data is displayed
    void display() {
        cout << "\n--- Account Details ---\n";
        cout << "  Account Number: " << accountNumber << "\n";
        cout << "  Current Balance: $" << balance << "\n";
    }

    // SHOW HISTORY: Display all transactions
    // Purpose: Allows users to review transaction history
    void showHistory() {
        cout << "\n--- Transaction History (" << accountNumber << ") ---\n";
        
        if (transactionCount == 0) {
            cout << "  No transactions yet.\n";
            return;
        }
        
        // Display each transaction with details
        for (int i = 0; i < transactionCount; i++) {
            cout << "  [" << (i + 1) << "] " << transactionType[i] 
                 << " $" << transactionAmount[i] 
                 << " (Balance Before: $" << transactionPrevBalance[i] << ")\n";
        }
    }

    // UNDO: Reverse the last transaction
    // Purpose: Demonstrates transaction management and error recovery
    void undoLastTransaction() {
        if (transactionCount == 0) {
            cout << "   ERROR: No transaction to undo.\n";
            return;
        }
        
        // Get the last transaction
        int lastIndex = transactionCount - 1;
        
        // Restore previous balance
        double undoAmount = transactionAmount[lastIndex];
        balance = transactionPrevBalance[lastIndex];
        
        cout << "   UNDO: Reversed " << transactionType[lastIndex] 
             << " $" << undoAmount << " -> Balance: $" << balance << "\n";
        
        // Remove from transaction history
        transactionCount--;
    }

protected:
    // PRIVATE HELPER: Record transaction in history
    // Purpose: Centralized transaction logging for all operations
    // Access: Protected so derived classes can use it
    void addTransaction(string type, double amount, double prevBalance) {
        // Prevent overflow of transaction history
        if (transactionCount >= 20) {
            cout << "   WARNING: Transaction history is full (max 20).\n";
            return;
        }
        
        // Store transaction details
        transactionType[transactionCount] = type;
        transactionAmount[transactionCount] = amount;
        transactionPrevBalance[transactionCount] = prevBalance;
        transactionCount++;
    }
};

// ============================================================================
// DERIVED CLASS: SavingsAccount
// ============================================================================
// Purpose: Specialized account that earns interest on balance
// Extended Features:
//   - Interest rate attribute
//   - applyInterest() method for earning money
// Demonstrates: Inheritance, method overriding, extension of base class
// ============================================================================

class SavingsAccount : public Account {
private:
    double interestRate;  // Annual interest rate (percentage)

public:
    // CONSTRUCTOR: Create savings account with interest rate
    SavingsAccount(string accountNumber, double initialBalance, double interestRate)
        : Account(accountNumber, initialBalance), interestRate(interestRate) {
        cout << "   [Savings] Interest Rate: " << interestRate << "% per year\n";
    }

    // APPLY INTEREST: Calculate and add interest to balance
    // Purpose: Demonstrates specialized functionality of derived class
    void applyInterest() {
        // Calculate interest based on current balance
        double interest = balance * interestRate / 100.0;
        
        // Record as transaction (for history and undo)
        addTransaction("Interest", interest, balance);
        balance += interest;
        
        cout << "   INTEREST: $" << interest << " added -> New Balance: $" 
             << balance << "\n";
    }

    // DISPLAY: Show savings account details (overrides base class)
    // Purpose: Include interest rate in display
    void display() {
        cout << "\n========== SAVINGS ACCOUNT ==========\n";
        cout << "  Account Number: " << accountNumber << "\n";
        cout << "  Current Balance: $" << balance << "\n";
        cout << "  Interest Rate: " << interestRate << "% per year\n";
        cout << "=====================================\n";
    }
};

// ============================================================================
// DERIVED CLASS: CurrentAccount
// ============================================================================
// Purpose: Business account with overdraft facility
// Extended Features:
//   - Overdraft limit attribute
//   - withdraw() override allowing negative balance (within limit)
// Demonstrates: Method overriding, extended constraints validation
// ============================================================================

class CurrentAccount : public Account {
private:
    double overdraftLimit;  // Maximum negative balance allowed

public:
    // CONSTRUCTOR: Create current account with overdraft facility
    CurrentAccount(string accountNumber, double initialBalance, double overdraftLimit)
        : Account(accountNumber, initialBalance), overdraftLimit(overdraftLimit) {
        cout << "   [Current] Overdraft Limit: $" << overdraftLimit << "\n";
    }

    // WITHDRAW: Override to allow overdraft (modified validation)
    // Purpose: Demonstrate polymorphism - different withdrawal rules
    void withdraw(double amount) {
        // Input validation
        if (amount <= 0) {
            cout << "   ERROR: Withdrawal amount must be positive.\n";
            return;
        }
        
        // Check against overdraft limit (NOT just balance)
        // Formula: New balance cannot be less than -overdraftLimit
        if (balance - amount < -overdraftLimit) {
            cout << "   ERROR: Overdraft limit exceeded.\n";
            cout << "          Available (Balance + Overdraft): $" 
                 << (balance + overdraftLimit) << "\n";
            return;
        }
        
        // Record and process transaction
        addTransaction("Withdraw", amount, balance);
        balance -= amount;
        
        cout << "   WITHDRAW: $" << amount << " -> New Balance: $" << balance << "\n";
        
        // Warn if using overdraft
        if (balance < 0) {
            cout << "   WARNING: Overdraft in use. You owe $" << (-balance) << "\n";
        }
    }

    // DISPLAY: Show current account details (overrides base class)
    // Purpose: Include overdraft limit in display
    void display() {
        cout << "\n========== CURRENT ACCOUNT ==========\n";
        cout << "  Account Number: " << accountNumber << "\n";
        cout << "  Current Balance: $" << balance << "\n";
        cout << "  Overdraft Limit: $" << overdraftLimit << "\n";
        cout << "====================================\n";
    }
};

// ============================================================================
// MAIN PROGRAM - DEMONSTRATION
// ============================================================================

int main() {
    cout << "\n";
    cout << "=================================================================\n";
    cout << "           BANKING SYSTEM - HIERARCHY DEMONSTRATION\n";
    cout << "=================================================================\n";

    // STEP 1: CREATE ACCOUNTS
    cout << "\n[STEP 1] Creating Accounts...\n";
    cout << "-----------------------------------\n";
    
    // Create a savings account: $1000 initial balance, 4% interest
    SavingsAccount savings("SA001", 1000.0, 4.0);
    
    // Create a current account: $500 initial balance, $300 overdraft limit
    CurrentAccount current("CA001", 500.0, 300.0);

    // STEP 2: SAVINGS ACCOUNT OPERATIONS
    cout << "\n[STEP 2] Savings Account Transactions...\n";
    cout << "-----------------------------------\n";
    savings.display();
    
    cout << "\nTransaction 1:\n";
    savings.deposit(200.0);
    
    cout << "\nTransaction 2:\n";
    savings.withdraw(100.0);
    
    cout << "\nApplying Interest:\n";
    savings.applyInterest();
    
    savings.display();

    // STEP 3: CURRENT ACCOUNT OPERATIONS
    cout << "\n[STEP 3] Current Account Transactions...\n";
    cout << "-----------------------------------\n";
    current.display();
    
    cout << "\nTransaction 1 (Using Overdraft):\n";
    current.withdraw(700.0);  // Exceeds balance, uses overdraft
    
    cout << "\nTransaction 2:\n";
    current.deposit(250.0);
    
    current.display();

    // STEP 4: VIEW TRANSACTION HISTORY
    cout << "\n[STEP 4] Transaction History Review...\n";
    cout << "-----------------------------------\n";
    savings.showHistory();
    cout << "\n";
    current.showHistory();

    // STEP 5: UNDO OPERATIONS
    cout << "\n[STEP 5] Demonstrating Undo Functionality...\n";
    cout << "-----------------------------------\n";
    cout << "Before Undo:\n";
    savings.display();
    
    cout << "Executing Undo:\n";
    savings.undoLastTransaction();
    
    cout << "\nAfter Undo:\n";
    savings.display();
    
    cout << "\nUpdated History:\n";
    savings.showHistory();

    // STEP 6: ERROR HANDLING
    cout << "\n[STEP 6] Testing Error Handling...\n";
    cout << "-----------------------------------\n";
    
    cout << "\nAttempt 1: Deposit negative amount\n";
    savings.deposit(-100);
    
    cout << "\nAttempt 2: Withdraw more than available (Savings)\n";
    savings.withdraw(5000);
    
    cout << "\nAttempt 3: Exceed overdraft in Current Account\n";
    current.withdraw(1500);  // Limit is $300, balance negative, so max is 800

    // SUMMARY
    cout << "\n=================================================================\n";
    cout << "                   FINAL ACCOUNT STATUS\n";
    cout << "=================================================================\n";
    savings.display();
    current.display();

    cout << "\n[CLEANUP] Destructors will be called automatically...\n";
    cout << "=================================================================\n\n";

    return 0;
}
