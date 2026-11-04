import java.util.Scanner;

public class TollBooth {
    public static void main(String[] args) {
        record Vehicle(int number, String type) {}

        Scanner scanner = new Scanner(System.in);
        int totalToll = 0;
        int bikeCount = 0;
        int carCount = 0;
        int truckCount = 0;

        while (true) {
            System.out.print("Enter vehicle number (or -1 to finish): ");
            int number = scanner.nextInt();
            if (number == -1) {
                break;
            }

            System.out.print("Enter vehicle type: ");
            String type = scanner.nextLine().trim().toLowerCase();

            Vehicle vehicle = new Vehicle(number, type);
            int toll = switch (vehicle.type()) {
                case "bike" -> 20;
                case "car" -> 50;
                case "truck" -> 150;
                default -> {
                    System.out.println("Unknown vehicle type: " + vehicle.type() + ". Toll treated as 0.");
                    yield 0;
                }
            };


            switch (vehicle.type()) {
                case "bike" -> bikeCount+=vehicle.number();
                case "car" -> carCount+=vehicle.number();
                case "truck" -> truckCount+=vehicle.number();
            }
        }

        scanner.close();
        totalToll = (bikeCount * 20) + (carCount * 50) + (truckCount * 150);
        System.out.println("Total toll: " + totalToll);

        String mostFrequent = "none";
        int maxCount = Math.max(bikeCount, Math.max(carCount, truckCount));
        if (maxCount == bikeCount) {
            mostFrequent = "bike";
        }
        if (maxCount == carCount) {
            mostFrequent = "car";
        }
        if (maxCount == truckCount) {
            mostFrequent = "truck";
        }

        System.out.println("Most frequent: " + mostFrequent);
    }
}
