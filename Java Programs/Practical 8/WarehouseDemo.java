import java.util.Map;

public class WarehouseDemo {
    private static final class OutOfStockException extends Exception {
        private static final long serialVersionUID = 1L;
        private final int shortfall;
        OutOfStockException(int shortfall) {
            super("Out of stock by " + shortfall);
            this.shortfall = shortfall;
        }
        int shortfall() { return shortfall; }
    }

    private static final class InvalidQuantityException extends Exception {
        private static final long serialVersionUID = 1L;
        InvalidQuantityException() { super("Quantity must be positive."); }
    }

    private static final class Warehouse {
        private final Map<String, Integer> stock = new java.util.HashMap<>(
            Map.of("Pen", 3, "Book", 1));

        void issue(String item, int quantity)
                throws OutOfStockException, InvalidQuantityException {
            if (quantity <= 0) throw new InvalidQuantityException();
            int available = stock.getOrDefault(item, 0);
            if (quantity > available) throw new OutOfStockException(quantity - available);
            stock.put(item, available - quantity);
            System.out.println("Issued " + quantity + " " + item);
        }
    }

    public static void main(String[] args) {
        Warehouse warehouse = new Warehouse();
        String[][] requests = {{"Pen", "2"}, {"Book", "3"}, {"Pen", "0"}, {"Pencil", "1"}};
        for (String[] request : requests) {
            try {
                warehouse.issue(request[0], Integer.parseInt(request[1]));
            } catch (OutOfStockException exception) {
                System.out.println(exception.getMessage() + " (shortfall "
                    + exception.shortfall() + ")");
            } catch (InvalidQuantityException exception) {
                System.out.println(exception.getMessage());
            }
        }
    }
}
