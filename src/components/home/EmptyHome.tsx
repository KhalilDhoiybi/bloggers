import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";

const EmptyHome = () => {
  const { data: session } = useSession();

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-2 py-10 text-2xl text-slate-400">
      <InformationCircleIcon className="h-16 w-16" />
      {!session ? (
        <p>
          There{"'"}s no blog posts at the moment sign in to create a new one!{" "}
        </p>
      ) : (
        <p>
          There{"'"}s no blog posts at the moment you can create a new one at
          the form above!
        </p>
      )}
    </div>
  );
};

export default EmptyHome;
