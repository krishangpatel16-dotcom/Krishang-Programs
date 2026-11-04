import java.util.List;
import java.util.Scanner;
import java.util.function.UnaryOperator;

public class DiscountEngine {
    public static void main(String[] args) {
        List<Double> prices = List.of(100.0, 250.0, 500.0);
        try (Scanner scanner = new Scanner(System.in)) {
            System.out.print("Choose discount (1=10%, 2=20%, 3=flat 25): ");
            int choice = scanner.nextInt();
            UnaryOperator<Double> discount = switch (choice) {
                case 1 -> price -> price * 0.90;
                case 2 -> price -> price * 0.80;
                case 3 -> price -> Math.max(0, price - 25);
                default -> throw new IllegalArgumentException("Choose 1, 2, or 3.");
            };
            prices.stream().map(discount).forEach(price ->
                System.out.printf("Discounted price: %.2f%n", price));
        }
    }
}
