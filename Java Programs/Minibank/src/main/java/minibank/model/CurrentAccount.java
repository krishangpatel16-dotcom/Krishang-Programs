package minibank.model;

public final class CurrentAccount extends Account {
    private static final long serialVersionUID = 1L;
    private final long overdraftLimit;

    public CurrentAccount(String accountNumber, String ownerName, long balance, long overdraftLimit) {
        super(accountNumber, ownerName, balance);
        if (overdraftLimit < 0) throw new IllegalArgumentException("Overdraft cannot be negative.");
        this.overdraftLimit = overdraftLimit;
    }

    public long getOverdraftLimit() { return overdraftLimit; }
    @Override public double interestRate() { return 0.0; }
    @Override public boolean canWithdraw(long amount) {
        long balance = getBalance();
        return amount > 0 && (amount <= balance || amount - balance <= overdraftLimit);
    }
}
