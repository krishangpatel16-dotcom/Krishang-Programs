#include <iostream>
#include <string>
using namespace std;

struct Node {
    string song;
    Node* prev;
    Node* next;
};

Node* createNode(string s) {
    Node* newNode = new Node;
    newNode->song = s;
    newNode->prev = NULL;
    newNode->next = NULL;
    return newNode;
}

void insertAtBeginning(Node*& head, Node*& tail, string song) {
    Node* newNode = createNode(song);

    if (head == NULL) {
        head = newNode;
        tail = newNode;
        return;
    }

    newNode->next = head;
    head->prev = newNode;
    head = newNode;
}

void insertAtEnd(Node*& head, Node*& tail, string song) {
    Node* newNode = createNode(song);

    if (head == NULL) {
        head = newNode;
        tail = newNode;
        return;
    }

    tail->next = newNode;
    newNode->prev = tail;
    tail = newNode;
}

void insertAfterSong(Node*& head, Node*& tail, string targetSong, string newSong) {
    Node* temp = head;

    while (temp != NULL && temp->song != targetSong) {
        temp = temp->next;
    }

    if (temp == NULL) {
        cout << "Song '" << targetSong << "' not found in the playlist." << endl;
        return;
    }

    Node* newNode = createNode(newSong);

    newNode->next = temp->next;
    newNode->prev = temp;

    if (temp->next != NULL) {
        temp->next->prev = newNode;
    } else {
        tail = newNode;
    }

    temp->next = newNode;
    cout << "Inserted '" << newSong << "' after '" << targetSong << "'." << endl;
}

void deleteFront(Node*& head, Node*& tail) {
    if (head == NULL) {
        cout << "Playlist is empty. Nothing to remove." << endl;
        return;
    }

    Node* temp = head;
    cout << "Removed song: " << head->song << endl;

    if (head == tail) {
        head = NULL;
        tail = NULL;
    } else {
        head = head->next;
        head->prev = NULL;
    }
    delete temp;
}

int countSongs(Node* head) {
    int count = 0;
    Node* temp = head;
    while (temp != NULL) {
        count++;
        temp = temp->next;
    }
    return count;
}

void displayForward(Node* head) {
    if (head == NULL) {
        cout << "Playlist is empty." << endl;
        return;
    }

    Node* temp = head;
    cout << "Playlist (front to back): ";
    while (temp != NULL) {
        cout << temp->song;
        if (temp->next != NULL) {
            cout << " -> ";
        }
        temp = temp->next;
    }
    cout << endl;
}

void displayBackward(Node* tail) {
    if (tail == NULL) {
        cout << "Playlist is empty." << endl;
        return;
    }

    Node* temp = tail;
    cout << "Playlist (back to front): ";
    while (temp != NULL) {
        cout << temp->song;
        if (temp->prev != NULL) {
            cout << " <- ";
        }
        temp = temp->prev;
    }
    cout << endl;
}

int main() {
    Node* head = NULL;
    Node* tail = NULL;

    cout << "Problem 1: Music Playlist Using Doubly Linked List" << endl;
    cout << "--------------------------------------------------" << endl;

    insertAtEnd(head, tail, "Song A");
    insertAtBeginning(head, tail, "Song B");
    insertAfterSong(head, tail, "Song B", "Song C");
    insertAtEnd(head, tail, "Song D");

    cout << "Current song count: " << countSongs(head) << endl;
    displayForward(head);
    displayBackward(tail);

    cout << "\nRemoving the first song from the playlist" << endl;
    deleteFront(head, tail);
    cout << "Current song count: " << countSongs(head) << endl;
    displayForward(head);

    cout << "\nTrying to insert after a missing song" << endl;
    insertAfterSong(head, tail, "Song Z", "Song E");
    displayForward(head);

    return 0;
}
