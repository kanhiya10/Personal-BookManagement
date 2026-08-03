import React from "react";
import { deleteBook } from "@/service/book";
import StatusDropdown from "./statusDropdown";
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

const statusStyles = {
    Read: "bg-yellow-100 text-yellow-700",
    Reading: "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
};

const BookList = ({ books }: Props) => {

    const handleDelete = async (id: any) => {
        await deleteBook(id);
        
    }

    const handleStatusChange = async (
        id: string,
        status: Book["status"]
    ) => {
        await updateBookStatus(id, status);

    };
    if (books.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                    No books found 📚
                </h2>
                <p className="mt-2 text-gray-500">
                    Add a new book or change your filters.
                </p>
            </div>
        );
    }


    return (
        <div className="space-y-5">
            {books.map((book) => (
                <div
                    key={book._id}
                    className="flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-lg"
                >
                    {/* Cover */}
                    <img
                        src={book.coverImage}
                        alt={book.title}
                        className="h-28 w-20 rounded-lg object-cover"
                    />

                    {/* Details */}
                    <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900">
                            {book.title}
                        </h3>

                        <p className="mt-1 text-gray-500">
                            {book.author}
                        </p>

                        <span
                            className={`mt-3 inline-flex rounded-full px-3 py-1 text-sm font-medium ${statusStyles[book.status]}`}
                        >
                            {book.status}
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3" >
                        <StatusDropdown
                            value={book.status}
                            onChange={(status) => handleStatusChange(book._id, status)}
                        />

                        <button className="rounded-lg border border-red-300 px-5 py-2 text-red-600 transition hover:bg-red-50" onClick={() => handleDelete(book._id)}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BookList;