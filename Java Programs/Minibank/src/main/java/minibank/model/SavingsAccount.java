package minibank.model;

public final class SavingsAccount extends Account implements Premium {
    private static final long serialVersionUID = 1L;
    private final long minBalance;

    public SavingsAccount(String accountNumber, String ownerName, long balance, long minBalance) {
        super(accountNumber, ownerName, balance);
        if (minBalance < 0) throw new IllegalArgumentException("Minimum balance cannot be negative.");
        this.minBalance = minBalance;
    }

    public long getMinBalance() { return minBalance; }
    @Override public double interestRate() { return 4.0; }
    @Override public boolean canWithdraw(long amount) {
        long balance = getBalance();
        return amount > 0 && balance >= minBalance && amount <= balance - minBalance;
    }
}
