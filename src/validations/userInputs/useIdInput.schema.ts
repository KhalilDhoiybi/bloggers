import { z } from "zod";

export const userIdInputSchema = z.object({
  id: z.string(),
});
