#include<iostream>
#include <string>
using namespace std;

int superdigit(int n)
{
    start:
    int sum=0;
    if (n<=9)
        return n;
    else
    {
        if (n!=0)
        {
            sum=sum+n%10+superdigit(n/10);
        }
    }
    if (sum>9)
    {
        n=sum;
        goto start;
    }
}

int main()
{
    int no;
    int n;
    cin>>no;
    cin>>n;
    string temp;
    cout <<superdigit(no);
    temp=to_string(no);
    for (int i=0;i<n;i++)
    {
        temp+=temp;
    }
}
