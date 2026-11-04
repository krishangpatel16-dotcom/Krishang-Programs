#include<iostream>
using namespace std;
int main()
{
    int n;
    cin>>n;
    int h;
    cin>>h;

    int arr[n];
    cout<<"enter your item";
    for(int i=0;i<n;i++){
        cin>>arr[i];
    }

    for(int r=0;r<h;r++){
        int temp=arr[0];
        for(int j=0;j<n;j++){
            arr[j]=arr[j+1];
        }
        arr[n-1]= temp;
    }

    for(int k=0;k<n;k++){
        cout<<arr[k]<<" ";
    }
    return 0;
}
