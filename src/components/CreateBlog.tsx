import {
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBlogInputSchema } from "~/validations/blogInputs/createBlogInput.schema";

const CreateBlog = () => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createBlogInputSchema),
  });

  if (!session) {
    return (
      <div className="flex flex-col items-center space-y-2 p-4 text-sm text-slate-400">
        <InformationCircleIcon className="h-7 w-7" />
        <p>You have to sign in in order to create your own blog.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-md bg-slate-700 bg-opacity-70 py-8">
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <div className="m-auto flex w-2/3 flex-col items-end space-y-1 pt-3">
          <div className="w-full">
            <p className="p-2">{errors.title?.message as string}</p>
            <div className="relative">
              {errors.title && (
                <div className="absolute top-1/2 right-4 flex -translate-y-1/2 transform  text-slate-300">
                  <ExclamationCircleIcon className="-mb-1 h-4 w-4" />
                </div>
              )}
              <input
                className="h-12 w-full rounded-md bg-slate-900 px-4"
                type="text"
                placeholder="Title"
                {...register("title")}
              />
            </div>
            <p className="p-2">{errors.text?.message as string}</p>
            <div className="relative">
              {errors.text?.message && (
                <div className="absolute top-4 right-4 text-slate-300">
                  <ExclamationCircleIcon className="-mb-1 h-4 w-4" />
                </div>
              )}
              <textarea
                className="h-32 w-full resize-none rounded-md bg-slate-900 py-2 px-4"
                placeholder="Text..."
                {...register("text")}
              />
            </div>
          </div>
          <div className="py-1"></div>
          <button
            type="submit"
            className=" w-fit rounded-md border border-white px-4 py-1 hover:bg-white hover:text-[#1E293B]"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
