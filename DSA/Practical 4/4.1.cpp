#include <iostream>
using namespace std;

struct Node {
    int token;
    Node* next;
};

Node* createNode(int value) {
    Node* newNode = new Node;
    newNode->token = value;
    newNode->next = NULL;
    return newNode;
}

int length(Node* head) {
    int count = 0;
    Node* temp = head;
    while (temp != NULL) {
        count++;
        temp = temp->next;
    }
    return count;
}

void insertFront(Node*& head, int value) {
    Node* newNode = createNode(value);
    newNode->next = head;
    head = newNode;
}

void insertEnd(Node*& head, int value) {
    Node* newNode = createNode(value);

    if (head == NULL) {
        head = newNode;
        return;
    }

    Node* temp = head;
    while (temp->next != NULL) {
        temp = temp->next;
    }

    temp->next = newNode;
}

void insertAtPosition(Node*& head, int position, int value) {
    if (position < 1) {
        cout << "Invalid position. Position must be >= 1." << endl;
        return;
    }

    int n = length(head);
    if (position > n + 1) {
        cout << "Position is greater than the current queue length. Insertion not allowed." << endl;
        return;
    }

    if (position == 1) {
        insertFront(head, value);
        return;
    }

    Node* newNode = createNode(value);
    Node* temp = head;

    for (int i = 1; i < position - 1; i++) {
        temp = temp->next;
    }

    newNode->next = temp->next;
    temp->next = newNode;
}

Node* deleteByValue(Node* head, int value) {
    Node* temp = head;
    Node* prev = NULL;

    while (temp != NULL && temp->token != value) {
        prev = temp;
        temp = temp->next;
    }

    if (temp == NULL) {
        cout << "Patient token " << value << " not found in the queue." << endl;
        return head;
    }

    if (prev == NULL) {
        head = head->next;
    } else {
        prev->next = temp->next;
    }

    delete temp;
    cout << "Patient token " << value << " removed from the queue." << endl;
    return head;
}

void forwardTraversal(Node* head) {
    cout << "Forward traversal: ";
    Node* temp = head;
    while (temp != NULL) {
        cout << temp->token;
        if (temp->next != NULL) {
            cout << " -> ";
        }
        temp = temp->next;
    }
    cout << endl;
}

void reversePrint(Node* head) {
    if (head == NULL) {
        return;
    }

    reversePrint(head->next);
    cout << head->token;
    if (head->next != NULL) {
        cout << " -> ";
    }
}

void display(Node* head) {
    if (head == NULL) {
        cout << "Queue is empty." << endl;
        return;
    }

    Node* temp = head;
    cout << "Queue: ";
    while (temp != NULL) {
        cout << temp->token;
        if (temp->next != NULL) {
            cout << " -> ";
        }
        temp = temp->next;
    }
    cout << endl;
}

int main() {
    Node* head = NULL;

    cout << "Problem 1: Hospital Patient Token Queue" << endl;
    cout << "------------------------------------" << endl;

    cout << "1. Critical patient added to front" << endl;
    insertFront(head, 101);
    display(head);

    cout << "2. Routine patient added to end" << endl;
    insertEnd(head, 202);
    display(head);

    cout << "3. Priority patient inserted at position 2" << endl;
    insertAtPosition(head, 2, 303);
    display(head);

    cout << "4. Critical patient added to front" << endl;
    insertFront(head, 50);
    display(head);

    cout << "5. Invalid position test: position 10 for queue length 4" << endl;
    insertAtPosition(head, 10, 999);
    display(head);

    cout << "6. Routine patient added to end" << endl;
    insertEnd(head, 404);
    display(head);

    cout << "\n7. Delete a patient token by value" << endl;
    head = deleteByValue(head, 303);
    display(head);

    cout << "8. Reverse print of current queue" << endl;
    cout << "Reverse Queue: ";
    reversePrint(head);
    cout << endl;

    cout << "9. Forward traversal of queue" << endl;
    forwardTraversal(head);

    return 0;
}
