#include<iostream>
using namespace std;

int total(int a[],int n);
int main()
{
    int n;
    cout<<"Enter the how many numbers you have"<<endl;
    cin>>n;
    int a[n];
    for (int i=0;i<n;i++)
    {
        int j;
        cout<<"Enter the number"<<endl;
        cin>>j;
        a[i]=j;
    }
    int sum1;
    sum1=total(a,n);
    cout<<"Sum of an array is : "<<sum1<<endl;
    cout<<"Hello World";
}

int total(int a[],int n)
{
    int sum;
    sum+=total(a,n-1);
    if (n==0)
        return a[n];
    
}
