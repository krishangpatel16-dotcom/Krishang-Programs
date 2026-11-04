package minibank.repository;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import minibank.model.annotation.Id;

public final class Repository<T> {
    private final Map<String, T> entities = new HashMap<>();

    public synchronized T save(T entity) {
        entities.put(readId(entity), entity);
        return entity;
    }

    @SafeVarargs
    public final synchronized void saveAll(T... items) {
        for (T item : items) save(item);
    }

    public synchronized T findById(String id) { return entities.get(id); }
    public synchronized ArrayList<T> findAll() { return new ArrayList<>(entities.values()); }
    public synchronized boolean delete(String id) { return entities.remove(id) != null; }
    public synchronized int count() { return entities.size(); }

    private String readId(T entity) {
        if (entity == null) throw new IllegalArgumentException("Entity cannot be null.");
        for (Class<?> type = entity.getClass(); type != null; type = type.getSuperclass()) {
            for (Field field : type.getDeclaredFields()) {
                if (field.isAnnotationPresent(Id.class)) {
                    try {
                        field.setAccessible(true);
                        Object id = field.get(entity);
                        if (id == null || id.toString().isBlank()) {
                            throw new IllegalArgumentException("@Id field cannot be empty.");
                        }
                        return id.toString();
                    } catch (IllegalAccessException exception) {
                        throw new IllegalStateException("Unable to read the @Id field.", exception);
                    }
                }
            }
        }
        throw new IllegalArgumentException("Entity type has no field annotated with @Id.");
    }

    public static <N extends Number> double average(N[] values) {
        if (values.length == 0) throw new IllegalArgumentException("Values cannot be empty.");
        double sum = 0;
        for (N value : values) sum += value.doubleValue();
        return sum / values.length;
    }
}
