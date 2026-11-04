package minibank;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.io.IOException;
import java.nio.file.Path;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import minibank.exception.InsufficientFundsException;
import minibank.model.Account;
import minibank.repository.Repository;
import minibank.service.BankService;
import org.junit.jupiter.api.Test;

class BankServiceTest {
    @Test
    void depositIncreasesBalance() throws Exception {
        BankService bank = bankWithAccount();
        bank.deposit("AC0001", 500);
        assertEquals(1500, bank.find("AC0001").getBalance());
    }

    @Test
    void withdrawalOverAvailableBalanceThrows() throws Exception {
        BankService bank = bankWithAccount();
        assertThrows(InsufficientFundsException.class, () -> bank.withdraw("AC0001", 1500));
    }

    @Test
    void concurrentDepositsKeepBalanceCorrect() throws Exception {
        BankService bank = bankWithAccount();
        int tasks = 100;
        ExecutorService pool = Executors.newFixedThreadPool(8);
        CountDownLatch finished = new CountDownLatch(tasks);
        for (int i = 0; i < tasks; i++) {
            pool.execute(() -> {
                try {
                    bank.deposit("AC0001", 1);
                } catch (Exception exception) {
                    throw new AssertionError(exception);
                } finally {
                    finished.countDown();
                }
            });
        }
        pool.shutdown();
        if (!finished.await(10, TimeUnit.SECONDS)) {
            pool.shutdownNow();
            throw new AssertionError("Concurrent deposits timed out.");
        }
        assertEquals(1100, bank.find("AC0001").getBalance());
    }

    private static BankService bankWithAccount() throws IOException {
        Repository<Account> repository = new Repository<>();
        BankService bank = new BankService(repository, Path.of("target", "test-transactions.log"));
        bank.openAccount("AC0001", "Riya", 1000, 100);
        return bank;
    }
}
