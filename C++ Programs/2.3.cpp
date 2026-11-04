#include<iostream>
using namespace std;

class Bank
{
private:
    

public:
    int userID;
    string userName;
    float balance;
    Bank(int ID,string nm)            //Default Constructor
    {
        userID=ID;
        userName=nm;
        balance=0;
    }
    Bank(int ID,string nm, float bal)     //Parameter Passed Constructor
    {
        userID=ID;
        userName=nm;
        balance=bal;
    }
    void deposit(double amount)
    {
        if (amount>0)
        {
            balance+=amount;
            cout<<"Money Deposited Successfully !"<<endl;
        }
    }
    void withdraw(double amount)
    {
        if (amount<balance)
        {
            balance-=amount;
            cout<<"Money Withdrawed Successfully !"<<endl;
        }
    }
    void display()
    {
        cout<<endl;
        cout<<"--------------User Details----------------"<<endl;
        cout<<"UserID : "<<userID<<endl;
        cout<<"UserName : "<<userName<<endl;
        cout<<"Available Balance : "<<balance<<endl;
    }
};

struct Client{
    struct user;
};

struct user{
    int ID;
    
};
int main()
{
    int user[10][3];
    for (int i=0;i<10;i++)
    {
        Bank u1(101,"Virat Kohli",12000);
        u1.display();
        u1.deposit(3000);
        user[i][0]=u1.userID;
        user[i][1]=u1.balance;
    }
    cout<<endl;
    return 0;
}
