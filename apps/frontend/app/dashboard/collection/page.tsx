"use client";

import React, { useEffect, useState } from "react";
import BookForm from "@/components/bookForm";
import BookFilters from "@/components/bookFilter";
import BookList from "@/components/bookList";
import BookModal from "@/components/modal";
import { getBooks } from "@/service/book";

export default function CollectionPage() {
    const [filters, setFilters] = useState({
        status: "",
        tag: "",
    });

    const [books, setBooks] = useState([]);
    const [isAddBookOpen, setIsAddBookOpen] = useState(false);

    const fetchBooks = async () => {
        try {
            const res = await getBooks(filters);
            setBooks(res.data.books);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [filters]);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">My Collection</h1>
                    <p className="text-gray-500">
                        Organize and manage your books.
                    </p>
                </div>

                <button
                    onClick={() => setIsAddBookOpen(true)}
                    className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                >
                    + Add Book
                </button>
            </div>

            {/* Filters */}
            <div className="rounded-2xl bg-white p-6 shadow">
                <BookFilters
                    filters={filters}
                    setFilters={setFilters}
                />
            </div>

            {/* Book List */}
            <div className="rounded-2xl bg-white p-6 shadow">
                <BookList books={books} />
            </div>

            {/* Add Book Modal */}
            {isAddBookOpen && (
                <BookModal
                    onClose={() => setIsAddBookOpen(false)}
                >
                    <BookForm
                        onSuccess={() => {
                            setIsAddBookOpen(false);
                            fetchBooks();
                        }} 
                        onCancel={() => setIsAddBookOpen(false)}
                        />
                </BookModal>
            )}
        </div>
    );
}