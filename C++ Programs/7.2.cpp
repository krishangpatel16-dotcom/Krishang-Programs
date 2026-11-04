#include<iostream>
using namespace std;

class Complex
{
    private:
        float real;
        float imag;
    public:
        Complex(float r, float i) 
        { real=r; imag=i; }
        
        Complex operator+(const Complex& other) {
            
            return Complex(real + other.real, imag + other.imag);
        }
        
        void display() {
            cout << real << " + " << imag << "i" << endl;
        }
}