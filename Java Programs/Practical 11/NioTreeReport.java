import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.BasicFileAttributes;

public class NioTreeReport {
    public static void main(String[] args) throws IOException {
        Path root = Files.createTempDirectory("tree-report-");
        Path report = root.resolveSibling(root.getFileName() + "-report.txt");
        try {
            Files.createDirectories(root.resolve("subfolder"));
            Files.writeString(root.resolve("first.txt"), "first file");
            Files.writeString(root.resolve("subfolder").resolve("second.txt"), "second file");
            StringBuilder output = new StringBuilder("File report for ").append(root)
                .append(System.lineSeparator());
            try (var paths = Files.walk(root)) {
                for (Path path : paths.filter(Files::isRegularFile).toList()) {
                    BasicFileAttributes attributes =
                        Files.readAttributes(path, BasicFileAttributes.class);
                    output.append(path.getFileName()).append(" | ")
                        .append(attributes.size()).append(" bytes | ")
                        .append(attributes.lastModifiedTime()).append(System.lineSeparator());
                }
            }
            Files.writeString(report, output);
            System.out.println(Files.readString(report));
        } finally {
            try (var paths = Files.walk(root)) {
                for (Path path : paths.sorted(java.util.Comparator.reverseOrder()).toList()) {
                    Files.deleteIfExists(path);
                }
            }
            Files.deleteIfExists(report);
        }
    }
}
