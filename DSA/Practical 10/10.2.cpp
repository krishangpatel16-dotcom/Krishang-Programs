#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

void insert(Node* table[], int value) {
    int index = value % 10;
    Node* newNode = new Node();
    newNode->data = value;
    newNode->next = table[index];
    table[index] = newNode;
}

void display(Node* table[])
{
    for(int i = 0; i < 10; i++)
    {
        cout << "Shelf " << i << ": ";
        Node* temp = table[i];
        if(temp == NULL) {
            cout << "Empty";
        }
        while(temp != NULL) {
            cout << temp->data;
            if(temp->next != NULL)
                cout << " -> ";
            temp = temp->next;
        }
        cout << endl;
    }
}

int main() 
{
    Node* table[10];
    for(int i = 0; i < 10; i++) {
        table[i] = NULL;
    }
    int n;
    cout << "Enter number of books: ";
    cin >> n;
    cout << " Enter book codes:" << endl;
    for(int i = 0; i < n; i++) {
        int value;
        cin >> value;
        insert(table, value);
    }
    cout << "\nFinal shelf layout:" << endl;
    display(table);
    return 0;
}