#include <iostream>
using namespace std;

template <typename T>
void displayArray(T arr[], int size)
{
    for (int i = 0; i < size; i++)
    {
        cout << arr[i] << " ";
    }
    cout << endl;
}

template <typename T>
T findMaximum(T arr[], int size)
{
    T max = arr[0];

    for (int i = 1; i < size; i++)
    {
        if (arr[i] > max)
            max = arr[i];
    }

    return max;
}

template <typename T>
void reverseArray(T arr[], int size)
{
    for (int i = 0; i < size / 2; i++)
    {
        T temp = arr[i];
        arr[i] = arr[size - 1 - i];
        arr[size - 1 - i] = temp;
    }
}

template <typename T>
void findLeaders(T arr[], int size)
{
    T maxFromRight = arr[size - 1];

    cout << "Leader elements: ";
    cout << maxFromRight << " ";

    for (int i = size - 2; i >= 0; i--)
    {
        if (arr[i] > maxFromRight)
        {
            maxFromRight = arr[i];
            cout << maxFromRight << " ";
        }
    }

    cout << endl;
}

int main()
{
    int intArr[] = {16, 17, 4, 3, 5, 2};
    float floatArr[] = {1.5, 3.2, 2.8, 5.1, 4.9};
    char charArr[] = {'a', 'x', 'c', 'z', 'b'};

    int intSize = 6;
    int floatSize = 5;
    int charSize = 5;

    cout << "Integer Array:\n";
    displayArray(intArr, intSize);
    cout << "Maximum: " << findMaximum(intArr, intSize) << endl;
    findLeaders(intArr, intSize);
    reverseArray(intArr, intSize);
    cout << "Reversed: ";
    displayArray(intArr, intSize);

    cout << "\nFloat Array:\n";
    displayArray(floatArr, floatSize);
    cout << "Maximum: " << findMaximum(floatArr, floatSize) << endl;
    findLeaders(floatArr, floatSize);
    reverseArray(floatArr, floatSize);
    cout << "Reversed: ";
    displayArray(floatArr, floatSize);

    cout << "\nCharacter Array:\n";
    displayArray(charArr, charSize);
    cout << "Maximum: " << findMaximum(charArr, charSize) << endl;
    findLeaders(charArr, charSize);
    reverseArray(charArr, charSize);
    cout << "Reversed: ";
    displayArray(charArr, charSize);

    return 0;
}
