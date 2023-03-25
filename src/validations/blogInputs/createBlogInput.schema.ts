import { z } from "zod";

export const createBlogInputSchema = z.object({
  title: z
    .string({
      required_error: "Blog title is required!",
    })
    .min(3, "Blog title must contain at least 3 character(s)")
    .max(20, "Blog title must contain at most 20 character(s)"),
  text: z
    .string({
      required_error: "Blog text is required!",
    })
    .min(3, "Blog text must contain at least 3 character(s)"),
});
