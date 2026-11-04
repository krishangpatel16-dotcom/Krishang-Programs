#include <iostream>
#include <string>
#include <cctype>
using namespace std;


string toLowerCase(string str) {
    string result;
    for (char ch : str) {
        result += tolower(ch);
    }
    return result;
}

int main() {
    string input;
    cout << "Enter a paragraph: ";
    getline(cin, input);

    string words[100];
    int frequency[100];
    int wordCount = 0;

    string temp="";
    for (int i = 0; i < input.length(); i++)
    {
      if (input[i] == ' ' || input[i] == '\0')
      {
        if (temp!= "")
        {
            temp = toLowerCase(temp);
            int found = -1;
            for (int j = 0; j < wordCount; j++)
            {
                if (words[j] == temp)
                {
                    found = j;
                    break;
                }
            }
            if (found!=-1)
            {
                frequency[found]++;
            }
            else
            {
                words[wordCount] = temp;
                frequency[wordCount] = 1;
                wordCount++;
            }
            temp = "";
        }
      }
      else
      {
        temp += input[i];
      }
    }

    //Display the frequency of each word
    cout << "Word Frequency:" << endl;
    for (int i = 0; i < wordCount; i++)
    {
        cout << words[i] << ": " << frequency[i] << endl;
    }


    return 0;
}
