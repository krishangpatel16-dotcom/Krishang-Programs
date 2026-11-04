#include <iostream>
#include <queue>
using namespace std;

struct Node {
    string name;
    Node* left;
    Node* right;
};

Node* createNode(string value) {
    Node* newNode = new Node;
    newNode->name = value;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}

void preorder(Node* root) {
    if (root == NULL) return;
    cout << root->name << " ";
    preorder(root->left);
    preorder(root->right);
}

void inorder(Node* root) {
    if (root == NULL) return;
    inorder(root->left);
    cout << root->name << " ";
    inorder(root->right);
}

void postorder(Node* root) {
    if (root == NULL) return;
    postorder(root->left);
    postorder(root->right);
    cout << root->name << " ";
}

void levelOrder(Node* root) {
    if (root == NULL) {
        cout << "Tree is empty." << endl;
        return;
    }

    queue<Node*> q;
    q.push(root);

    while (!q.empty()) {
        Node* temp = q.front();
        q.pop();
        cout << temp->name << " ";

        if (temp->left != NULL) q.push(temp->left);
        if (temp->right != NULL) q.push(temp->right);
    }
}

void printLevelByLevel(Node* root) {
    if (root == NULL) {
        cout << "Tree is empty." << endl;
        return;
    }

    queue<Node*> q;
    q.push(root);

    while (!q.empty()) {
        int levelSize = q.size();
        for (int i = 0; i < levelSize; i++) {
            Node* temp = q.front();
            q.pop();
            cout << temp->name << " ";

            if (temp->left != NULL) q.push(temp->left);
            if (temp->right != NULL) q.push(temp->right);
        }
        cout << endl;
    }
}

int main() {
    Node* root = createNode("CEO");
    root->left = createNode("Managers");
    root->right = createNode("Employees");

    root->left->left = createNode("HR");
    root->left->right = createNode("Finance");

    root->left->left->left = createNode("HR Manager");
    root->left->left->right = createNode("Recruitment");

    root->left->right->left = createNode("Accountant");
    root->left->right->right = createNode("Payroll");

    root->right->left = createNode("Team Lead");
    root->right->right = createNode("Support");

    cout << "Preorder traversal: ";
    preorder(root);
    cout << endl;

    cout << "Inorder traversal: ";
    inorder(root);
    cout << endl;

    cout << "Postorder traversal: ";
    postorder(root);
    cout << endl;

    cout << "Level-order traversal: ";
    levelOrder(root);
    cout << endl;

    cout << "Level-by-level print: " << endl;
    printLevelByLevel(root);

    return 0;
}
