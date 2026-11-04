import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TemplateFiller {
    public static void main(String[] args) {
        String template = "Dear {name}, order {id} ships {date}.";
        String[] names = {"name", "id"};
        String[] values = {"Riya", "A07"};
        Matcher matcher = Pattern.compile("\\{(\\w+)\\}").matcher(template);
        StringBuilder output = new StringBuilder();
        int previous = 0;
        while (matcher.find()) {
            output.append(template, previous, matcher.start());
            String replacement = "[?]";
            for (int i = 0; i < names.length; i++) {
                if (names[i].equals(matcher.group(1))) {
                    replacement = values[i];
                    break;
                }
            }
            output.append(replacement);
            previous = matcher.end();
        }
        output.append(template, previous, template.length());
        System.out.println(output);
    }
}
