import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.List;

public class LogAnalyzer {
    public static void main(String[] args) throws IOException {
        Path folder = Files.createTempDirectory("log-analyzer-");
        try {
            Files.write(folder.resolve("app.log"), List.of("INFO started", "ERROR disk full"));
            Files.write(folder.resolve("auth.log"), List.of("INFO login", "ERROR denied"));
            int lines = 0;
            int matches = 0;
            try (var paths = Files.list(folder)) {
                for (Path file : paths.toList()) {
                    BasicFileAttributes attributes =
                        Files.readAttributes(file, BasicFileAttributes.class);
                    System.out.println(file.getFileName() + " bytes=" + attributes.size());
                    for (String line : Files.readAllLines(file)) {
                        lines++;
                        if (line.contains("ERROR")) matches++;
                    }
                }
            }
            System.out.println("Total lines: " + lines);
            System.out.println("Lines containing ERROR: " + matches);
        } finally {
            try (var paths = Files.list(folder)) {
                for (Path file : paths.toList()) Files.deleteIfExists(file);
            }
            Files.deleteIfExists(folder);
        }
    }
}
