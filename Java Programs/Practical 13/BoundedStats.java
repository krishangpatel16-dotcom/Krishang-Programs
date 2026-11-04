public class BoundedStats {
    public static <N extends Number> double average(N[] values) {
        if (values.length == 0) throw new IllegalArgumentException("Values cannot be empty.");
        double total = 0;
        for (N value : values) total += value.doubleValue();
        return total / values.length;
    }

    public static void main(String[] args) {
        System.out.println(average(new Integer[]{2, 4, 6}));
        System.out.println(average(new Double[]{1.5, 2.5}));
        System.out.println(average(new Long[]{10L, 20L}));
    }
}
