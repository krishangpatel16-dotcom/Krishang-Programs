#include<iostream>
using namespace std;

int main(){
    int arr[50];
    int n;

    cout<<"Enter size of an array:";
    cin>>n;

    cout<<"Ente numbers:";
    for(int i=0;i<n;i++){
        cin>>arr[i];
    }

    cout<<"Duplicate numbers:";

    for(int i=0;i<n;i++){
        for(int j=i+1;j<n;j++){
            if(arr[i] == arr[j]){
                cout<<arr[i]<<" ";
            }
        }
    }
    return 0;
}