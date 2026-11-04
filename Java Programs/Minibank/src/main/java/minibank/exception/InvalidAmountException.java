package minibank.exception;

public final class InvalidAmountException extends BankException {
    private static final long serialVersionUID = 1L;
    public InvalidAmountException(String message) { super(message); }
}
