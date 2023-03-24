import type { FC } from "react";
import { FaceFrownIcon } from "@heroicons/react/24/solid";
import Head from "next/head";

const UserProfileNotFound: FC = () => {
  return (
    <>
      <Head>
        <title>Unavailable Profile</title>
      </Head>
      <main className="fixed top-0 left-0 z-10 flex h-screen w-full flex-col items-center justify-center space-y-2 text-2xl text-slate-400">
        <FaceFrownIcon className="h-24 w-24" />
        <p>User profile not available !</p>
      </main>
    </>
  );
};

export default UserProfileNotFound;
