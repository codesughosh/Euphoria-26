import AuthGuard from "@/components/AuthGuard";
import BookForm from "@/components/BookForm";

export default function BookPage() {
  return (
    <AuthGuard>
      <BookForm />
    </AuthGuard>
  );
}
