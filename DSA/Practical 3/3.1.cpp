#include <iostream>
using namespace std;

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        cout << arr[i] << (i == n - 1 ? '\n' : ' ');
    }
}

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}

void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        swap(arr[i], arr[minIndex]);
    }
}

void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

int main() {
    int marks[] = {34, 12, 45, 9, 23, 56};
    int n = 6;

    int bubbleMarks[6];
    int selectionMarks[6];
    int insertionMarks[6];

    for (int i = 0; i < n; i++) {
        bubbleMarks[i] = marks[i];
        selectionMarks[i] = marks[i];
        insertionMarks[i] = marks[i];
    }

    bubbleSort(bubbleMarks, n);
    selectionSort(selectionMarks, n);
    insertionSort(insertionMarks, n);

    cout << "Original marks: ";
    printArray(marks, n);

    cout << "Bubble Sort: ";
    printArray(bubbleMarks, n);

    cout << "Selection Sort: ";
    printArray(selectionMarks, n);

    cout << "Insertion Sort: ";
    printArray(insertionMarks, n);

    return 0;
}
