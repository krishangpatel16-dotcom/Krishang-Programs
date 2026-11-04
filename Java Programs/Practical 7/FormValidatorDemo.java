import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@interface NotBlank { }

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@interface MaxLength {
    int value();
}

final class SignupForm {
    @NotBlank @MaxLength(30) private final String name;
    @NotBlank @MaxLength(60) private final String email;

    SignupForm(String name, String email) {
        this.name = name;
        this.email = email;
    }
}

public class FormValidatorDemo {
    static List<String> validate(Object object) throws IllegalAccessException {
        List<String> errors = new ArrayList<>();
        for (Field field : object.getClass().getDeclaredFields()) {
            field.setAccessible(true);
            Object value = field.get(object);
            String text = value == null ? "" : value.toString();
            if (field.isAnnotationPresent(NotBlank.class) && text.isBlank()) {
                errors.add(field.getName() + " must not be blank");
            }
            MaxLength maxLength = field.getAnnotation(MaxLength.class);
            if (maxLength != null && text.length() > maxLength.value()) {
                errors.add(field.getName() + " exceeds " + maxLength.value() + " characters");
            }
        }
        return errors;
    }

    public static void main(String[] args) throws IllegalAccessException {
        System.out.println(validate(new SignupForm("", "a".repeat(70))));
        System.out.println(validate(new SignupForm("Riya", "riya@example.com")));
    }
}
