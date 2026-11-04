package minibank.model;

import java.io.Serializable;
import java.util.Objects;
import minibank.model.annotation.Id;
import minibank.model.annotation.MaxLength;

public final class Customer implements Cloneable, Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private final String customerId;
    @MaxLength(60)
    private final String name;
    private final String email;
    private final String mobile;
    private Address address;

    public Customer(String customerId, String name, String email, String mobile) {
        this.customerId = Objects.requireNonNull(customerId);
        this.name = Objects.requireNonNull(name);
        this.email = Objects.requireNonNull(email);
        this.mobile = Objects.requireNonNull(mobile);
    }

    public String getCustomerId() { return customerId; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getMobile() { return mobile; }
    public Address getAddress() { return address; }
    public void setAddress(Address address) { this.address = address; }

    @Override
    public Customer clone() {
        try {
            Customer copy = (Customer) super.clone();
            if (address != null) copy.address = address.clone();
            return copy;
        } catch (CloneNotSupportedException exception) {
            throw new AssertionError(exception);
        }
    }

    public static final class Address implements Serializable, Cloneable {
        private static final long serialVersionUID = 1L;
        private final String line;
        private final String city;
        private final String pincode;

        public Address(String line, String city, String pincode) {
            this.line = Objects.requireNonNull(line);
            this.city = Objects.requireNonNull(city);
            this.pincode = Objects.requireNonNull(pincode);
        }

        public String getLine() { return line; }
        public String getCity() { return city; }
        public String getPincode() { return pincode; }

        @Override public Address clone() {
            try { return (Address) super.clone(); }
            catch (CloneNotSupportedException exception) { throw new AssertionError(exception); }
        }
    }
}
