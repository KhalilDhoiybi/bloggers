import { z } from "zod";

export const userIdInputSchema = z.object({
  id: z
    .string({
      required_error: "User id is required!",
    })
    .cuid(),
});
