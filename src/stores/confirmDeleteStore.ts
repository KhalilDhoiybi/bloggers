import { create } from "zustand";

interface DeleteConfirmState {
  deleteConfirm: boolean;
  onOpen: () => void;
  onClose: () => void;
  onDelete: (callback: () => Promise<void>) => Promise<void>;
}

export const userConfirmDeleteStore = create<DeleteConfirmState>()((set) => ({
  deleteConfirm: false,
  onOpen: () => set({ deleteConfirm: true }),
  onClose: () => set({ deleteConfirm: false }),
  onDelete: async (callback) => {
    await callback();
    set({ deleteConfirm: false });
  },
}));
