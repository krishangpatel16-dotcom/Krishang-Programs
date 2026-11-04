import java.util.List;

public class GenericContainers {
    private record Pair<A, B>(A first, B second) { }

    private static final class Box<T> {
        private T value;
        T get() { return value; }
        void set(T value) { this.value = value; }
    }

    private static <T> T first(T[] values) {
        if (values.length == 0) throw new IllegalArgumentException("Array is empty.");
        return values[0];
    }

    public static void main(String[] args) {
        Box<String> text = new Box<>();
        text.set("Java");
        Pair<Integer, String> pair = new Pair<>(7, "days");
        System.out.println(text.get());
        System.out.println(pair);
        System.out.println("First item: " + first(new String[]{"type-safe", "code"}));
        List<Integer> values = List.of(1, 2, 3);
        System.out.println(values);
    }
}
