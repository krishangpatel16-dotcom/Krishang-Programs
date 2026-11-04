#include <iostream>
using namespace std;

struct Node {
    string page;
    Node* next;
};

Node* createNode(string page) {
    Node* newNode = new Node;
    newNode->page = page;
    newNode->next = NULL;
    return newNode;
}

bool isEmpty(Node* top) {
    return top == NULL;
}

void push(Node*& top, string page) {
    Node* newNode = createNode(page);
    newNode->next = top;
    top = newNode;
}

void pop(Node*& top) {
    if (isEmpty(top)) {
        cout << "Back cannot be performed. No previous page in history." << endl;
        return;
    }

    Node* temp = top;
    top = top->next;
    delete temp;
}

string peek(Node* top) {
    if (isEmpty(top)) {
        return "No page";
    }
    return top->page;
}

void visitPage(Node*& top, string page) {
    push(top, page);
    cout << "Visited: " << page << endl;
    cout << "Current page: " << peek(top) << endl;
}

void goBack(Node*& top) {
    if (isEmpty(top)) {
        cout << "Back cannot be performed. No history left." << endl;
        return;
    }

    Node* temp = top;
    top = top->next;
    delete temp;

    if (isEmpty(top)) {
        cout << "Current page: No page" << endl;
    } else {
        cout << "Current page: " << peek(top) << endl;
    }
}

void displayHistory(Node* top) {
    if (isEmpty(top)) {
        cout << "History: Empty" << endl;
        return;
    }

    cout << "History: ";
    Node* temp = top;
    while (temp != NULL) {
        cout << temp->page;
        if (temp->next != NULL) {
            cout << " <- ";
        }
        temp = temp->next;
    }
    cout << endl;
}

int main() {
    Node* top = NULL;

    visitPage(top, "Home");
    displayHistory(top);

    visitPage(top, "About");
    displayHistory(top);

    visitPage(top, "Contact");
    displayHistory(top);

    goBack(top);
    displayHistory(top);

    goBack(top);
    displayHistory(top);

    goBack(top);
    displayHistory(top);

    visitPage(top, "Login");
    displayHistory(top);

    return 0;
}
