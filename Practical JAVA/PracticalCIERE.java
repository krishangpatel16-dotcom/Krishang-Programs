import java.util.regex.Pattern;

abstract class Person {
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");

    protected String name;
    protected int age;
    protected String email;

    Person(String name, int age, String email) {
        if (email == null || !EMAIL_PATTERN.matcher(email).matches()) {
            throw new IllegalArgumentException("Invalid email address: " + email);
        }
        this.name = name;
        this.age = age;
        this.email = email;
    }

    abstract void display();
}

class Student extends Person {
    private String grade;
    private int total;
    private int marks1, marks2, marks3;
    private int percentage;

    Student(String name, int age, int marks1, int marks2, int marks3, String email) {
        super(name, age, email);
        this.marks1 = marks1;
        this.marks2 = marks2;
        this.marks3 = marks3;
        this.total = marks1 + marks2 + marks3;
        this.percentage = this.total / 3;

        if (this.percentage >= 90) {
            this.grade = "A";
        } else if (this.percentage >= 75) {
            this.grade = "B";
        } else if (this.percentage >= 60) {
            this.grade = "C";
        } else if (this.percentage >= 50) {
            this.grade = "D";
        } else {
            this.grade = "F";
        }
    }

    @Override
    void display() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Email: " + email);
        System.out.println("Marks: " + marks1 + ", " + marks2 + ", " + marks3);
        System.out.println("Total: " + total);
        System.out.println("Percentage: " + percentage + "%");
        System.out.println("Grade: " + grade);
    }

    int comparePerformance(Student other) {
        return Integer.compare(this.percentage, other.percentage);
    }

    String getEmailUsername() {
        return email.substring(0, email.indexOf('@'));
    }

    String getEmailDomain() {
        return email.substring(email.indexOf('@') + 1);
    }
}

public class PracticalCIERE {
    public static void main(String[] args) {
        Student firstStudent = new Student("Krishang Patel", 19, 85, 90, 88, "krishang.patel@example.com");
        Student secondStudent = new Student("Aarav Shah", 20, 78, 82, 80, "aarav.shah@example.com");

        Person person1 = firstStudent;
        Person person2 = secondStudent;
        person1.display();
        person2.display();

        System.out.println("Email username: " + firstStudent.getEmailUsername());
        System.out.println("Email domain: " + firstStudent.getEmailDomain());

        int comparison = firstStudent.comparePerformance(secondStudent);
        if (comparison > 0) {
            System.out.println(firstStudent.name + " has the higher percentage.");
        } else if (comparison < 0) {
            System.out.println(secondStudent.name + " has the higher percentage.");
        } else {
            System.out.println("Both students have the same percentage.");
        }
    }
}