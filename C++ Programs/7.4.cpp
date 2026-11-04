#include<iostream>
using namespace std;

class Shape {
public:
    virtual void area() = 0; // Pure virtual function
};

class Rectangle : public Shape {
    float length, width;
public:
    Rectangle(float l, float w) : length(l), width(w) {
    }
    void area() {
        cout << "Area of Rectangle is : " << length * width << endl;
    }
};

class Circle : public Shape {
    float radius;
public:
    Circle(float r) : radius(r) {
    }
    void area() {
        cout << "Area of Circle is : " << 3.14 * radius * radius << endl;
    }
};

int main()
{
    Shape *obj[6];
    obj[0] = new Rectangle(4, 5);
    obj[1] = new Circle(3);
    obj[2] = new Rectangle(6, 7);
    obj[3] = new Circle(4);
    obj[4] = new Rectangle(8, 9);
    obj[5] = new Circle(5);
    for (int i=0; i<6; i++)
    {
        obj[i]->area();
        delete obj[i]; // Clean up memory
    }
    Rectangle r1(10, 11);
    Circle c1(6);
    Circle c2(12);
    Shape *staticObj[3] = {&r1,&c1,&c2};
    for (int i=0; i<3; i++)
    {
        staticObj[i]->area();
    }
}
