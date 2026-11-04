public class CinemaShow {
	private String title;
	private int seatsAvailable;
	private final int capacity;
	private static int totalBooked = 0;

	public CinemaShow(String title, int capacity) {
		this.title = title;
		this.capacity = capacity;
		this.seatsAvailable = capacity;
	}

	public CinemaShow(String title) {
		this(title, 100);
	}

	public boolean book(int n) {
		if (n <= seatsAvailable) {
			seatsAvailable -= n;
			totalBooked += n;
			return true;
		}
		return false;
	}

	public void cancel(int n) {
		seatsAvailable = Math.min(capacity, seatsAvailable + n);
	}

	public int getSeatsAvailable() {
		return seatsAvailable;
	}

	public static int getTotalBooked() {
		return totalBooked;
	}

	public static void main(String[] args) {
		CinemaShow show = new CinemaShow("Evening Show", 10);

		System.out.println("Show: " + show.title);
		System.out.println("Book 4: " + show.book(4));
		System.out.println("Seats available: " + show.getSeatsAvailable());
		System.out.println("Book 8: " + show.book(8));
		System.out.println("Seats available: " + show.getSeatsAvailable());
		show.cancel(2);
		System.out.println("Cancel 2");
		System.out.println("Seats available: " + show.getSeatsAvailable());
		System.out.println("Book 6: " + show.book(6));
		System.out.println("Seats available: " + show.getSeatsAvailable());
		System.out.println("Total booked: " + getTotalBooked());
	}
}
