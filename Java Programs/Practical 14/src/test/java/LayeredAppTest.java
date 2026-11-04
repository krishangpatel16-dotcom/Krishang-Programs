import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

class LayeredAppTest {
    @Test
    void addingTaskIncreasesCount() {
        LayeredApp.TaskService service = new LayeredApp.TaskService();
        service.add("Prepare practical");
        assertEquals(1, service.count());
    }

    @Test
    void blankTaskIsRejected() {
        LayeredApp.TaskService service = new LayeredApp.TaskService();
        assertThrows(IllegalArgumentException.class, () -> service.add(" "));
    }

    @Test
    void validTasksAreReturned() {
        LayeredApp.TaskService service = new LayeredApp.TaskService();
        service.add("Run tests");
        assertEquals(1, service.all().size());
    }
}
