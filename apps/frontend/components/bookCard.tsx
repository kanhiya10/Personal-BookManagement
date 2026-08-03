import React from "react";
import StatusDropdown from "./statusDropdown";

type Book = {
  _id: string;
  title: string;
  author: string;
  status: "Read" | "Reading" | "Completed";
  coverImage: string;
};

type Props = {
  book: Book;
  onStatusChange: (
    id: string,
    status: Book["status"]
  ) => void;
};

const statusStyles = {
  Read: "bg-yellow-100 text-yellow-700",
  Reading: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
};

export default function BookCard({ book,onStatusChange }: Props) {
  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        bg-white
        shadow-md
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-xl
      "
    >
      {/* Cover Image */}
      <div className="aspect-[2/3] overflow-hidden bg-gray-100">
        <img
          src={book.coverImage}
          alt={book.title}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-300
            hover:scale-105
          "
        />
      </div>

      {/* Book Details */}
      <div className="space-y-2 p-4">
        <h3 className="truncate text-lg font-semibold text-gray-900">
          {book.title}
        </h3>

        <p className="truncate text-sm text-gray-500">
          {book.author}
        </p>

        <span
          className={`
            inline-flex
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            ${statusStyles[book.status]}
          `}
        >
          {book.status}
        </span>
        <StatusDropdown
  value={book.status}
  onChange={(status) => onStatusChange(book._id, status)}
/>
      </div>
    </div>
  );
}