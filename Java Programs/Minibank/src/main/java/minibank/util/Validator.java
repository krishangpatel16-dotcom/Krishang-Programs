package minibank.util;

import java.util.regex.Pattern;

public final class Validator {
    private static final Pattern MOBILE = Pattern.compile("^[6-9][0-9]{9}$");
    private static final Pattern EMAIL = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");
    private static final Pattern PAN = Pattern.compile("^[A-Z]{5}[0-9]{4}[A-Z]$");
    private static final Pattern IFSC = Pattern.compile("^[A-Z]{4}0[A-Z0-9]{6}$");
    private static final Pattern ACCOUNT = Pattern.compile("^AC[0-9]{4,8}$");

    private Validator() { }

    public static boolean isValidMobile(String value) { return matches(MOBILE, value); }
    public static boolean isValidEmail(String value) { return matches(EMAIL, value); }
    public static boolean isValidPan(String value) { return matches(PAN, value); }
    public static boolean isValidIfsc(String value) { return matches(IFSC, value); }
    public static boolean isValidAccountNumber(String value) { return matches(ACCOUNT, value); }

    private static boolean matches(Pattern pattern, String value) {
        return value != null && pattern.matcher(value).matches();
    }
}
