"use client";

import React from "react";
import Input from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    registerSchema
}
from '@repo/shared';
type RegisterFormData = z.infer<typeof registerSchema>;


export default function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
    });

    const onSubmit = (data: RegisterFormData) => {
        console.log(data);
    };

    return (
        <div className="w-full max-w-md rounded-xl bg-white shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center mb-2">
                Create Account
            </h1>

            <p className="text-gray-500 text-center mb-8">
                Join us and start your journey
            </p>

            <form className="space-y-5">
                <Input
                    label="Full Name"
                    type="text"
                    placeholder="John Doe"
                    {...register("fullName")}
                    error={errors.fullName?.message}
                    helperText="Must be at least 3 characters."
                />
                <Input
                    label="Email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("email")}
                    error={errors.email?.message}
                    helperText="Enter a valid email address (e.g. john@example.com)."

                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="********"
                    {...register("password")}
                    error={errors.password?.message}
                    helperText="Must be at least 8 characters and include an uppercase letter, lowercase letter, number, and special character."
                />
                <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="********"
                    {...register("confirmPassword")}
                    error={errors.confirmPassword?.message}
                />
                <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition"
                    onClick={handleSubmit(onSubmit)}
                >
                    Create Account
                </button>
            </form>

            <div className="my-6 flex items-center">
                <div className="flex-1 border-t border-gray-300" />
                <span className="mx-3 text-sm text-gray-500">OR</span>
                <div className="flex-1 border-t border-gray-300" />
            </div>

            <button
                type="button"
                className="w-full rounded-lg border border-gray-300 py-3 font-medium hover:bg-gray-100 transition"
            >
                Continue with Google
            </button>

            <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <button
                    type="button"
                    className="text-blue-600 font-semibold hover:underline"
                >
                    Login
                </button>
            </p>
        </div>
    );
}