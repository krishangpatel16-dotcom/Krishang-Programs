import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;

public class WordFrequency {
    public static void main(String[] args) {
        String paragraph = "Java makes code clear. Java makes programs useful.";
        Map<String, Integer> counts = new HashMap<>();
        for (String word : paragraph.toLowerCase().replaceAll("[^a-z ]", "").split("\\s+")) {
            counts.merge(word, 1, Integer::sum);
        }
        counts.entrySet().stream()
            .sorted(Map.Entry.<String, Integer>comparingByValue(Comparator.reverseOrder())
                .thenComparing(Map.Entry.comparingByKey()))
            .forEach(entry -> System.out.println(entry.getKey() + ": " + entry.getValue()));
    }
}
