import { createBlogInputSchema } from "~/validations/blogInputs/createBlogInput.schema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const blogsRouter = createTRPCRouter({
  getBlogs: publicProcedure.query(async ({ ctx }) => {
    const blogs = await ctx.prisma.blog.findMany({
      include: {
        user: true,
      },
    });
    return { blogs };
  }),
  createBlog: protectedProcedure
    .input(createBlogInputSchema)
    .mutation(async ({ ctx, input }) => {
      const { title, text } = input;
      const { id } = ctx.session.user;
      const blog = await ctx.prisma.blog.create({
        data: {
          title,
          text,
          user: {
            connect: {
              id,
            },
          },
        },
      });
      return {
        blog,
      };
    }),
});
