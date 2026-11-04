interface Switchable {
    void on();
    void off();

    default void toggle() {
        off();
        on();
    }
}

public class RemoteControlDemo {
    private static final class Fan implements Switchable {
        @Override public void on() { System.out.println("Fan on"); }
        @Override public void off() { System.out.println("Fan off"); }
    }

    private static final class Light implements Switchable {
        @Override public void on() { System.out.println("Light on"); }
        @Override public void off() { System.out.println("Light off"); }
    }

    @FunctionalInterface
    private interface SwitchPolicy {
        boolean maySwitchOn(String device, int hour);
    }

    public static void main(String[] args) {
        Switchable[] devices = {new Fan(), new Light()};
        for (Switchable device : devices) device.toggle();

        SwitchPolicy anonymousPolicy = new SwitchPolicy() {
            @Override
            public boolean maySwitchOn(String device, int hour) {
                return hour >= 7 && hour < 22;
            }
        };
        SwitchPolicy lambdaPolicy = (device, hour) -> hour >= 7 && hour < 22;
        System.out.println("Anonymous policy at 20: "
            + anonymousPolicy.maySwitchOn("Fan", 20));
        System.out.println("Lambda policy at 6: " + lambdaPolicy.maySwitchOn("Light", 6));
    }
}
