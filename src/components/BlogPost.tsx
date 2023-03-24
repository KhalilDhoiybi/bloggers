import type { Blog, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";

interface BlogProps {
  blog: Blog;
  user: User;
}

const BlogPost: FC<BlogProps> = ({ blog, user }) => {
  return (
    <div className="rounded-lg border border-slate-500">
      <div className="flex items-center justify-between border-b border-slate-500 px-8 py-5">
        <div className="flex items-center space-x-2">
          <Image
            className="rounded-full"
            src={user.image || ""}
            alt={user.name || ""}
            width={50}
            height={50}
          />
          <Link className="hover:underline" href={`/profile/${user.id}`}>
            @{user.name}
          </Link>
        </div>
        <p className="px-8 py-2 text-slate-400">
          Posted At: {blog.createdAt.toLocaleString()}
        </p>
      </div>
      <div className="space-y-6 px-8 py-6">
        <h1 className="text-center text-2xl font-bold">{blog.title}</h1>
        <p className="text-lg">{blog.text}</p>
      </div>
    </div>
  );
};

export default BlogPost;
