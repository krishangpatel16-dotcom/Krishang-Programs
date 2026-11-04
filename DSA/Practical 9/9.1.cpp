#include <iostream>
using namespace std;

const int MAX = 20;

struct Node {
    int data;
    Node* next;
};

struct Queue {
    int arr[MAX];
    int front;
    int rear;
};

Node* createNode(int value) {
    Node* newNode = new Node;
    newNode->data = value;
    newNode->next = NULL;
    return newNode;
}

void insertEdge(Node* adj[], int u, int v) {
    Node* newNode = createNode(v);
    newNode->next = adj[u];
    adj[u] = newNode;

    Node* newNode2 = createNode(u);
    newNode2->next = adj[v];
    adj[v] = newNode2;
}

bool isEmptyQueue(Queue q) {
    return q.front == -1;
}

void initQueue(Queue& q) {
    q.front = -1;
    q.rear = -1;
}

bool isFullQueue(Queue q) {
    return q.rear == MAX - 1;
}

void enqueue(Queue& q, int value) {
    if (isFullQueue(q)) {
        cout << "Queue is full." << endl;
        return;
    }

    if (isEmptyQueue(q)) {
        q.front = 0;
    }

    q.rear++;
    q.arr[q.rear] = value;
}

int dequeue(Queue& q) {
    if (isEmptyQueue(q)) {
        return -1;
    }

    int value = q.arr[q.front];

    if (q.front == q.rear) {
        q.front = -1;
        q.rear = -1;
    } else {
        q.front++;
    }

    return value;
}

void DFS(Node* adj[], bool visited[], int start) {
    visited[start] = true;
    cout << start << " ";

    Node* temp = adj[start];
    while (temp != NULL) {
        if (!visited[temp->data]) {
            DFS(adj, visited, temp->data);
        }
        temp = temp->next;
    }
}

void BFS(Node* adj[], bool visited[], int start) {
    Queue q;
    initQueue(q);
    enqueue(q, start);
    visited[start] = true;

    while (!isEmptyQueue(q)) {
        int current = dequeue(q);
        cout << current << " ";

        Node* temp = adj[current];
        while (temp != NULL) {
            if (!visited[temp->data]) {
                visited[temp->data] = true;
                enqueue(q, temp->data);
            }
            temp = temp->next;
        }
    }
}

void printGraph(Node* adj[], int n) {
    for (int i = 0; i < n; i++) {
        cout << "Building " << i << " -> ";
        Node* temp = adj[i];
        while (temp != NULL) {
            cout << temp->data << " ";
            temp = temp->next;
        }
        cout << endl;
    }
}

int main() {
    Node* adj[MAX] = {NULL};
    bool visited[MAX] = {false};

    int n = 8;

    insertEdge(adj, 0, 1);
    insertEdge(adj, 0, 2);
    insertEdge(adj, 1, 3);
    insertEdge(adj, 1, 4);
    insertEdge(adj, 2, 5);
    insertEdge(adj, 2, 6);
    insertEdge(adj, 3, 7);
    insertEdge(adj, 4, 7);
    insertEdge(adj, 5, 6);

    cout << "Graph representation:" << endl;
    printGraph(adj, n);

    cout << "\nDFS order from building 0: ";
    for (int i = 0; i < n; i++) visited[i] = false;
    DFS(adj, visited, 0);
    cout << endl;

    cout << "\nBFS order from building 0: ";
    for (int i = 0; i < n; i++) visited[i] = false;
    BFS(adj, visited, 0);
    cout << endl;

    return 0;
}
