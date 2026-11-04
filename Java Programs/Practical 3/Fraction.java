import java.util.Objects;

public final class Fraction {
    private final int num;
    private final int den;

    public Fraction(int numerator, int denominator) {
        if (denominator == 0) throw new IllegalArgumentException("Denominator cannot be zero.");
        int sign = denominator < 0 ? -1 : 1;
        int gcd = gcd(Math.abs(numerator), Math.abs(denominator));
        num = sign * numerator / gcd;
        den = Math.abs(denominator) / gcd;
    }

    private static int gcd(int a, int b) {
        while (b != 0) {
            int remainder = a % b;
            a = b;
            b = remainder;
        }
        return a == 0 ? 1 : a;
    }

    @Override
    public String toString() {
        return num + "/" + den;
    }

    @Override
    public boolean equals(Object other) {
        return this == other || other instanceof Fraction fraction
            && num == fraction.num && den == fraction.den;
    }

    @Override
    public int hashCode() {
        return Objects.hash(num, den);
    }
}
