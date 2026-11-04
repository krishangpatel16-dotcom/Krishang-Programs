package minibank.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public final class ReportGenerator {
    private static final Pattern TRANSACTION = Pattern.compile("^(DEPOSIT|WITHDRAW)\\s+(\\d+)$");

    private ReportGenerator() { }

    public static String generate(Path logsFolder, Path reportFile) throws IOException {
        long deposits = 0;
        long withdrawals = 0;
        StringBuilder report = new StringBuilder("MINIBANK END-OF-DAY REPORT\n");
        if (Files.isDirectory(logsFolder)) {
            try (var files = Files.newDirectoryStream(logsFolder, "*.log")) {
                for (Path file : files) {
                    BasicFileAttributes attributes =
                        Files.readAttributes(file, BasicFileAttributes.class);
                    report.append(file.getFileName()).append(" | ")
                        .append(attributes.size()).append(" bytes | ")
                        .append(attributes.lastModifiedTime()).append('\n');
                    try (BufferedReader reader = Files.newBufferedReader(file)) {
                        String line;
                        while ((line = reader.readLine()) != null) {
                            Matcher matcher = TRANSACTION.matcher(line.trim());
                            if (matcher.matches()) {
                                long amount = Long.parseLong(matcher.group(2));
                                if (matcher.group(1).equals("DEPOSIT")) deposits += amount;
                                else withdrawals += amount;
                            }
                        }
                    }
                }
            }
        }
        report.append("Total deposits: ").append(deposits).append('\n')
            .append("Total withdrawals: ").append(withdrawals).append('\n');
        Path parent = reportFile.toAbsolutePath().getParent();
        if (parent != null) Files.createDirectories(parent);
        Files.writeString(reportFile, report);
        return report.toString();
    }
}
