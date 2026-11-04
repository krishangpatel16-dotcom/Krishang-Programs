import java.util.ArrayDeque;
import java.util.Queue;

public class ProducerConsumerDemo {
    private static final class Buffer {
        private final Queue<Integer> values = new ArrayDeque<>();
        private final int capacity;
        Buffer(int capacity) { this.capacity = capacity; }

        synchronized void put(int value) throws InterruptedException {
            while (values.size() == capacity) wait();
            values.add(value);
            notifyAll();
        }

        synchronized int take() throws InterruptedException {
            while (values.isEmpty()) wait();
            int value = values.remove();
            notifyAll();
            return value;
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Buffer buffer = new Buffer(2);
        Thread producer = new Thread(() -> {
            try {
                for (int value = 1; value <= 8; value++) buffer.put(value);
                buffer.put(-1);
            } catch (InterruptedException exception) {
                Thread.currentThread().interrupt();
            }
        }, "producer");
        Thread consumer = new Thread(() -> {
            try {
                int value;
                while ((value = buffer.take()) != -1) System.out.println("Consumed: " + value);
            } catch (InterruptedException exception) {
                Thread.currentThread().interrupt();
            }
        }, "consumer");
        producer.start();
        consumer.start();
        producer.join();
        consumer.join();
    }
}
