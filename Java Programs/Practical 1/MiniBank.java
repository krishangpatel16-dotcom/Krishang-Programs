import java.util.Scanner;

public class MiniBank {
    public static void main(String[] args) { 
        record Account(String Name, String branch) {}

        enum MenuOption {
            Open_ACCOUNT,
            DEPOSIT,
            WITHDRAW,
            TRANSFER,
            EXIT
        }

        Scanner scanner = new Scanner(System.in);
        while (true) {
            System.out.print("1. Open Account\n2. Deposit\n3. Withdraw\n4. Transfer\n5. Exit\nChoose an option: ");
            int input = scanner.nextInt();
            scanner.nextLine(); // Consume the newline character

            MenuOption choice=switch (input) {
                case 1 -> MenuOption.Open_ACCOUNT;
                case 2 -> MenuOption.DEPOSIT;
                case 3 -> MenuOption.WITHDRAW;
                case 4 -> MenuOption.TRANSFER;
                case 5 -> MenuOption.EXIT;
                default -> null;
            };

            switch (choice) {
                case Open_ACCOUNT:
                    System.out.print("Open_Account - to be implemented in a later lab\n");
                    break;
                case DEPOSIT:
                    System.out.print("Deposit - to be implemented in a later lab\n");
                    break;
                case WITHDRAW:
                    System.out.print("Withdraw - to be implemented in a later lab\n");
                    break;
                case TRANSFER:
                    System.out.print("Transfer - to be implemented in a later lab\n");
                    break;
                case EXIT:
                    System.out.println("Exiting... Thank you for using MiniBank!");
                    scanner.close();
                    return;
                default:
                    System.out.println("Invalid option. Please try again.");
            }
        }
    }
}
