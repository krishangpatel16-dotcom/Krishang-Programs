import java.util.concurrent.CountDownLatch;

public class CounterRace {
    private static final class Counter {
        private int value;
        void incrementWithoutLock() { value++; }
        synchronized void incrementWithLock() { value++; }
        int value() { return value; }
    }

    public static void main(String[] args) throws InterruptedException {
        int workers = 8;
        int increments = 500_000;
        Counter unsafeCounter = new Counter();
        runWorkers(unsafeCounter, workers, increments, false);
        System.out.println("Unsynchronized count: " + unsafeCounter.value());
        System.out.println("Expected count: " + (workers * increments));

        Counter safeCounter = new Counter();
        runWorkers(safeCounter, workers, increments, true);
        System.out.println("Synchronized count: " + safeCounter.value());
    }

    private static void runWorkers(Counter counter, int workers, int increments, boolean safe)
            throws InterruptedException {
        CountDownLatch start = new CountDownLatch(1);
        Thread[] threads = new Thread[workers];
        for (int i = 0; i < workers; i++) {
            threads[i] = new Thread(() -> {
                try {
                    start.await();
                } catch (InterruptedException exception) {
                    Thread.currentThread().interrupt();
                    return;
                }
                for (int j = 0; j < increments; j++) {
                    if (safe) counter.incrementWithLock();
                    else counter.incrementWithoutLock();
                }
            }, "counter-" + i);
            threads[i].start();
        }
        start.countDown();
        for (Thread thread : threads) thread.join();
    }
}
