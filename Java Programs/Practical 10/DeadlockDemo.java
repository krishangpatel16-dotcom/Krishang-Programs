import java.util.concurrent.CountDownLatch;

public class DeadlockDemo {
    private static final Object FIRST = new Object();
    private static final Object SECOND = new Object();
    private static final Object HASH_COLLISION_LOCK = new Object();

    private static void unsafeTransfer(Object first, Object second, CountDownLatch ready) {
        synchronized (first) {
            ready.countDown();
            try {
                ready.await();
            } catch (InterruptedException exception) {
                Thread.currentThread().interrupt();
                return;
            }
            synchronized (second) {
                System.out.println("Unsafe transfer completed.");
            }
        }
    }

    private static void safeTransfer(Object first, Object second) {
        int firstHash = System.identityHashCode(first);
        int secondHash = System.identityHashCode(second);
        if (firstHash == secondHash) {
            synchronized (HASH_COLLISION_LOCK) {
                lockAndTransfer(first, second);
            }
        } else if (firstHash < secondHash) {
            lockAndTransfer(first, second);
        } else {
            lockAndTransfer(second, first);
        }
    }

    private static void lockAndTransfer(Object first, Object second) {
        synchronized (first) {
            synchronized (second) {
                System.out.println("Ordered transfer completed.");
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        CountDownLatch ready = new CountDownLatch(2);
        Thread a = new Thread(() -> unsafeTransfer(FIRST, SECOND, ready), "unsafe-A");
        Thread b = new Thread(() -> unsafeTransfer(SECOND, FIRST, ready), "unsafe-B");
        a.setDaemon(true);
        b.setDaemon(true);
        a.start();
        b.start();
        Thread.sleep(200);
        System.out.println("Opposite lock order deadlock observed: "
            + (a.isAlive() && b.isAlive()));

        Object accountA = new Object();
        Object accountB = new Object();
        Thread safeA = new Thread(() -> safeTransfer(accountA, accountB));
        Thread safeB = new Thread(() -> safeTransfer(accountB, accountA));
        safeA.start();
        safeB.start();
        safeA.join();
        safeB.join();
    }
}
