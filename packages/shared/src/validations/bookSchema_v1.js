import { bookSchema } from "@repo/shared";
import { z } from "zod";

export const createBookSchema = bookSchema.extend({
  coverImage: z.any().optional(),
});
