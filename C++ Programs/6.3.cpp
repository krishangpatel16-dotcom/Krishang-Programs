#include <iostream>
#include <string>

using namespace std;

class Fuel {
protected:
    string fuelType;

public:
    Fuel(string fuelType) : fuelType(fuelType) {}

    void displayFuel() {
        cout << "Fuel Type: " << fuelType << "\n";
    }
};

class Brand {
protected:
    string brandName;

public:
    Brand(string brandName) : brandName(brandName) {}

    void displayBrand() {
        cout << "Brand Name: " << brandName << "\n";
    }
};

class Car : public Fuel, public Brand {
public:
    Car(string fuelType, string brandName): Fuel(fuelType), Brand(brandName) {}

    void display() {
        cout << "Car Details:\n";
        displayFuel();
        displayBrand();
    }
};

int main() {
    Car car1("Petrol", "Toyota");
    Car car2("Diesel", "Ford");
    Car car3("Electric", "Tesla");

    Car *cars[10];
    int carCount = 0;
    cars[carCount++] = &car1;
    cars[carCount++] = &car2;
    cars[carCount++] = &car3;

    cout << "=== Direct Storage: List all cars ===\n";
    for (int i = 0; i < carCount; i++) {
        cars[i]->display();
        cout << "\n";
    }

    cout << "=== Queue-based Processing ===\n";
    int front = 0;
    int rear = carCount - 1;
    while (front <= rear) {
        cout << "Processing car " << (front + 1) << ":\n";
        cars[front]->display();
        cout << "\n";
        front++;
    }

    return 0;
}