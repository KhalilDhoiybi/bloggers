import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";

const CreateBlog = () => {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center space-y-2 p-4 text-sm text-slate-400">
        <InformationCircleIcon className="h-7 w-7" />
        <p>You have to sign in in order to create your own blog.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-md bg-[#334155b0] py-8">
      <form>
        <div className="m-auto flex w-2/3 flex-col items-end space-y-4">
          <input
            className="w-full rounded-md bg-slate-900 py-2 px-4"
            type="text"
            placeholder="Title"
          />
          <textarea
            className="h-32 w-full resize-none rounded-md bg-slate-900 py-2 px-4"
            placeholder="Text..."
          />
          <button className=" w-fit rounded-md border border-white px-4 py-1 hover:bg-white hover:text-[#1E293B]">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
