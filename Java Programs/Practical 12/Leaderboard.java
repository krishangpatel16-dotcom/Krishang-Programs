import java.util.Comparator;
import java.util.Map;

public class Leaderboard {
    public static void main(String[] args) {
        Map<String, Integer> scores = Map.of(
            "Riya", 94, "Aman", 87, "Dev", 94, "Neha", 78);
        scores.entrySet().stream()
            .sorted(Map.Entry.<String, Integer>comparingByValue(Comparator.reverseOrder())
                .thenComparing(Map.Entry.comparingByKey()))
            .limit(3)
            .forEach(entry -> System.out.println(entry.getKey() + ": " + entry.getValue()));
    }
}
