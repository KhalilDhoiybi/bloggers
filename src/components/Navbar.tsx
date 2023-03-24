import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Spinner from "./Spinner";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="fixed z-50 flex w-full items-center justify-between px-64 py-5 backdrop-blur-md">
      <div className="absolute left-0 top-0 -z-10 h-full w-full bg-slate-900 opacity-20"></div>
      {status === "authenticated" && (
        <div className="flex items-center justify-center space-x-6">
          <Image
            className="rounded-full"
            src={session.user.image as string}
            alt={session.user.name as string}
            width={50}
            height={50}
          />
          <Link
            className="font-semibold decoration-2 underline-offset-4 hover:underline"
            href={`/profile/${session.user.id}`}
          >
            Profile
          </Link>
          <button
            className="font-semibold decoration-2 underline-offset-4 hover:underline"
            onClick={() => void signOut()}
          >
            Sign Out
          </button>
        </div>
      )}

      {status === "unauthenticated" && (
        <button
          className="rounded-md border border-white px-4 py-1 hover:bg-white hover:text-[#1E293B]"
          onClick={() => void signIn()}
        >
          Sign In
        </button>
      )}

      {status == "loading" && (
        <div>
          <Spinner />
        </div>
      )}

      <div className="space-x-4 font-semibold decoration-2 underline-offset-4">
        <Link className="hover:underline" href="/">
          Home
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
