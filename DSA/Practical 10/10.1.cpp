#include <iostream>
using namespace std;

const int SIZE = 10;

void display(int table[]) {
    cout << "\nFinal parking lot state:" << endl;
    for (int i = 0; i < SIZE; i++) {
        cout << "Slot " << i << ": ";
        if (table[i] == -1)
            cout << "Empty";
        else
            cout << table[i];
        cout << endl;
    }
}

int main() {
    int table[SIZE];
    for (int i = 0; i < SIZE; i++)
        table[i] = -1;

    int n;
    cout << "Enter number of vehicles: ";
    cin >> n;

    if (n > SIZE) {
        cout << "Parking lot has only 10 slots." << endl;
        return 0;
    }

    cout << "Enter vehicle registration numbers:" << endl;
    for (int i = 0; i < n; i++) {
        int regNo;
        cin >> regNo;

        int hash = regNo % SIZE;
        bool inserted = false;

        for (int probe = 0; probe < SIZE; probe++) {
            int index = (hash + probe) % SIZE;

            if (table[index] == -1) {
                table[index] = regNo;
                inserted = true;
                cout << "Vehicle " << regNo << " assigned to slot " << index << endl;
                break;
            }
        }

        if (!inserted) {
            cout << "Vehicle " << regNo << " could not be parked. No empty slot available." << endl;
        }
    }

    display(table);

    cout << "\nExplanation:" << endl;
    cout << "- If the home slot is occupied, the vehicle moves to the next slot in order." << endl;
    cout << "- When the table is nearly full, many vehicles may collide into the same cluster." << endl;
    cout << "- If every slot is occupied, the program reports that no parking space is available." << endl;
    cout << "- A linear probing implementation does not loop forever in a normal hash table because it checks all slots within the table size." << endl;

    return 0;
}
