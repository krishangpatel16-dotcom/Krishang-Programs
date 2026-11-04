#include <iostream>
using namespace std;


class Shape {
    public:
        int radius;
        Shape(int r) { radius = r; }
        void display() 
        {
            cout << "Drawing a shape with radius " << radius << "." << endl;
        }
};

class Circle : public Shape {
    public:
        Circle(int r) { Shape(r); }
        float area() 
        {
            return (3.14 * radius * radius);
        }
        void display() 
        {
            cout << "Drawing a circle with radius " << radius << "." << endl;
        }
};

int main() 
{
    Circle c(5);
    for(int i = 0; i < 3; i++) {
        c.display();
        cout << "Area of the circle: " << c.area() << endl; 
    }
    
    return 0;
}