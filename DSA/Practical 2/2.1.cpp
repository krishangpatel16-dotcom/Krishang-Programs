#include <iostream>
#include <string>
using namespace std;

int linearSearch(string plates[], int size, string target) {
    for (int i = 0; i < size; i++) {
        if (plates[i] == target) {
            return i + 1;
        }
    }
    return -1;
}

int recursiveSearch(string plates[], int size, string target, int index = 0) {
    if (index >= size) {
        return -1;
    }

    if (plates[index] == target) {
        return index + 1;
    }

    return recursiveSearch(plates, size, target, index + 1);
}

int main() {
    int n;
    string plates[100], target;

    cout << "Enter number of license plates: ";
    cin >> n;

    cout << "Enter license plates:\n";
    for (int i = 0; i < n; i++)
    {
        cin >> plates[i];
    }

    cout << "Enter target license plate: ";
    cin >> target;

    int iterativePosition = linearSearch(plates, n, target);
    int recursivePosition = recursiveSearch(plates, n, target);

    cout << "\nIterative search: ";
    if (iterativePosition != -1) {
        cout << "Target found at position " << iterativePosition << endl;
    } else {
        cout << "Target not found" << endl;
    }

    cout << "Recursive search: ";
    if (recursivePosition != -1) {
        cout << "Target found at position " << recursivePosition << endl;
    } else {
        cout << "Target not found" << endl;
    }

    return 0;
}

