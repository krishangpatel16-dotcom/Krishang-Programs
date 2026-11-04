#include<iostream>
#include<fstream>
#include<string>
using namespace std;

int main()
{

    int choice;
    int Maxpercentage=0;
    do
    {
        cout<<"\nStudent Management System\n"<<endl;
        cout<<"1. Create Student Record\n2. View Student Records\n3. Topper\n4. Exit\n"<<endl;
        cout<<"Enter your choice: ";
        cin>>choice;
        switch(choice)
        {
            case 1:
                ofstream file("student.txt", ios::app);
                string name;
                int m1,m2,m3;
                int temp;
                cout<<"Enter the number of students you want to add: ";
                cin>>temp;
                for (int i = 0; i < temp; i++)
                {
                    cout<<"Enter Student Name :";
                    cin>>name;
                    cout<<"Enter marks for three subjects: ";
                    cin>>m1>>m2>>m3;
                    file<<name<<" "<<m1<<" "<<m2<<" "<<m3<<endl;
                }
                file.close();
                break;
            case 2:
                ifstream file("student.txt");
                //string name;
                //int m1,m2,m3;
                cout<<"Student Records:"<<endl;
                while(file>>name>>m1>>m2>>m3)
                {
                    float percentage;
                    percentage=(m1+m2+m3)/3.0;
                    if (percentage>Maxpercentage)
                    {
                        Maxpercentage=percentage;
                    }
                    cout<<"Name: "<<name<<", Marks: "<<m1<<", "<<m2<<", "<<m3<<" Percentage: "<<percentage<<endl;
                }
                file.close();
                break;
            case 3:
                ifstream file("student.txt");
                while(file>>name>>m1>>m2>>m3)
                {
                    float percentage;
                    percentage=(m1+m2+m3)/3.0;
                    if (percentage==Maxpercentage)
                    {
                        cout<<"Topper: "<<name<<" with percentage "<<percentage<<endl;
                    }
                }
                file.close();
                break;
            case 4:
                cout<<"Exiting the system. Goodbye!"<<endl;
                break;
            default:
                cout<<"Invalid choice. Please try again."<<endl;
        }
    } while(choice != 4);
    return 0;
}

