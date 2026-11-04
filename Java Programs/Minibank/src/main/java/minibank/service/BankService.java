package minibank.service;

import static minibank.util.Validator.isValidAccountNumber;

import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import minibank.exception.AccountNotFoundException;
import minibank.exception.BankException;
import minibank.exception.InsufficientFundsException;
import minibank.exception.InvalidAmountException;
import minibank.model.Account;
import minibank.model.Command;
import minibank.model.SavingsAccount;
import minibank.model.TransactionType;
import minibank.repository.Repository;
import minibank.util.StatementFormatter;

public final class BankService {
    private final Repository<Account> accounts;
    private final Path logFile;

    public BankService(Repository<Account> accounts, Path logFile) {
        this.accounts = accounts;
        this.logFile = logFile;
    }

    public Account openAccount(String accountNumber, String owner, long initialBalance,
            long minimumBalance) throws BankException, IOException {
        if (!isValidAccountNumber(accountNumber)) {
            throw new IllegalArgumentException("Use an account number such as AC0001.");
        }
        if (initialBalance < 0) throw new InvalidAmountException("Initial balance cannot be negative.");
        if (accounts.findById(accountNumber) != null) {
            throw new IllegalArgumentException("Account already exists.");
        }
        Account account = new SavingsAccount(accountNumber, owner, initialBalance, minimumBalance);
        accounts.save(account);
        return account;
    }

    public void deposit(String accountNumber, long amount) throws BankException, IOException {
        Account account = find(accountNumber);
        account.deposit(amount);
        TransactionLog.append(logFile, "DEPOSIT " + amount);
    }

    public void withdraw(String accountNumber, long amount) throws BankException, IOException {
        Account account = find(accountNumber);
        account.withdraw(amount);
        TransactionLog.append(logFile, "WITHDRAW " + amount);
    }

    public void transfer(String fromNumber, String toNumber, long amount)
            throws BankException, IOException {
        Account from = find(fromNumber);
        Account to = find(toNumber);
        if (from.equals(to)) throw new IllegalArgumentException("Transfer accounts must differ.");
        Account first = Comparator.comparing(Account::getAccountNumber).compare(from, to) < 0
            ? from : to;
        Account second = first == from ? to : from;
        synchronized (first) {
            synchronized (second) {
                from.withdraw(amount);
                try {
                    to.deposit(amount);
                } catch (InvalidAmountException | ArithmeticException exception) {
                    from.deposit(amount);
                    throw exception;
                }
            }
        }
        TransactionLog.append(logFile, "WITHDRAW " + amount);
        TransactionLog.append(logFile, "DEPOSIT " + amount);
    }

    public String statement(String accountNumber) throws AccountNotFoundException {
        return StatementFormatter.buildStatement(find(accountNumber));
    }

    public List<Account> listAccounts() {
        ArrayList<Account> result = accounts.findAll();
        result.sort(Comparator.comparingLong(Account::getBalance).reversed()
            .thenComparing(Account::getAccountNumber));
        return result;
    }

    public Account find(String accountNumber) throws AccountNotFoundException {
        Account account = accounts.findById(accountNumber);
        if (account == null) throw new AccountNotFoundException(accountNumber);
        return account;
    }

    public void execute(Command command) throws BankException, IOException {
        if (command.amount() <= 0) throw new InvalidAmountException("Amount must be positive.");
        if (command.type() == TransactionType.DEPOSIT) {
            deposit(command.accountNumber(), command.amount());
        } else if (command.type() == TransactionType.WITHDRAW) {
            withdraw(command.accountNumber(), command.amount());
        } else {
            throw new IllegalArgumentException("Use the transfer menu for a two-account transfer.");
        }
    }
}
