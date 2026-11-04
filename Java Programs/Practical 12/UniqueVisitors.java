import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

public class UniqueVisitors {
    public static void main(String[] args) {
        List<String> logins = List.of("riya", "aman", "riya", "dev", "neha", "aman");
        Set<String> uniqueUsers = new HashSet<>(logins);
        Set<String> firstSeenOrder = new LinkedHashSet<>(logins);
        System.out.println("Unique visitors: " + uniqueUsers.size());
        System.out.println("First three: " + firstSeenOrder.stream().limit(3).toList());
    }
}
