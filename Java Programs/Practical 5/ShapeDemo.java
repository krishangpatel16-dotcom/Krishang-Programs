abstract class Shape {
    abstract double area();    
}

class Circle extends Shape {
    private double radius;

    Circle(double radius) {
        this.radius = radius;
    }

    @Override
    double area() {
        return Math.PI * radius * radius;
    }
}

class Rectangle extends Shape {
    private double length;
    private double width;

    Rectangle(double length, double width) {
        this.length = length;
        this.width = width;
    }

    @Override
    double area() {
        return length * width;
    }
}

class Triangle extends Shape {
    private double base;
    private double height;

    Triangle(double base, double height) {
        this.base = base;
        this.height = height;
    }

    @Override
    double area() {
        return 0.5 * base * height;
    }
}

public class ShapeDemo {
    public static void main(String[] args) 
    {
        Shape[] shapes={
            new Circle(3),
            new Rectangle(4, 5),
            new Triangle(6, 7),
            new Circle(2)
        };

        double totalArea=0;
        double largestArea=0;

        for (Shape shape : shapes) 
        {
            double area=shape.area();
            System.out.printf("Area: %.2f%n", area);
            totalArea += area;
            if (area > largestArea) {
                largestArea = area;
            }
            System.out.printf("Largest Area so far: %.2f%n", largestArea);
        }
        System.out.printf("Total Area: %.2f%n", totalArea);
        System.out.printf("Largest Area: %.2f%n", largestArea);
    }
}