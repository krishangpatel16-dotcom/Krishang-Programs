import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.nio.file.Files;
import java.nio.file.Path;

public class SerializationDemo {
    private static final class Student implements Serializable {
        private static final long serialVersionUID = 1L;
        private final String name;
        private transient String sessionToken;

        Student(String name, String sessionToken) {
            this.name = name;
            this.sessionToken = sessionToken;
        }
    }

    public static void main(String[] args) throws IOException, ClassNotFoundException {
        Path file = Files.createTempFile("students-", ".dat");
        try {
            Student[] students = {new Student("Riya", "temporary-token")};
            try (ObjectOutputStream output = new ObjectOutputStream(Files.newOutputStream(file))) {
                output.writeObject(students);
            }
            try (ObjectInputStream input = new ObjectInputStream(Files.newInputStream(file))) {
                Student[] loaded = (Student[]) input.readObject();
                System.out.println("Loaded student: " + loaded[0].name);
                System.out.println("Transient token: " + loaded[0].sessionToken);
            }
        } finally {
            Files.deleteIfExists(file);
        }
    }
}
