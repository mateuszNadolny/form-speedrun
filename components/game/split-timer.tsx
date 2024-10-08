'use client';

import { useTimerStore } from '@/store/timer-store';
import { useInputStore } from '@/store/input-store';
import { formatTime } from '@/lib/time';

const SplitTimer = () => {
  const { splitTimers } = useTimerStore();
  const { entries } = useInputStore();

  return (
    <div className="mt-4">
      <h2 className="text-xl text-color-light mb-2">Split Times:</h2>
      {Object.entries(splitTimers).map(([index, timer]) => (
        <div key={index} className="text-sm text-color-teritary">
          {entries[+index].label}: {formatTime(timer.end ? timer.end - timer.start : 0)}
        </div>
      ))}
    </div>
  );
};

export default SplitTimer;
