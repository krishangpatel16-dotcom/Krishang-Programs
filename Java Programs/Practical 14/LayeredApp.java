import java.util.ArrayList;
import java.util.List;

public class LayeredApp {
    private record Task(String title) { }

    static final class TaskService {
        private final List<Task> tasks = new ArrayList<>();
        void add(String title) {
            if (title == null || title.isBlank()) throw new IllegalArgumentException("Task title is required.");
            tasks.add(new Task(title));
        }
        int count() { return tasks.size(); }
        List<Task> all() { return List.copyOf(tasks); }
    }

    public static void main(String[] args) {
        TaskService service = new TaskService();
        service.add("Prepare practical");
        service.add("Run tests");
        System.out.println("Tasks: " + service.count());
        service.all().forEach(System.out::println);
        try {
            service.add("");
        } catch (IllegalArgumentException exception) {
            System.out.println("Invalid action: " + exception.getMessage());
        }
    }
}
