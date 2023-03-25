import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBlogInputSchema } from "~/validations/blogInputs/createBlogInput.schema";
import { api, type RouterInputs } from "~/utils/api";
import { useState } from "react";

const CreateBlog = () => {
  type FormData = RouterInputs["blogsRouter"]["createBlog"];
  const [errorMsg, SetErrorMsg] = useState<boolean>(false);
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(createBlogInputSchema),
  });
  const ctx = api.useContext();
  const createBlogMutation = api.blogsRouter.createBlog.useMutation({
    onSuccess: () => {
      reset();
      void ctx.blogsRouter.getBlogs.invalidate();
    },
    onError: () => {
      SetErrorMsg(true);
    },
  });

  const onSubmit = (data: FormData) => {
    createBlogMutation.mutate(data);
  };

  if (!session) {
    return null;
  }

  return (
    <>
      <div className="space-y-4 rounded-md bg-slate-700 bg-opacity-70 py-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="m-auto flex w-2/3 flex-col items-end space-y-1 pt-3">
            <div className="w-full">
              {errors.title?.message ? (
                <p className="p-1">{errors.title?.message}</p>
              ) : !errorMsg ? (
                <p className="p-4"></p>
              ) : (
                <p className="p-1">Failed to post! Please try again later.</p>
              )}
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
              {errors.text?.message ? (
                <p className="p-1">{errors.text?.message}</p>
              ) : (
                <p className="p-4"></p>
              )}
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
      <hr className="border-slate-300" />
    </>
  );
};

export default CreateBlog;
