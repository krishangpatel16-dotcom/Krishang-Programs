package minibank.util;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import minibank.model.annotation.MaxLength;
import minibank.model.annotation.Positive;

public final class AnnotationValidator {
    private AnnotationValidator() { }

    public static String[] validate(Object object) {
        List<String> errors = new ArrayList<>();
        for (Class<?> type = object.getClass(); type != null; type = type.getSuperclass()) {
            for (Field field : type.getDeclaredFields()) {
                try {
                    field.setAccessible(true);
                    Object value = field.get(object);
                    Positive positive = field.getAnnotation(Positive.class);
                    if (positive != null && value instanceof Number number
                            && number.longValue() <= 0) {
                        errors.add(field.getName() + " " + positive.message());
                    }
                    MaxLength maxLength = field.getAnnotation(MaxLength.class);
                    if (maxLength != null && value instanceof String text
                            && text.length() > maxLength.value()) {
                        errors.add(field.getName() + " exceeds " + maxLength.value() + " characters");
                    }
                } catch (IllegalAccessException exception) {
                    throw new IllegalStateException("Unable to validate " + field.getName(), exception);
                }
            }
        }
        return errors.toArray(String[]::new);
    }
}
