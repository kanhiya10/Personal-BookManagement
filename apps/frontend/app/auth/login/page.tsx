"use client";

import React from "react";
import Input from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    loginSchema
}
from '../../../../../packages/shared/src/validations/loginSchema';
type LoginFormData = z.infer<typeof loginSchema>;



export default function AuthPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
    });

  return (
      <div className="w-full max-w-md rounded-xl bg-white shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Login to continue
        </p>

        <form className="space-y-5">
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

          <div>
            <label className="block text-sm mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="********"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>

            <button
              type="button"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-gray-300" />
          <span className="mx-3 text-gray-500 text-sm">OR</span>
          <div className="h-px flex-1 bg-gray-300" />
        </div>

        <button className="w-full border rounded-lg py-3 font-medium hover:bg-gray-100 transition">
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button className="text-blue-600 font-semibold hover:underline">
            Sign Up
          </button>
        </p>
      </div>
  );
}