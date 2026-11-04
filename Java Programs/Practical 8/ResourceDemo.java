public class ResourceDemo {
    private static final class SampleResource implements AutoCloseable {
        private boolean closed;

        void use() {
            if (closed) throw new IllegalStateException("Resource is already closed.");
            System.out.println("Resource is open.");
        }

        @Override
        public void close() {
            closed = true;
            System.out.println("Resource closed.");
        }
    }

    public static void main(String[] args) {
        try (SampleResource resource = new SampleResource()) {
            resource.use();
            throw new IllegalStateException("Original failure");
        } catch (IllegalStateException exception) {
            System.out.println("Reported: " + exception.getMessage());
        }
    }
}
