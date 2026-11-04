import java.util.Scanner;

public class GuardedCalculator {
    private static final class DivideByZeroException extends Exception {
        private static final long serialVersionUID = 1L;
        DivideByZeroException() { super("Cannot divide by zero."); }
    }

    private static double calculate(double left, double right, String operator)
            throws DivideByZeroException {
        return switch (operator) {
            case "+" -> left + right;
            case "-" -> left - right;
            case "*" -> left * right;
            case "/" -> {
                if (right == 0) throw new DivideByZeroException();
                yield left / right;
            }
            default -> throw new IllegalArgumentException("Operator must be +, -, *, or /.");
        };
    }

    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {
            while (true) {
                System.out.print("Enter calculation (number operator number): ");
                try {
                    double left = Double.parseDouble(scanner.next());
                    String operator = scanner.next();
                    double right = Double.parseDouble(scanner.next());
                    System.out.println("Result: " + calculate(left, right, operator));
                    break;
                } catch (NumberFormatException exception) {
                    System.out.println("Invalid number. Try again.");
                    scanner.nextLine();
                } catch (DivideByZeroException | IllegalArgumentException exception) {
                    System.out.println(exception.getMessage());
                    scanner.nextLine();
                } finally {
                    System.out.println("Calculation attempt recorded.");
                }
            }
        }
    }
}
