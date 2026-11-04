import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.CountDownLatch;

public class SeatBookingRace {
    private static final class BookingOffice {
        private int seatsLeft = 5;
        private int booked;

        boolean bookWithoutSynchronization(CountDownLatch checked, CountDownLatch release)
                throws InterruptedException {
            if (seatsLeft == 0) return false;
            checked.countDown();
            release.await();
            seatsLeft--;
            booked++;
            return true;
        }

        synchronized boolean book() {
            if (seatsLeft == 0) return false;
            seatsLeft--;
            booked++;
            return true;
        }

        synchronized int booked() { return booked; }
    }

    public static void main(String[] args) throws InterruptedException {
        int customersCount = 10;
        BookingOffice unsafeOffice = new BookingOffice();
        AtomicInteger unsafeBookings = new AtomicInteger();
        CountDownLatch checked = new CountDownLatch(customersCount);
        CountDownLatch release = new CountDownLatch(1);
        Thread[] customers = new Thread[customersCount];
        for (int i = 0; i < customers.length; i++) {
            customers[i] = new Thread(() -> {
                try {
                    if (unsafeOffice.bookWithoutSynchronization(checked, release)) {
                        unsafeBookings.incrementAndGet();
                    }
                } catch (InterruptedException exception) {
                    Thread.currentThread().interrupt();
                }
            }, "unsafe-customer-" + i);
            customers[i].start();
        }
        checked.await();
        release.countDown();
        for (Thread customer : customers) customer.join();
        System.out.println("Unsynchronized bookings: " + unsafeBookings.get());

        BookingOffice safeOffice = new BookingOffice();
        AtomicInteger safeBookings = new AtomicInteger();
        for (int i = 0; i < customersCount; i++) {
            customers[i] = new Thread(() -> {
                if (safeOffice.book()) safeBookings.incrementAndGet();
            }, "safe-customer-" + i);
            customers[i].start();
        }
        for (Thread customer : customers) customer.join();
        System.out.println("Synchronized bookings: " + safeBookings.get());
        System.out.println("Seats booked: " + safeOffice.booked());
    }
}
