import java.util.Scanner;

enum Coin {
    ONE, TWO, FIVE, TEN
}

public class VendingMachine {
    public static void main(String[] args) {
        int price = 15;
        int total = 0;
        Scanner scanner = new Scanner(System.in);

        while (total < price) {
            System.out.print("Insert coin (ONE, TWO, FIVE, TEN): ");        
            String input = scanner.next().toUpperCase();
            Coin coin;
            try {
                coin = Coin.valueOf(input);
            } catch (IllegalArgumentException e) {
                System.out.println("Invalid coin: " + input);
                continue;
            }

            int value = switch (coin) {
                case ONE -> 1;
                case TWO -> 2;
                case FIVE -> 5;
                case TEN -> 10;
            };

            total += value;
            System.out.println("Total so far: " + total);
        }

        System.out.println("Paid. Change: " + (total - price));
        scanner.close();
    }
}