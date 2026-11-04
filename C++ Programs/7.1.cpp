#include<iostream>
using namespace std;

void add()
{
    int a,b;
    cout<<"Enter two numbers : ";
    cin>>a>>b;
    cout<<"Sum is : "<<a+b<<endl;
}

void add(int a, int b)
{
    cout<<"Sum is : "<<a+b<<endl;
}

void add(float a, float b)
{
    cout<<"Sum is : "<<a+b<<endl;
}

void add(float a, int b)
{
    cout<<"Sum is : "<<a+b<<endl;
}

void add(int a, float b)
{
    cout<<"Sum is : "<<a+b<<endl;
}

int main()
{
    add();
    add(5,10);
    add(5.5f, 10.5f);
    add(5.5f, 10);
    add(5, 10.5f);
    
    return 0;
}