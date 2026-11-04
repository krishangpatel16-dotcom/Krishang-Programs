#include <iostream>
#include<fstream>
#include<string>
using namespace std;

int main() {
    string line;
    int charCount=0, wordCount=0, lineCount=0;
    ifstream myfile("1.txt");
    if (myfile.is_open()) {
        while (getline(myfile, line))
        {
            lineCount++;
            for(int i=0; i<line.length();i++)
            {
                if (line[i-1]!=' ' && line[i]==' '){
                    wordCount++;
                }
            }
            int lenLine=line.length();
            charCount+=lenLine+1;
        }
        cout<<"Line count is : "<<lineCount<<endl;
        cout<<"Character count is : "<<charCount-1<<endl;
        cout<<"Word count is : "<<wordCount+lineCount<<endl;
        myfile.close();
    }
    else {
        cout << "Unable to open file";
    }
    return 0;
}
