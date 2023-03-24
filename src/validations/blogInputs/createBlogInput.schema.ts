import { z } from "zod";

export const createBlogInputSchema = z.object({
  title: z
    .string({
      required_error: "Blog title is required!",
    })
    .min(3)
    .max(20),
  text: z
    .string({
      required_error: "Blog text is required!",
    })
    .min(3),
});
