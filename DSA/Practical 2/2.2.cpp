#include <iostream>
#include <string>
using namespace std;

int bubbleSort (int codes[], int size) {
    for (int i = 0; i < size - 1; i++) {
        for (int j = 0; j < size - i - 1; j++) {
            if (codes[j] > codes[j + 1]) {
                swap(codes[j], codes[j + 1]);
            }
        }
    }
    return 0;
}

int iterativeBinarySearch(int codes[], int size, int target) {
    int left = 0;
    int right = size - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (codes[mid] == target) {
            return mid + 1;
        }

        if (codes[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;

int recursiveBinarySearch(int codes[], int left, int right, int target)
{
    if(left > right){
        return -1;
    }
    else if(codes[(left + right) / 2] == target){
        return (left + right) / 2 + 1;
    }
    else if(codes[(left + right) / 2] < target){
        return recursiveBinarySearch(codes, (left + right) / 2 + 1, right, target);
    }
    else{
        return recursiveBinarySearch(codes, left, (left + right) / 2 - 1, target);
    }
}


int main() {
    int n;
    int codes[100], target;

    cout << "Enter number of book codes: ";
    cin >> n;

    cout << "Enter book codes:\n";
    for (int i = 0; i < n; i++) {
        cin >> codes[i];
    }

    bubbleSort(codes, n);

    cout<<"Sorted Array is :- \n";
    for (int i=0;i<n;i++)
    {
        cout<<codes[i]<<" ";
    }
    cout<<endl;

    cout << "Enter target book code: ";
    cin >> target;

    int iterativePosition = iterativeBinarySearch(codes, n, target);
    int recursivePosition = recursiveBinarySearch(codes, 0, n - 1, target);

    cout << "\nIterative binary search: ";
    if (iterativePosition != -1) {
        cout << "Target found at position " << iterativePosition << endl;
    } else {
        cout << "Target not found" << endl;
    }

    cout << "\nRecursive binary search: ";
    if (recursivePosition != -1) {
        cout << "Target found at position " << recursivePosition << endl;
    } else {
        cout << "Target not found" << endl;
    }

    return 0;
}

