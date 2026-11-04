import java.util.concurrent.atomic.LongAdder;

public class ParallelSum {
    public static void main(String[] args) throws InterruptedException {
        long[] numbers = new long[100_000];
        for (int i = 0; i < numbers.length; i++) numbers[i] = i + 1L;
        LongAdder total = new LongAdder();
        int workers = 4;
        Thread[] threads = new Thread[workers];
        for (int worker = 0; worker < workers; worker++) {
            int start = worker * numbers.length / workers;
            int end = (worker + 1) * numbers.length / workers;
            threads[worker] = new Thread(() -> {
                long partial = 0;
                for (int i = start; i < end; i++) partial += numbers[i];
                total.add(partial);
            });
            threads[worker].start();
        }
        for (Thread thread : threads) thread.join();
        long expected = (long) numbers.length * (numbers.length + 1) / 2;
        System.out.println("Parallel sum: " + total.sum());
        System.out.println("Expected: " + expected);
    }
}
