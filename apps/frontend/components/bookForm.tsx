"use client";

import React from 'react';
import Input from "./ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    createBookSchema
}
    from '@repo/shared';
import axios from 'axios';
import { addBook } from '../service/book';
type BookFormData = z.infer<typeof createBookSchema>;
type BookFormProps = {
    onSuccess?: () => void;
    onCancel?: () => void;
};


const BookForm = ({ onSuccess, onCancel }: BookFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BookFormData>({
        resolver: zodResolver(createBookSchema),
    });

    const onSubmit = async (data: BookFormData) => {
        try {
            const formData = new FormData();

            formData.append("title", data.title);
            formData.append("author", data.author);
            formData.append("status", data.status);
            formData.append("tags", data.tags);

            if (data.coverImage?.[0]) {
                formData.append("coverImage", data.coverImage[0]);
            }

            await addBook(formData);

            onSuccess?.();
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-2"
            >
                <h2 className="text-2xl font-semibold text-gray-800">
                    Add a New Book
                </h2>

                <Input
                    label="Book Title"
                    placeholder="Atomic Habits"
                    {...register("title")}
                    error={errors.title?.message}
                    className="bg-gray-50"
                />

                <Input
                    label="Author"
                    placeholder="James Clear"
                    {...register("author")}
                    error={errors.author?.message}
                    className="bg-gray-50"
                />

                <Input
                    label="Tags"
                    placeholder="Self Help, Productivity, Habits"
                    helperText="Separate multiple tags using commas."
                    {...register("tags")}
                    error={errors.tags?.message}
                    className="bg-gray-50"
                />

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Reading Status
                    </label>

                    <select
                        {...register("status")}
                        className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Read">Read</option>
                        <option value="Reading">Reading</option>
                        <option value="Completed">Completed</option>
                    </select>

                    {errors.status && (
                        <p className="text-sm text-red-500">
                            {errors.status.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Cover Image
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        {...register("coverImage")}
                        className="
        w-full rounded-xl border border-dashed border-gray-300
        bg-gray-50 p-4
        file:mr-4
        file:rounded-lg
        file:border-0
        file:bg-blue-600
        file:px-4
        file:py-2
        file:text-white
        file:cursor-pointer
        hover:file:bg-blue-700
      "
                    />

                    <p className="mt-2 text-xs text-gray-500">
                        JPG, PNG or WEBP
                    </p>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-lg border px-5 py-2"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="rounded-lg bg-blue-600 px-5 py-2 text-white"
                    >
                        Add Book
                    </button>
                </div>
            </form>
        </div>
    )
};

export default BookForm;