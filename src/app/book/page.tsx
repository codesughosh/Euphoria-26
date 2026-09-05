import AuthGuard from "@/components/AuthGuard";
import BookForm from "@/components/BookForm";
import LaunchGate from "@/components/LaunchGate";

export default function BookPage() {
  return (
    <LaunchGate message="Booking isn't open yet. Check back when the countdown ends.">
      <AuthGuard>
        <BookForm />
      </AuthGuard>
    </LaunchGate>
  );
}
