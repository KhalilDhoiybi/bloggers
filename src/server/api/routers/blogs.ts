import { TRPCError } from "@trpc/server";
import { createBlogInputSchema } from "~/validations/blogInputs/createBlogInput.schema";
import { deleteBlogInputSchema } from "~/validations/blogInputs/deleteBlogInput.schema";
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
  deleteBlog: protectedProcedure
    .input(deleteBlogInputSchema)
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const blog = await ctx.prisma.blog.findFirst({
        where: {
          id,
        },
      });
      if (!blog) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      if (blog.userId !== ctx.session.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      return await ctx.prisma.blog.delete({
        where: {
          id,
        },
      });
    }),
});
