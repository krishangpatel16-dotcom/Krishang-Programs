#include <iostream>

/**

* Checks if the wallet contains enough currency.
* @param walletBalance The current balance available.
*@param amountRequired The amount attempted to be sent.
* @return bool - true if sufficient, false otherwise.
*/
bool containsCurrency(double walletBalance, double amountRequired) {
    // If balance is greater than or equal to amount, return true
    if (walletBalance >= amountRequired) {
        return true;
    }
    // Otherwise, return false
    else {
        return false;
    }
}
int main() {
    double myWallet = 150.75;

    // Case 1: Sufficient funds
    std :: cout << "Transaction 1 ($50.00): " << (containsCurrency(myWallet, 50.00) ? "Approved" : "Denied") << std :: endl;

    // Case 2: Exact funds
    std :: cout << "Transaction 2 ($150.75): " << (containsCurrency(myWallet, 150.75) ? "Approved" : "Denied") << std :: endl;

    // Case 3: Insufficient funds
    std :: cout << "Transaction 3 ($200.00): " << (containsCurrency(myWallet, 200.00) ? "Approved" : "Denied") << std :: endl;

    return 0;
}