#include <iostream>

class Point {
private:
    int x, y;

public:
    // Constructor
    Point(int a = 0, int b = 0) {
        x=a;
        y=b;

    }

    // Method chaining: returns a reference to the current object
    Point& move(int dx, int dy) {
        this->x += dx;
        this->y += dy;
        return *this;
    }

    void display() const {
        std::cout << "Point(" << x << ", " << y << ")" << std::endl;
    }

    // Friend function to allow access to private members for the pointer demo
    friend void updatePointViaPointer(Point* p, int newX, int newY)
    {
    if (p != nullptr) {
        p->x = newX;
        p->y = newY;
    }
};

int main()
{
    Point p(10, 10);

    std::cout << "Initial Position: ";
    p.display();

    // 1. Demonstrate Method Chaining
    p.move(2, 3).move(-1, 4);
    std::cout << "After Chained Move: ";
    p.display();

    // 2. Demonstrate Pass-by-Reference via Pointers
    updatePointViaPointer(&p, 50, 50);
    std::cout << "After Pointer Update: ";
    p.display();

    return 0;
}

