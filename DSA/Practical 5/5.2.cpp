#include<iostream>
using namespace std;

struct Node {
    string name;
    Node* prev;
    Node* next;
};

Node* createStudent(string name) {
    Node* s = new Node;
    s->name = name;
    s->prev = NULL;
    s->next = NULL;
    return s;
}

void insertAtBeginning(Node*& head, string name) {
    Node* newStudent = createStudent(name);

    if (head == NULL) {
        head = newStudent;
        newStudent->next = head;
        newStudent->prev = head;
        return;
    }

    Node* tail = head->prev;
    newStudent->next = head;
    newStudent->prev = tail;
    head->prev = newStudent;
    tail->next = newStudent;
    head = newStudent;
}

void insertAtEnd(Node*& head, string name) {
    Node* newStudent = createStudent(name);

    if (head == NULL) {
        head = newStudent;
        newStudent->next = head;
        newStudent->prev = head;
        return;
    }

    Node* tail = head->prev;
    newStudent->next = head;
    newStudent->prev = tail;
    tail->next = newStudent;
    head->prev = newStudent;
}

void insertAtPosition(Node*& head, int position, string name) {
    if (position <= 0) {
        cout << "Invalid position." << endl;
        return;
    }

    if (head == NULL) {
        insertAtBeginning(head, name);
        return;
    }

    if (position == 1) {
        insertAtBeginning(head, name);
        return;
    }

    Node* newStudent = createStudent(name);
    Node* temp = head;
    int count = 1;

    do {
        if (count == position - 1) {
            break;
        }
        temp = temp->next;
        count++;
    } while (temp != head);

    if (temp->next == head && count < position - 1) {
        cout << "Position out of range. Inserted at end." << endl;
        insertAtEnd(head, name);
        delete newStudent;
        return;
    }

    newStudent->next = temp->next;
    newStudent->prev = temp;
    temp->next->prev = newStudent;
    temp->next = newStudent;
}

void deleteByName(Node*& head, string name) {
    if (head == NULL) {
        cout << "Circle is empty." << endl;
        return;
    }

    Node* temp = head;
    do {
        if (temp->name == name) {
            if (temp == head && temp->next == head) {
                delete temp;
                head = NULL;
                cout << "Student " << name << " left the circle. Circle is now empty." << endl;
                return;
            }

            if (temp == head) {
                Node* tail = head->prev;
                head = head->next;
                head->prev = tail;
                tail->next = head;
            } else {
                temp->prev->next = temp->next;
                temp->next->prev = temp->prev;
            }

            delete temp;
            cout << "Student " << name << " left the circle." << endl;
            return;
        }
        temp = temp->next;
    } while (temp != head);

    cout << "Student " << name << " was not found in the circle." << endl;
}

void display(Node* head) {
    if (head == NULL) {
        cout << "Circle is empty." << endl;
        return;
    }

    Node* temp = head;
    cout << "Circle: ";
    do {
        cout << temp->name;
        if (temp->next != head) {
            cout << " <-> ";
        }
        temp = temp->next;
    } while (temp != head);
    cout << endl;
}

int main() {

    Node* head = NULL;
    insertAtEnd(head, "Amit");
    insertAtEnd(head, "Bharat");
    insertAtEnd(head, "Chetan");
    insertAtPosition(head, 2, "Disha");

    cout << "Initial circle:" << endl;
    display(head);

    cout << "\nA student leaves the circle:" << endl;
    deleteByName(head, "Bharat");
    display(head);

    return 0;
}
