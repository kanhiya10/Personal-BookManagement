import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("Invalid email"),
    username: z
        .string()
        .trim()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username cannot exceed 20 characters")
        .regex(
            /^[a-zA-Z0-9_]+$/,
            "Username can only contain letters, numbers, and underscores"
        ),
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
});

