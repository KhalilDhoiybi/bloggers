import { createTRPCRouter, publicProcedure } from "../trpc";

export const blogsRouter = createTRPCRouter({
  getBlogs: publicProcedure.query(async ({ ctx }) => {
    const blogs = await ctx.prisma.blog.findMany({
      include: {
        user: true,
      },
    });
    return { blogs };
  }),
});
