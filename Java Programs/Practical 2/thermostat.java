class Thermostat {
    private String location;
    private int temperature;
    private static final int MIN = 16;
    private static final int MAX = 30;
    private static int activeCount = 0;

    Thermostat(String location, int startTemp) {
        this.location = location;
        if (startTemp >= MIN && startTemp <= MAX) {
            this.temperature = startTemp;
        } else {
            this.temperature = 22;
        }
        activeCount++;
    }

    Thermostat(String location) {
        this(location, 22);
    }

    void raise() {
        if (temperature < MAX) {
            temperature++;
        } else {
            System.out.println("Already at maximum (30)");
        }
    }

    void lower() {
        if (temperature > MIN) {
            temperature--;
        } else {
            System.out.println("Already at minimum (16)");
        }
    }

    int getTemperature() {
        return temperature;
    }

    static int getActiveCount() {
        return activeCount;
    }
}

public class thermostat {
    public static void main(String[] args) {
        Thermostat t1 = new Thermostat("Living Room");
        Thermostat t2 = new Thermostat("Bedroom", 24);

        for (int i = 0; i < 10; i++) {
            t1.raise();
            System.out.println(t1.getTemperature());
        }

        for (int i = 0; i < 20; i++) {
            t1.lower();
            System.out.println(t1.getTemperature());
        }

        System.out.println(Thermostat.getActiveCount());
    }
}
