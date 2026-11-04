#include <iostream>
using namespace std;

struct Node {
    int code;
    Node* left;
    Node* right;
};

Node* createNode(int value) {
    Node* newNode = new Node;
    newNode->code = value;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}

Node* insertBST(Node* root, int value) {
    if (root == NULL) {
        return createNode(value);
    }

    if (value < root->code) {
        root->left = insertBST(root->left, value);
    } else if (value > root->code) {
        root->right = insertBST(root->right, value);
    }

    return root;
}

void inorder(Node* root) {
    if (root == NULL) return;
    inorder(root->left);
    cout << root->code << " ";
    inorder(root->right);
}

void preorder(Node* root) {
    if (root == NULL) return;
    cout << root->code << " ";
    preorder(root->left);
    preorder(root->right);
}

void postorder(Node* root) {
    if (root == NULL) return;
    postorder(root->left);
    postorder(root->right);
    cout << root->code << " ";
}

int main() {
    Node* root = NULL;

    int codes[] = {120, 80, 150, 60, 90, 130, 170, 50, 70, 100, 140, 160, 180};
    int n = sizeof(codes) / sizeof(codes[0]);

    for (int i = 0; i < n; i++) {
        root = insertBST(root, codes[i]);
    }

    cout << "Inorder traversal: ";
    inorder(root);
    cout << endl;

    cout << "Preorder traversal: ";
    preorder(root);
    cout << endl;

    cout << "Postorder traversal: ";
    postorder(root);
    cout << endl;

    return 0;
}
