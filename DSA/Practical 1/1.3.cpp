#include <iostream>
#include <string>
using namespace std;

int main()
{
    string str, word = "", longest = "";

    cout << "Enter a sentence: ";
    getline(cin, str);

    str = str + " ";   

    for (int i = 0; i < str.length(); i++)
    {
        if (str[i] != ' '){
            word = word + str[i];
        }
        else{
            if (word.length() > longest.length()){
                longest = word;
            }
            word = "";
        }
    }

    cout << "Longest word:" << longest << endl;
    cout << "Number of characters:" << longest.length();

    return 0;
}