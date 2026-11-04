package minibank.service;

import minibank.exception.InvalidAmountException;
import minibank.model.Account;

public final class AccountWorker implements Runnable {
    private final Account account;
    private final int times;
    private final long amount;

    public AccountWorker(Account account, int times, long amount) {
        if (times < 0) throw new IllegalArgumentException("Times cannot be negative.");
        this.account = account;
        this.times = times;
        this.amount = amount;
    }

    @Override
    public void run() {
        for (int i = 0; i < times; i++) {
            try {
                account.deposit(amount);
                System.out.println(Thread.currentThread().getName() + " deposited " + amount);
            } catch (InvalidAmountException exception) {
                System.err.println("Deposit failed: " + exception.getMessage());
                return;
            }
        }
    }
}
