import { create } from 'zustand';

interface TimerState {
  generalStartTime: number | null;
  generalEndTime: number | null;
  splitTimers: { [key: number]: { start: number; end: number | null } };
  startGeneralTimer: () => void;
  stopGeneralTimer: () => void;
  startSplitTimer: (index: number) => void;
  stopSplitTimer: (index: number) => void;
  resetTimers: () => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  generalStartTime: null,
  generalEndTime: null,
  splitTimers: {},
  startGeneralTimer: () => set({ generalStartTime: Date.now(), generalEndTime: null }),
  stopGeneralTimer: () => set({ generalEndTime: Date.now() }),
  startSplitTimer: (index) =>
    set((state) => ({
      splitTimers: {
        ...state.splitTimers,
        [index]: { start: Date.now(), end: null }
      }
    })),
  stopSplitTimer: (index) =>
    set((state) => ({
      splitTimers: {
        ...state.splitTimers,
        [index]: { ...state.splitTimers[index], end: Date.now() }
      }
    })),
  resetTimers: () => set({ generalStartTime: null, generalEndTime: null, splitTimers: {} })
}));
