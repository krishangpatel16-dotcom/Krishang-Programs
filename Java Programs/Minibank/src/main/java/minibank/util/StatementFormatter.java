package minibank.util;

import minibank.model.Account;

public final class StatementFormatter {
    private StatementFormatter() { }

    public static String buildStatement(Account account) {
        return new StringBuilder("MINIBANK ACCOUNT STATEMENT\n")
            .append("Account: ").append(account.getAccountNumber()).append('\n')
            .append("Owner: ").append(account.getOwnerName()).append('\n')
            .append("Balance: ").append(account.getBalance()).append('\n')
            .append("Interest rate: ").append(account.interestRate()).append("%\n")
            .toString();
    }
}
