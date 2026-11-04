public class CardDemo {
    public static void main(String[] args) {
        Card[] cards = {new Card("King", "Hearts"), new Card("Ace", "Spades"),
            new Card("Ace", "Spades"), new Card("Queen", "Clubs")};
        Card[] seen = new Card[cards.length];
        int count = 0;
        for (Card card : cards) {
            boolean duplicate = false;
            for (int i = 0; i < count; i++) {
                if (card.equals(seen[i])) {
                    duplicate = true;
                    System.out.println("Duplicate found: " + card);
                    break;
                }
            }
            if (!duplicate) seen[count++] = card;
        }
    }
}
