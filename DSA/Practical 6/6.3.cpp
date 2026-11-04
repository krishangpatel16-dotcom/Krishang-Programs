#include <iostream>
#include <string>
#include <cctype>
using namespace std;

struct CharNode {
    char data;
    CharNode* next;
};

struct IntNode {
    int data;
    IntNode* next;
};

CharNode* createCharNode(char value) {
    CharNode* newNode = new CharNode;
    newNode->data = value;
    newNode->next = NULL;
    return newNode;
}

IntNode* createIntNode(int value) {
    IntNode* newNode = new IntNode;
    newNode->data = value;
    newNode->next = NULL;
    return newNode;
}

bool isCharEmpty(CharNode* top) {
    return top == NULL;
}

void pushChar(CharNode*& top, char value) {
    CharNode* newNode = createCharNode(value);
    newNode->next = top;
    top = newNode;
}

char popChar(CharNode*& top) {
    if (isCharEmpty(top)) {
        return '\0';
    }

    CharNode* temp = top;
    char value = top->data;
    top = top->next;
    delete temp;
    return value;
}

char peekChar(CharNode* top) {
    if (isCharEmpty(top)) return '\0';
    return top->data;
}

bool isIntEmpty(IntNode* top) {
    return top == NULL;
}

void pushInt(IntNode*& top, int value) {
    IntNode* newNode = createIntNode(value);
    newNode->next = top;
    top = newNode;
}

int popInt(IntNode*& top) {
    if (isIntEmpty(top)) {
        return 0;
    }

    IntNode* temp = top;
    int value = top->data;
    top = top->next;
    delete temp;
    return value;
}

int peekInt(IntNode* top) {
    if (isIntEmpty(top)) return 0;
    return top->data;
}

int precedence(char op) {
    if (op == '+' || op == '-') return 1;
    if (op == '*' || op == '/' || op == '%') return 2;
    if (op == '^') return 3;
    return 0;
}

bool isOperator(char ch) {
    return ch == '+' || ch == '-' || ch == '*' || ch == '/' || ch == '%' || ch == '^';
}

string infixToPostfix(string infix) {
    CharNode* operatorStack = NULL;
    string postfix = "";

    for (int i = 0; i < infix.length(); i++) {
        char ch = infix[i];

        if (isspace(ch)) {
            continue;
        }

        if (isdigit(ch)) {
            string number;
            while (i < infix.length() && isdigit(infix[i])) {
                number += infix[i];
                i++;
            }
            i--;
            postfix += number + " ";
        }
        else if (ch == '(') {
            pushChar(operatorStack, ch);
        }
        else if (ch == ')') {
            while (!isCharEmpty(operatorStack) && peekChar(operatorStack) != '(') {
                postfix += peekChar(operatorStack);
                postfix += " ";
                popChar(operatorStack);
            }
            if (!isCharEmpty(operatorStack)) {
                popChar(operatorStack);
            }
        }
        else if (isOperator(ch)) {
            while (!isCharEmpty(operatorStack) && peekChar(operatorStack) != '(' &&
                   precedence(peekChar(operatorStack)) >= precedence(ch)) {
                postfix += peekChar(operatorStack);
                postfix += " ";
                popChar(operatorStack);
            }
            pushChar(operatorStack, ch);
        }
    }

    while (!isCharEmpty(operatorStack)) {
        postfix += peekChar(operatorStack);
        postfix += " ";
        popChar(operatorStack);
    }

    return postfix;
}

int applyOperator(int a, int b, char op) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        case '%': return a % b;
        case '^': {
            int result = 1;
            for (int i = 0; i < b; i++) {
                result *= a;
            }
            return result;
        }
        default: return 0;
    }
}

int evaluatePostfix(string postfix) {
    IntNode* valueStack = NULL;

    for (int i = 0; i < postfix.length(); i++) {
        char ch = postfix[i];

        if (isspace(ch)) {
            continue;
        }

        if (isdigit(ch)) {
            string number;
            while (i < postfix.length() && isdigit(postfix[i])) {
                number += postfix[i];
                i++;
            }
            i--;
            pushInt(valueStack, stoi(number));
        }
        else if (isOperator(ch)) {
            int b = popInt(valueStack);
            int a = popInt(valueStack);
            int result = applyOperator(a, b, ch);
            pushInt(valueStack, result);
        }
    }

    return peekInt(valueStack);
}

int main() {
    string infix;
    cout << "Enter infix expression: ";
    getline(cin, infix);

    string postfix = infixToPostfix(infix);
    cout << "Postfix expression: " << postfix << endl;
    cout << "Result: " << evaluatePostfix(postfix) << endl;

    return 0;
}
