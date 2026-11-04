#include <iostream>
#include <string>

using namespace std;

class Person {
protected:
    string name;
    int age;

public:
    Person(string name, int age) : name(name), age(age) {}

    void display() {
        cout << "Person Details:\n";
        cout << "  Name: " << name << "\n";
        cout << "  Age: " << age << "\n";
    }
};

class Employee : public Person {
protected:
    int employeeId;

public:
    Employee(string name, int age, int employeeId)
        : Person(name, age), employeeId(employeeId) {}

    void display() {
        cout << "Employee Details:\n";
        cout << "  Name: " << name << "\n";
        cout << "  Age: " << age << "\n";
        cout << "  Employee ID: " << employeeId << "\n";
    }

    int getEmployeeId() {
        return employeeId;
    }
};

class Manager : public Employee {
private:
    string department;

public:
    Manager(string name, int age, int employeeId, string department)
        : Employee(name, age, employeeId), department(department) {}

    void display() {
        cout << "Manager Details:\n";
        cout << "  Name: " << name << "\n";
        cout << "  Age: " << age << "\n";
        cout << "  Employee ID: " << employeeId << "\n";
        cout << "  Department: " << department << "\n";
    }

    void displayHierarchy() {
        cout << "--- Full Hierarchy ---\n";
        Person::display();
        Employee::display();
        display();
    }

    void setDepartment(string newDepartment) {
        department = newDepartment;
    }

    string getDepartment() {
        return department;
    }
};

Manager *findManagerById(Manager *list[], int count, int id) {
    for (int i = 0; i < count; i++) {
        if (list[i]->getEmployeeId() == id) {
            return list[i];
        }
    }
    return 0;
}

int main() {
    Manager alice("Alice Johnson", 42, 2101, "Operations");
    Manager bob("Bob Patel", 37, 2102, "Sales");
    Manager clara("Clara Lee", 45, 2103, "fFinance");

    Manager *managers[10];
    int managerCount = 0;
    managers[managerCount++] = &alice;
    managers[managerCount++] = &bob;
    managers[managerCount++] = &clara;

    cout << "=== Storage: List all managers ===\n";
    for (int i = 0; i < managerCount; i++) {
        managers[i]->display();
        cout << "\n";
    }

    cout << "=== Retrieval by Employee ID ===\n";
    int searchId = 2102;
    Manager *found = findManagerById(managers, managerCount, searchId);
    if (found) {
        cout << "Found manager for ID " << searchId << ":\n";
        found->displayHierarchy();
    } else {
        cout << "No manager found with ID " << searchId << ".\n";
    }

    cout << "\n=== Update Manager Department ===\n";
    if (found) {
        found->setDepartment("Global Sales");
        found->display();
    }

    cout << "\n=== Search by Department (simple linear search) ===\n";
    string deptSearch = "Finance";
    bool anyFound = false;
    for (int i = 0; i < managerCount; i++) {
        if (managers[i]->getDepartment() == deptSearch) {
            anyFound = true;
            managers[i]->display();
            cout << "\n";
        }
    }
    if (!anyFound) {
        cout << "No manager found for department: " << deptSearch << "\n";
    }

    return 0;
}
