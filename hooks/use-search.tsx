import { create } from 'zustand';

type SearchStore = {
  isopen: boolean;
  onopen: () => void;
  onclose: () => void;
  toggle: () => void;
};

export const useSearch = create<SearchStore>((set, get) => ({
  isopen: false,
  onopen: () => set({ isopen: true }),
  onclose: () => set({ isopen: false }),
  toggle: () => set({ isopen:!get().isopen }),
}));