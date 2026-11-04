public class FractionDemo {
    public static void main(String[] args) {
        Fraction half = new Fraction(1, 2);
        Fraction[] equivalent = {new Fraction(1, 2), new Fraction(2, 4), new Fraction(3, 6)};
        for (Fraction fraction : equivalent) {
            System.out.println(fraction + " equals 1/2: " + fraction.equals(half));
        }
    }
}
