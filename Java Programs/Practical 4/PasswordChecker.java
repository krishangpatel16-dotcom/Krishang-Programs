public class PasswordChecker {
    private static final String[] RULES = {
        "at least 8 characters", "an uppercase letter", "a digit", "a special character"
    };

    public static String strength(String password) {
        int score = 0;
        if (password.length() >= 8) score++;
        if (password.matches(".*[A-Z].*")) score++;
        if (password.matches(".*\\d.*")) score++;
        if (password.matches(".*[^a-zA-Z0-9].*")) score++;
        return score <= 1 ? "Weak" : score <= 3 ? "Medium" : "Strong";
    }

    public static void main(String[] args) {
        for (String password : new String[]{"abc", "Abcd1234!", "hello123", "OnlyUppercase"}) {
            System.out.println("Password: " + password);
            boolean[] passed = {password.length() >= 8, password.matches(".*[A-Z].*"),
                password.matches(".*\\d.*"), password.matches(".*[^a-zA-Z0-9].*")};
            for (int i = 0; i < RULES.length; i++) {
                System.out.println("  " + RULES[i] + ": " + passed[i]);
            }
            System.out.println("Strength: " + strength(password));
        }
    }
}
