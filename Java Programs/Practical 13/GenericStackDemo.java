import java.util.ArrayList;
import java.util.EmptyStackException;
import java.util.List;

public class GenericStackDemo {
    private static final class Stack<T> {
        private final List<T> items = new ArrayList<>();
        void push(T item) { items.add(item); }
        T pop() {
            if (items.isEmpty()) throw new EmptyStackException();
            return items.remove(items.size() - 1);
        }
        boolean isEmpty() { return items.isEmpty(); }
    }

    public static void main(String[] args) {
        Stack<String> words = new Stack<>();
        Stack<Integer> numbers = new Stack<>();
        words.push("Java");
        numbers.push(203);
        System.out.println(words.pop());
        System.out.println(numbers.pop());
        System.out.println("Words stack empty: " + words.isEmpty());
    }
}
