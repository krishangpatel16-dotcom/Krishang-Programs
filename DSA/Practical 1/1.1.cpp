#include<iostream>
using namespace std;

int main(){
    int n,d;

    cout<<"Enter the size of array:";
    cin>>n;

    int arr[n];

    cout<<"Enter array of element:";
    for(int i=0;i<n;i++){
        cin>>arr[i];
    }

    cout<<"Enter no of left rotation:";
    cin>>d;

    d = d % n;

    for(int j=0;j<d;j++){
        int first = arr[0];

        for(int i=0;i<n-1;i++){
            arr[i]=arr[i+1];

        }
        arr[n-1] = first;
    }

    cout<<"Array after left rotation:";
    for(int i=0;i<n;i++){
            cout<<arr[i]<<" ";
    }
    return 0;
}
