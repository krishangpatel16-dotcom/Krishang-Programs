package minibank.model;

public final class FixedDepositAccount extends Account {
    private static final long serialVersionUID = 1L;

    public FixedDepositAccount(String accountNumber, String ownerName, long balance) {
        super(accountNumber, ownerName, balance);
    }

    @Override public double interestRate() { return 7.0; }
    @Override public boolean canWithdraw(long amount) { return false; }
}
