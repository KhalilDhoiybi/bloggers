import { z } from "zod";

export const deleteBlogInputSchema = z.object({
  id: z
    .string({
      required_error: "Blog id is required!",
    })
    .cuid(),
});
