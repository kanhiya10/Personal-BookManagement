import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  status: z.enum([
    "Read",
    "Reading",
    "Completed",
  ]),
  tags: z.string(),
});
