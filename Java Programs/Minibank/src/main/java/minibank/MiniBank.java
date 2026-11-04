package minibank;

import static minibank.util.Validator.isValidMobile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Scanner;
import minibank.exception.BankException;
import minibank.model.Account;
import minibank.model.Command;
import minibank.model.SavingsAccount;
import minibank.model.WithdrawRule;
import minibank.repository.Repository;
import minibank.service.BankService;
import minibank.service.ReportGenerator;
import minibank.service.StatePersister;
import minibank.service.TransactionProcessor;
import minibank.model.CommandParser;
import minibank.util.AnnotationValidator;
import minibank.util.Validator;

public class MiniBank {
    private static final Path DATA = Path.of("data");
    private static final Path ACCOUNTS_FILE = DATA.resolve("accounts.dat");
    private static final Path LOGS_FOLDER = DATA.resolve("logs");
    private static final Path TRANSACTION_LOG = LOGS_FOLDER.resolve("transactions.log");
    private static final Path REPORT_FILE = DATA.resolve("report.txt");

    public static void main(String[] args) throws IOException {
        Repository<Account> repository = new Repository<>();
        if (Files.exists(ACCOUNTS_FILE)) {
            try {
                repository.saveAll(StatePersister.load(ACCOUNTS_FILE));
            } catch (ClassNotFoundException exception) {
                throw new IOException("Saved MiniBank data is incompatible.", exception);
            }
        }

        BankService bank = new BankService(repository, TRANSACTION_LOG);
        System.out.println("MiniBank | Main Branch");
        System.out.println("Mobile validation sample: " + isValidMobile("9876543210"));
        WithdrawRule anonymousRule = new WithdrawRule() {
            @Override public boolean allow(Account account, long amount) {
                return account.canWithdraw(amount);
            }
        };
        WithdrawRule lambdaRule = Account::canWithdraw;
        System.out.println("Withdrawal rules agree: "
            + (anonymousRule.allow(new SavingsAccount("AC9998", "Sample", 1000, 100), 100)
                == lambdaRule.allow(new SavingsAccount("AC9999", "Sample", 1000, 100), 100)));

        try (Scanner scanner = new Scanner(System.in)) {
            boolean running = true;
            while (running) {
                printMenu();
                String input = scanner.nextLine().trim();
                try {
                    switch (input) {
                        case "1" -> openAccount(scanner, bank);
                        case "2" -> executeCommand(scanner, bank, "DEPOSIT");
                        case "3" -> executeCommand(scanner, bank, "WITHDRAW");
                        case "4" -> transfer(scanner, bank);
                        case "5" -> statement(scanner, bank);
                        case "6" -> bank.listAccounts().forEach(System.out::println);
                        case "7" -> System.out.print(
                            ReportGenerator.generate(LOGS_FOLDER, REPORT_FILE));
                        case "8" -> processBatch(scanner, bank);
                        case "9" -> running = false;
                        default -> System.out.println("Invalid option. Choose 1-9.");
                    }
                } catch (BankException | IOException | IllegalArgumentException exception) {
                    System.out.println("Operation failed: " + exception.getMessage());
                }
            }
        }

        StatePersister.save(repository.findAll().toArray(Account[]::new), ACCOUNTS_FILE);
        System.out.println("Exiting MiniBank. Data saved.");
    }

    private static void printMenu() {
        System.out.println("""
            1. Open savings account
            2. Deposit
            3. Withdraw
            4. Transfer
            5. Account statement
            6. List accounts
            7. End-of-day report
            8. Batch deposits
            9. Exit""");
        System.out.print("Choose an option: ");
    }

    private static void openAccount(Scanner scanner, BankService bank)
            throws BankException, IOException {
        System.out.print("Account number (AC0001): ");
        String number = scanner.nextLine().trim();
        System.out.print("Owner name: ");
        String owner = scanner.nextLine().trim();
        System.out.print("Opening balance: ");
        long balance = Long.parseLong(scanner.nextLine().trim());
        System.out.print("Minimum balance: ");
        long minimum = Long.parseLong(scanner.nextLine().trim());
        Account account = bank.openAccount(number, owner, balance, minimum);
        System.out.println("Opened: " + account);
        String[] errors = AnnotationValidator.validate(account);
        for (String error : errors) System.out.println(error);
    }

    private static void executeCommand(Scanner scanner, BankService bank, String type)
            throws BankException, IOException {
        System.out.print("Account number and amount: ");
        Command command = CommandParser.parse(type + " " + scanner.nextLine().trim());
        bank.execute(command);
        System.out.println("Transaction completed.");
    }

    private static void transfer(Scanner scanner, BankService bank)
            throws BankException, IOException {
        System.out.print("From account: ");
        String from = scanner.nextLine().trim();
        System.out.print("To account: ");
        String to = scanner.nextLine().trim();
        System.out.print("Amount: ");
        long amount = Long.parseLong(scanner.nextLine().trim());
        bank.transfer(from, to, amount);
        System.out.println("Transfer completed.");
    }

    private static void statement(Scanner scanner, BankService bank) throws BankException {
        System.out.print("Account number: ");
        System.out.print(bank.statement(scanner.nextLine().trim()));
    }

    private static void processBatch(Scanner scanner, BankService bank) {
        System.out.println("Enter account number and deposit amount per line; blank line ends the batch.");
        try (TransactionProcessor processor = new TransactionProcessor()) {
            while (true) {
                String line = scanner.nextLine().trim();
                if (line.isEmpty()) break;
                String[] parts = line.split("\\s+");
                if (parts.length != 2) {
                    System.out.println("Skipped malformed transaction: " + line);
                    continue;
                }
                long amount = Long.parseLong(parts[1]);
                processor.submit(() -> {
                    try {
                        bank.deposit(parts[0], amount);
                    } catch (BankException | IOException exception) {
                        System.err.println("Batch transaction failed: " + exception.getMessage());
                    }
                });
            }
        }
    }
}
