import { userIdInputSchema } from "~/validations/userInputs";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getUserById: publicProcedure
    .input(userIdInputSchema)
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const user = await ctx.prisma.user.findFirst({
        include: {
          blogs: true,
        },
        where: {
          id: id,
        },
      });
      return {
        user,
      };
    }),
});
