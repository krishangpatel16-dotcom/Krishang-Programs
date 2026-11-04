@FunctionalInterface
interface Notifier {
    void send(String message);
}

interface Urgent { }

public class NotificationDemo {
    private static final class EmailNotifier implements Notifier, Urgent {
        @Override public void send(String message) {
            System.out.println("Email: " + message);
        }
    }

    private static final class SmsNotifier implements Notifier {
        @Override public void send(String message) {
            System.out.println("SMS: " + message);
        }
    }

    public static void main(String[] args) {
        Notifier[] senders = {new EmailNotifier(), new SmsNotifier(),
            message -> System.out.println("Push: " + message)};
        String message = "Your account statement is ready.";
        for (Notifier sender : senders) sender.send(message);
        for (Notifier sender : senders) {
            if (sender instanceof Urgent) {
                sender.send("URGENT: " + message);
                sender.send("URGENT: " + message);
            }
        }
    }
}
