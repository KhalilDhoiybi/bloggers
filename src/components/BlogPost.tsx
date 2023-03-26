import { TrashIcon } from "@heroicons/react/24/solid";
import type { Blog, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";

interface BlogProps {
  blog: Blog;
  user: User;
}

const BlogPost: FC<BlogProps> = ({ blog, user }) => {
  const { data: session } = useSession();

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
        <div className="flex items-center gap-4">
          <p className="py-2 text-slate-400">
            Posted At: {blog.createdAt.toLocaleString()}
          </p>
          {session?.user.id === user.id && (
            <button>
              <TrashIcon className="h-5 w-5 text-slate-400 hover:text-slate-200" />
            </button>
          )}
        </div>
      </div>
      <div className="space-y-6 px-8 py-6">
        <h1 className="text-center text-2xl font-bold">{blog.title}</h1>
        <p className="text-lg">{blog.text}</p>
      </div>
    </div>
  );
};

export default BlogPost;
