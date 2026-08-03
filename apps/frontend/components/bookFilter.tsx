"use client";

import React, { useState } from "react";

type Filters = {
  status: string;
  tag: string;
};

type BookFiltersProps = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

const BookFilters = ({ filters, setFilters }: BookFiltersProps) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const applyFilters = () => {
    setFilters(localFilters);
  };

  const clearFilters = () => {
    const cleared = {
      status: "",
      tag: "",
    };

    setLocalFilters(cleared);
    setFilters(cleared);
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <label className="mb-2 block text-sm font-medium">
          Reading Status
        </label>

        <select
          value={localFilters.status}
          onChange={(e) =>
            setLocalFilters((prev) => ({
              ...prev,
              status: e.target.value,
            }))
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        >
          <option value="">All</option>
          <option value="Read">Read</option>
          <option value="Reading">Reading</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Tag
        </label>

        <input
          type="text"
          value={localFilters.tag}
          onChange={(e) =>
            setLocalFilters((prev) => ({
              ...prev,
              tag: e.target.value,
            }))
          }
          placeholder="Search by tag..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={applyFilters}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Apply Filters
        </button>

        <button
          onClick={clearFilters}
          className="rounded-lg border border-gray-300 px-5 py-2 hover:bg-gray-100"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default BookFilters;