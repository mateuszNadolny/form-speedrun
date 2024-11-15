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
  getSplitTime: (index: number) => number;
}

export const useTimerStore = create<TimerState>((set, get) => ({
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
    set((state) => {
      const currentTimer = state.splitTimers[index];
      if (!currentTimer) return state;

      return {
        splitTimers: {
          ...state.splitTimers,
          [index]: {
            ...currentTimer,
            end: Date.now()
          }
        }
      };
    }),
  resetTimers: () => set({ generalStartTime: null, generalEndTime: null, splitTimers: {} }),
  getSplitTime: (index) => {
    const timer = get().splitTimers[index];
    if (!timer || timer.end === null) return 0;
    return timer.end - timer.start;
  }
}));
