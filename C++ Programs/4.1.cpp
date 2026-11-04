#include <iostream>

void resize(int*& arr, int& size, int newSize, int skipIdx = -1) {
    if (newSize <= 0) {
        delete[] arr; arr = nullptr; size = 0; return;
    }
    int* temp = new int[newSize];
    for (int i = 0, j = 0; i < size; i++) {
        if (i != skipIdx) temp[j++] = arr[i];
    }
    delete[] arr;
    arr = temp;
    size = newSize;
}

int main() {
    int *arr = nullptr, size = 0;

    // 1. Insert
    int val = 10;
    resize(arr, size, size + 1);
    arr[size - 1] = val; // Add to end

    // 2. Delete (index 0)
    if (size > 0) resize(arr, size, size - 1, 0);

    // 3. Display
    for (int i = 0; i < size; i++) std::cout << arr[i] << " ";

    delete[] arr; // Cleanup
    return 0;
}
