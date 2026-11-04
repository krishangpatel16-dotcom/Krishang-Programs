#include <iostream>
using namespace std;

struct Node {
    int patientID;
    Node* next;
};

bool isEmpty(Node* front, Node* rear) {
    return front == NULL && rear == NULL;
}

void enqueue(Node*& front, Node*& rear, int value) {
    Node* newNode = new Node;
    newNode->patientID = value;
    newNode->next = NULL;

    if (isEmpty(front, rear)) {
        front = newNode;
        rear = newNode;
    } else {
        rear->next = newNode;
        rear = newNode;
    }

    cout << "Patient " << value << " arrived and joined the queue." << endl;
}

void dequeue(Node*& front, Node*& rear) {
    if (isEmpty(front, rear)) {
        cout << "Queue is empty. No patient to attend." << endl;
        return;
    }

    Node* temp = front;
    cout << "Attended patient: " << front->patientID << endl;

    front = front->next;
    delete temp;

    if (front == NULL) {
        rear = NULL;
    }
}

int frontPatient(Node* front) {
    if (front == NULL) {
        return -1;
    }
    return front->patientID;
}

void displayQueue(Node* front) {
    if (front == NULL) {
        cout << "Queue: Empty" << endl;
        return;
    }

    Node* temp = front;
    cout << "Queue: ";
    while (temp != NULL) {
        cout << temp->patientID;
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

    cout << "Problem 2: Unbounded Patient Queue" << endl;
    cout << "----------------------------------" << endl;

    enqueue(front, rear, 101);
    enqueue(front, rear, 102);
    enqueue(front, rear, 103);
    displayQueue(front);
    cout << "Current front patient: " << frontPatient(front) << endl;

    dequeue(front, rear);
    displayQueue(front);
    cout << "Current front patient: " << frontPatient(front) << endl;

    enqueue(front, rear, 104);
    enqueue(front, rear, 105);
    displayQueue(front);
    cout << "Current front patient: " << frontPatient(front) << endl;

    dequeue(front, rear);
    dequeue(front, rear);
    dequeue(front, rear);
    displayQueue(front);
    cout << "Current front patient: " << frontPatient(front) << endl;

    return 0;
}
