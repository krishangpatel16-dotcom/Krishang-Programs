#include<iostream>
using namespace std;

class Student
{
private:
    int rollno;
    string name;
    float sub1,sub2,sub3;

public:
    double avg;
    Student()            //Default Constructor
    {
        rollno=18;
        name="Virat Kohli";
        sub1=69;
        sub2=69;
        sub3=69;
    }
    Student(int rn,string nm,float m1,float m2,float m3)     //Parameter Passed Constructor
    {
        rollno=rn;
        name=nm;
        sub1=m1;
        sub2=m2;
        sub3=m3;
    }
    void average()
    {
        avg=(sub1+sub2+sub3)/3;
        cout<<"The average Marks is "<<avg<<endl;
    }
    void display()
    {
        cout<<endl;
        cout<<"--------------Student Details----------------"<<endl;
        cout<<"RollNo : "<<rollno<<endl;
        cout<<"Name : "<<name<<endl;
        cout<<"Marks of Subject1 : "<<sub1<<endl;
        cout<<"Marks of Subject2 : "<<sub2<<endl;
        cout<<"Marks of Subject3 : "<<sub3<<endl;
    }
    void input()
    {
        cout<<"Enter the rollno of the student :";
        cin>>rollno;
        cout<<"Enter the name of the student :";
        cin>>name;
        cout<<"Enter the marks of Subject1 :";
        cin>>sub1;
        cout<<"Enter the marks of Subject2 :";
        cin>>sub2;
        cout<<"Enter the marks of Subject3 :";
        cin>>sub3;
    }
};

int main()
{
    Student s1,s2;
    Student s3(57,"Krishang Patel",34,65,43);
    s1.display();
    s1.average();
    cout<<endl;
    s3.display();
    s3.average();
    cout<<endl;
    s2.input();
    s2.display();
    s2.average();
    cout<<endl;
    double average[3]={s1.avg,s2.avg,s3.avg};
    double highest=0;
    for (int i=0;i<3;i++)
    {
        if (highest<average[i])
            highest=average[i];
    }
    cout<<"The highest average is "<<highest;
    return 0;
}
