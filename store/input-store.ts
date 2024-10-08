import { create } from 'zustand';

interface InputEntry {
  index: number;
  label: string;
  formattedTime: string;
}

interface InputState {
  entries: InputEntry[];
  addEntry: (label: string, formattedTime: string) => void;
  resetEntries: () => void;
}

export const useInputStore = create<InputState>((set) => ({
  entries: [],
  addEntry: (label, formattedTime) =>
    set((state) => ({
      entries: [...state.entries, { index: state.entries.length, label, formattedTime }]
    })),
  resetEntries: () => set({ entries: [] })
}));
