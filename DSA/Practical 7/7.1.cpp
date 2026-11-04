#include <iostream>
using namespace std;

const int MAX = 5;

struct Node {
    int token;
    Node* next;
};

bool isEmpty(Node* front, Node* rear) {
    return front == NULL && rear == NULL;
}

bool isFull(Node* front, Node* rear) {
    int count = 0;
    Node* temp = front;
    while (temp != NULL) {
        count++;
        temp = temp->next;
    }
    return count >= MAX;
}

void enqueue(Node*& front, Node*& rear, int value) {
    if (isFull(front, rear)) {
        cout << "Queue is full. Cannot issue token " << value << "." << endl;
        return;
    }

    Node* newNode = new Node;
    newNode->token = value;
    newNode->next = NULL;

    if (isEmpty(front, rear)) {
        front = newNode;
        rear = newNode;
    } else {
        rear->next = newNode;
        rear = newNode;
    }

    cout << "Token " << value << " issued." << endl;
}

void dequeue(Node*& front, Node*& rear) {
    if (isEmpty(front, rear)) {
        cout << "Queue is empty. No token can be served." << endl;
        return;
    }

    Node* temp = front;
    cout << "Served token: " << front->token << endl;

    front = front->next;
    delete temp;

    if (front == NULL) {
        rear = NULL;
    }
}

int frontToken(Node* front) {
    if (front == NULL) {
        return -1;
    }
    return front->token;
}

void displayQueue(Node* front) {
    if (front == NULL) {
        cout << "Queue: Empty" << endl;
        return;
    }

    Node* temp = front;
    cout << "Queue: ";
    while (temp != NULL) {
        cout << temp->token;
        if (temp->next != NULL) {
            cout << " <- ";
        }
        temp = temp->next;
    }
    cout << endl;
}

int main() {
    Node* front = NULL;
    Node* rear = NULL;

    cout << "Problem 1: Token Counter Queue" << endl;
    cout << "------------------------------" << endl;

    enqueue(front, rear, 101);
    enqueue(front, rear, 102);
    enqueue(front, rear, 103);
    displayQueue(front);
    cout << "Current front token: " << frontToken(front) << endl;

    dequeue(front, rear);
    displayQueue(front);
    cout << "Current front token: " << frontToken(front) << endl;

    enqueue(front, rear, 104);
    enqueue(front, rear, 105);
    enqueue(front, rear, 106);
    displayQueue(front);

    dequeue(front, rear);
    dequeue(front, rear);
    displayQueue(front);
    cout << "Current front token: " << frontToken(front) << endl;

    return 0;
}
