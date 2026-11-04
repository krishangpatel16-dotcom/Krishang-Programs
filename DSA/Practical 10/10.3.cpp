#include <iostream>
using namespace std;

int main()
{
    int table[10];
    for(int i = 0; i < 10; i++) {
        table[i] = -1;
    }

    int n;
    cout << "Enter number of students: ";
    cin >> n;
    if(n > 10) {
        cout << "Table can store only 10 students." << endl;
        return 0;
    }
    cout << "Enter student IDs:" << endl;
    for(int i = 0; i < n; i++) {
        int key;
        cin >> key;

        int h1 = key % 10;
        int h2 = 7 - (key % 7);

        int index;
        bool inserted = false;

        for(int j = 0; j < 10; j++) {
            index = (h1 + j * h2) % 10;

            if(table[index] == -1)
            {
                table[index] = key;
                inserted = true;
                break;
            }
        }

        if(!inserted) {
            cout << "Could not insert " << key << endl;
        }
    }
    cout << "\nFinal hash table:" << endl;
    for(int i = 0; i < 10; i++) {
        cout << "Slot " << i << ": ";
        if(table[i] == -1) {
            cout << "Empty";
        }
        else {
            cout << table[i];
        }
        cout << endl;
    }
    return 0;
}