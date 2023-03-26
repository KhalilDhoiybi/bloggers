import { CalendarDaysIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import Image from "next/image";
import type { FC } from "react";
import Container from "~/layouts/Container";
import type { RouterOutputs } from "~/utils/api";
import BlogPost from "../BlogPost";

interface UserProfileProps {
  user: RouterOutputs["userRouter"]["getUserById"]["user"];
}

const UserProfile: FC<UserProfileProps> = ({ user }) => {
  return (
    <>
      <Head>
        <title>{user?.name}</title>
      </Head>
      <Container>
        <div className="h-40 w-full  bg-slate-700">
          <Image
            className="relative left-24 -bottom-20 rounded-full border-4 border-slate-400"
            src={user?.image || ""}
            width={150}
            height={150}
            alt={user?.name || ""}
          />
        </div>
        <div className="rounded-b-lg border-2 border-slate-700 px-24 pt-24 pb-8">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-3xl font-bold">{user?.name}</p>
              <div className="flex items-center space-x-2 text-slate-400">
                <CalendarDaysIcon className="h-4 w-4" />
                <p>Joined @ {user?.createdAt.toLocaleDateString() || ""}</p>
              </div>
              <p className="mt-2 font-semibold text-slate-300">
                <span className="text-white">{user?.blogs.length}</span> Blogs
              </p>
            </div>
            <div className="flex items-center space-x-2 text-slate-400">
              <EnvelopeIcon className="h-4 w-4" />
              <p>{user?.email}</p>
            </div>
          </div>
        </div>
        <div className="space-y-4 py-4">
          {user?.blogs.map((blog) => (
            <BlogPost key={blog.id} blog={blog} user={user} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default UserProfile;
