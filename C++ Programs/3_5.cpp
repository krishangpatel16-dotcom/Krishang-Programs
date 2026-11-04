#include<iostream>
#include<string>
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
    if (n>9)
    {
        n=sum;
        goto start;
    }
}

int main()
{
    int no;
    int k;
    cout << "Enter the number :";
    cin>>no;
    cout << "Enter he K :";
    cin >> k;
    cout <<superdigit(no)<<endl;
    string temp=to_string(no);
    string original=temp;
    for (int i=0;i<k-1;i++)
        temp+=original;
    cout << temp;
    long long new_no=stoi(temp);
    cout<<"\n"<<superdigit(new_no);


}
