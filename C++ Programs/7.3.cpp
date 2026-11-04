#include<iostream>
#include<queue>
using namespace std;

class Fahrenheit;
class Celsius
{
    private:
        float temp;
    public:
        Celsius(float t=0) { temp = t; }

        operator Fahrenheit();

        void display() {
            cout <<" "<< temp << " C";
        }
        bool operator ==(Celsius& s) {
            return temp == s.temp;
        }
};

class Fahrenheit
{
    private:
        float temp;
    public:
        Fahrenheit(float t=0) { temp = t; }

        operator Celsius()
        {
            return Celsius((temp - 32) * 5 / 9);
        };

        void display() {
            cout <<"  "<<temp << " F" ;
        }

        bool operator ==(Fahrenheit& f) {
            return temp == f.temp;
        }
};

Celsius::operator Fahrenheit() {
    return Fahrenheit(temp * 9 / 5 + 32);
}

int main() {
    Celsius c(20);
    Fahrenheit f = c;

    cout << "Celsius: ";
    c.display();

    cout << "Fahrenheit: ";
    f.display();

    Celsius c1(30);
    Celsius c2(30);

    if (c1 == c2) {
        cout << "Celsius temperatures are equal." << endl;
    } else {
        cout << "Celsius temperatures are not equal." << endl;
    }

    Fahrenheit f1(77);
    Fahrenheit f2(86);

    if (f1 == f2) {
        cout << "Fahrenheit temperatures are equal." << endl;
    } else {
        cout << "Fahrenheit temperatures are not equal." << endl;
    }
    cout << "\n-----------------------------\n" << endl;
    cout << "Queue of Celsius objects:" << endl;
    queue<Celsius> celsiusQueue;
    celsiusQueue.push(Celsius(25));
    celsiusQueue.push(Celsius(35));
    celsiusQueue.push(Celsius(45));
    celsiusQueue.push(Celsius(55));
    while(!celsiusQueue.empty())
    {
        Celsius temp = celsiusQueue.front();
        temp.display();
        Fahrenheit temp_fahrenheit = temp;
        temp_fahrenheit.display();
        cout << endl;
        celsiusQueue.pop();
    }
    cout << "\n-----------------------------\n" << endl;
    cout << "Array of Celsius objects:" << endl;
    Celsius d[5]={Celsius(10), Celsius(20), Celsius(30), Celsius(40), Celsius(50)};
    for (int i = 0; i < 5; i++) {
        d[i].display();
        Fahrenheit temp_fahrenheit = d[i];
        temp_fahrenheit.display();
        cout << endl;
    }
    return 0;
}
