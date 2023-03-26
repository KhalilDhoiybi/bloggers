import type { FC } from "react";
import { userConfirmDeleteStore } from "~/stores/confirmDeleteStore";
import { api } from "~/utils/api";

interface DeleteConfirmationProps {
  id: string;
}

const DeleteConfirmation: FC<DeleteConfirmationProps> = ({ id }) => {
  const ctx = api.useContext();
  const deleteBlogMutation = api.blogsRouter.deleteBlog.useMutation({
    onSuccess: () => ctx.blogsRouter.getBlogs.invalidate(),
  });

  const deleteConfirm = userConfirmDeleteStore((state) => state.deleteConfirm);
  const onCloseConfirmDelete = userConfirmDeleteStore((state) => state.onClose);
  const onDelete = userConfirmDeleteStore((state) => state.onDelete);

  if (!deleteConfirm) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 z-40 flex h-full w-screen items-center justify-center bg-black bg-opacity-30">
      <div className="space-y-12 rounded-md bg-slate-800 py-6 px-8">
        <p className="font-semibold">
          Are you sure you want to delete this blog?
        </p>
        <div className="flex w-full justify-end gap-4">
          <button
            className="w-fit rounded-md border border-white px-4 py-1 hover:bg-white hover:text-[#1E293B]"
            onClick={async () =>
              await onDelete(
                async () => void (await deleteBlogMutation.mutateAsync({ id }))
              )
            }
          >
            Confirm
          </button>
          <button
            className="w-fit rounded-md border border-white px-4 py-1 hover:bg-white hover:text-[#1E293B]"
            onClick={onCloseConfirmDelete}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
