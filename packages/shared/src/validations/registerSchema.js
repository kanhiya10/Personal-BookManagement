import { z } from "zod";

export const registerSchema = z
    .object({
        fullName: z
            .string()
            .min(3, "Name must be at least 3 characters"),

        email: z
            .email("Please enter a valid email"),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, {
                message: "Password must contain at least one uppercase letter",
            })
            .regex(/[a-z]/, {
                message: "Password must contain at least one lowercase letter",
            })
            .regex(/[0-9]/, {
                message: "Password must contain at least one number",
            })
            .regex(/[!@#$%^&*(),.?":{}|<>]/, {
                message: "Password must contain at least one special character",
            }),

        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
