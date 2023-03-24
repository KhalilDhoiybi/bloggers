import { createTRPCRouter } from "~/server/api/trpc";
import { blogsRouter } from "./routers/blogs";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  blogsRouter,
  userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
