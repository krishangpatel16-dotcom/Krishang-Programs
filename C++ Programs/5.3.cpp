#include <iostream>
#include<fstream>
#include<string>
using namespace std;

string toLowerCase(string str) {
    string result;
    for (char ch : str) {
        result += tolower(ch);
    }
    return result;
}

int main() 
{
    do
    {
        cout<<"\nInventory Management System\n"<<endl;
        cout<<"1. Add Item\n2. View all Items\n3. Search Item by name\n4. Exit\n"<<endl;
        int choice;
        cout<<"Enter your choice: ";
        cin>>choice;
        switch(choice)
        {
            case 1:
                cout<<"Add Item functionality goes here."<<endl;
                ofstream file("1.txt", ios::app);
                string name;
                int quantity;
                float price;
                cout<<"Enter Item Name :";
                cin>>name;
                cout<<"Enter quantity :";
                cin>>quantity;
                cout<<"Enter price :";
                cin>>price;
                file<<name<<" "<<quantity<<" "<<price<<endl;
                file.close()
                cout<<"Item added successfully"<<endl;
                break;
            case 2:
                ifstream file("1.txt");
                cout<<"Name Quantity Price"<<endl;
                while(getline(file,line))
                {
                    cout<<line;
                }
                file.close()
                break;
            case 3:
                cout<<"Enter the name you want ot search : "<<endl;
                string searchName;
                cin>>searchName;
                ifstream file("1.txt");
                bool found=false;
                string name;
                int quantity;
                float price;
                while(file>>name>>quantity>>price)
                {
                    if(tolower(name).find(tolower(searchName)) != string::npos)
                    {
                        cout<<name<<" "<<quantity<<" "<<price<<endl;
                        found=true;
                    }
                }
                if(!found)
                {
                    cout<<"Item not found."<<endl;
                }
                file.close();
                break;
            case 4:
                cout<<"E
                xiting the program. Goodbye!"<<endl;
                break;
            default:
                cout<<"Invalid choice. Please try again."<<endl;
        }

    } while (choice!=4);
    

    return 0;
}