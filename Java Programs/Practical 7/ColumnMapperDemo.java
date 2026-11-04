import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.lang.reflect.Field;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@interface Column {
    String value();
}

final class ImportedUser {
    @Column("name") String name;
    @Column("email") String email;

    @Override public String toString() { return name + " <" + email + ">"; }
}

public class ColumnMapperDemo {
    static ImportedUser map(String[] header, String[] row) throws ReflectiveOperationException {
        if (header.length != row.length) throw new IllegalArgumentException("Column count mismatch.");
        ImportedUser user = new ImportedUser();
        for (Field field : ImportedUser.class.getDeclaredFields()) {
            Column column = field.getAnnotation(Column.class);
            for (int i = 0; i < header.length; i++) {
                if (header[i].equals(column.value())) {
                    field.set(user, row[i]);
                    break;
                }
            }
            if (field.get(user) == null) {
                throw new IllegalArgumentException("Missing column: " + column.value());
            }
        }
        return user;
    }

    public static void main(String[] args) throws ReflectiveOperationException {
        System.out.println(map(new String[]{"email", "name"},
            new String[]{"riya@example.com", "Riya"}));
    }
}
