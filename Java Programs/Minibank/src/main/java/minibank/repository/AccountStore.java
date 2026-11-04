package minibank.repository;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import minibank.model.Account;

public final class AccountStore {
    private final ConcurrentHashMap<String, Account> accounts = new ConcurrentHashMap<>();
    private final List<String> transactionHistory = new ArrayList<>();

    public void add(Account account) {
        Account previous = accounts.putIfAbsent(account.getAccountNumber(), account);
        if (previous != null) throw new IllegalArgumentException("Account already exists.");
    }

    public Account get(String accountNumber) { return accounts.get(accountNumber); }
    public ArrayList<Account> getAll() { return new ArrayList<>(accounts.values()); }

    public ArrayList<Account> sortedByBalance() {
        ArrayList<Account> sorted = getAll();
        sorted.sort(Comparator.comparingLong(Account::getBalance).reversed()
            .thenComparing(Account::getAccountNumber));
        return sorted;
    }

    public synchronized void addHistory(String transaction) {
        transactionHistory.add(transaction);
    }

    public synchronized List<String> getHistory() {
        return List.copyOf(transactionHistory);
    }
}
