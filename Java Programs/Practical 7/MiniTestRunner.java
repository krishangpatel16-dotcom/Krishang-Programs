import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@interface Run { }

final class SampleTests {
    @Run void addition() { if (2 + 2 != 4) throw new AssertionError("addition"); }
    @Run void text() { if (!"java".toUpperCase().equals("JAVA")) throw new AssertionError("text"); }
    void ignored() { throw new AssertionError("unmarked method ran"); }
}

public class MiniTestRunner {
    public static void main(String[] args) throws ReflectiveOperationException {
        Object target = new SampleTests();
        int count = 0;
        for (Method method : target.getClass().getDeclaredMethods()) {
            if (method.isAnnotationPresent(Run.class)) {
                try {
                    method.invoke(target);
                    count++;
                    System.out.println("PASS: " + method.getName());
                } catch (InvocationTargetException exception) {
                    throw new AssertionError("Test failed: " + method.getName(),
                        exception.getCause());
                }
            }
        }
        System.out.println("Tests run: " + count);
    }
}
