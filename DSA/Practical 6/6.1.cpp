#include<iostream>
using namespace std;

const int MAX = 5;

struct Stack {
    int arr[MAX];
    int top;
};

bool isFull(Stack s) {
    return s.top == MAX - 1;
}

bool isEmpty(Stack s) {
    return s.top == -1;
}

void push(Stack &s, int value) {
    if (isFull(s)) {
        cout << "Stack is Full. Overflow " << value << "." << endl;
        return;
    }

    s.top++;
    s.arr[s.top] = value;
}

void pop(Stack &s) {
    if (isEmpty(s)) {
        cout << "Stack is Empty. Underflow." << endl;
        return;
    }

    cout << "Tray " << s.arr[s.top] << " removed from top." << endl;
    s.top--;
}

void Peek(Stack s) {
    if (isEmpty(s)) {
        cout << "Current top tray: None (stack is empty)." << endl;
        return;
    }

    cout << "Current top tray: " << s.arr[s.top] << endl;
}

void displayStack(Stack s) {
    if (isEmpty(s)) {
        cout << "Stack: Empty" << endl;
        return;
    }

    cout << "Stack: ";
    for (int i = s.top; i >= 0; i--) {
        cout << s.arr[i];
        if (i > 0) cout << " -> ";
    }
    cout << endl;
}

int main() {
    Stack s;
    s.top = -1;

    push(s, 10);
    push(s, 20);
    push(s, 30);
    Peek(s);
    displayStack(s);

    pop(s);
    Peek(s);
    displayStack(s);

    push(s, 40);
    push(s, 50);
    push(s, 60);
    Peek(s);

    pop(s);
    pop(s);
    pop(s);
    pop(s);
    pop(s);
    Peek(s);

    return 0;
}
