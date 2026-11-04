package minibank.model;

import java.io.Serializable;
import java.util.Objects;
import minibank.exception.InsufficientFundsException;
import minibank.exception.InvalidAmountException;
import minibank.model.annotation.Id;
import minibank.model.annotation.MaxLength;
import minibank.model.annotation.Positive;

public abstract class Account implements Transactable, InterestBearing, Serializable,
        Comparable<Account> {
    private static final long serialVersionUID = 1L;

    @Id
    @MaxLength(10)
    private final String accountNumber;
    @MaxLength(60)
    private final String ownerName;
    @Positive
    private long balance;

    protected Account(String accountNumber, String ownerName, long balance) {
        this.accountNumber = Objects.requireNonNull(accountNumber);
        this.ownerName = Objects.requireNonNull(ownerName);
        this.balance = balance;
    }

    public final String getAccountNumber() { return accountNumber; }
    public final String getOwnerName() { return ownerName; }
    @Override public synchronized long getBalance() { return balance; }

    @Override
    public synchronized void deposit(long amount) throws InvalidAmountException {
        if (amount <= 0) throw new InvalidAmountException("Deposit must be positive.");
        balance = Math.addExact(balance, amount);
    }

    @Override
    public synchronized boolean withdraw(long amount)
            throws InsufficientFundsException, InvalidAmountException {
        if (amount <= 0) throw new InvalidAmountException("Withdrawal must be positive.");
        if (!canWithdraw(amount)) {
            throw new InsufficientFundsException(Math.max(0, amount - balance));
        }
        balance = Math.subtractExact(balance, amount);
        return true;
    }

    protected synchronized void setBalance(long balance) { this.balance = balance; }

    public abstract boolean canWithdraw(long amount);

    @Override
    public final int compareTo(Account other) {
        return accountNumber.compareTo(other.accountNumber);
    }

    @Override
    public final boolean equals(Object other) {
        return this == other || other instanceof Account account
            && accountNumber.equals(account.accountNumber);
    }

    @Override
    public final int hashCode() { return accountNumber.hashCode(); }

    @Override
    public String toString() {
        return accountNumber + " | " + ownerName + " | " + getBalance();
    }
}
