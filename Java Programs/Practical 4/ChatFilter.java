import java.util.Scanner;

public class ChatFilter {
    public static void main(String[] args) {
        String[] logs = {"10:05 alice Hello there", "10:06 bob I am online",
            "malformed", "10:07 cara Good evening"};
        try (Scanner scanner = new Scanner(System.in)) {
            System.out.print("Keyword: ");
            String keyword = scanner.nextLine().trim().toLowerCase();
            int matches = 0;
            StringBuilder report = new StringBuilder();
            for (String line : logs) {
                String[] parts = line.split(" ", 3);
                if (parts.length < 3) continue;
                if (parts[2].toLowerCase().contains(keyword)) {
                    matches++;
                    report.append(parts[0]).append(' ').append(parts[1]).append(": ")
                        .append(parts[2]).append(System.lineSeparator());
                }
            }
            System.out.println("Matches: " + matches);
            System.out.print(report);
        }
    }
}
