import BookCard from "./bookCard";
import { updateBookStatus } from "@/service/book";

type Book = {
    _id: string;
    title: string;
    author: string;
    status: "Read" | "Reading" | "Completed";
    coverImage: string;
};

type Props = {
    books: Book[];
};

export default function BookGrid({ books }: Props) {

    const handleStatusChange = async (
        id: string,
        status: Book["status"]
    ) => {
        await updateBookStatus(id, status);

    };
    if (books.length === 0) {
        return (
            <div className="rounded-xl border border-dashed bg-white p-12 text-center">
                <h2 className="text-xl font-semibold">
                    No books in your collection
                </h2>

                <p className="mt-2 text-gray-500">
                    Add your first book to get started 📚
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {books.map((book) => (
                <BookCard
                    key={book._id}
                    book={book}
                    onStatusChange={handleStatusChange}
                />
            ))}
        </div>
    );
}