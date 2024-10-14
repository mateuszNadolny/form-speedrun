'use client';

import { useTimerStore } from '@/store/timer-store';
import { useInputStore } from '@/store/input-store';
import { formatTime } from '@/lib/time';

import 'animate.css';
import { ChevronsRight } from 'lucide-react';

const SplitTimes = () => {
  const { splitTimers } = useTimerStore();
  const { entries } = useInputStore();
  console.log(splitTimers);
  console.log(entries);

  return (
    <div className="ml-6 lg:ml-0">
      <h2 className="text-2xl text-color-light mb-2 animate__animated animate__fadeInDown">
        Split Times:
      </h2>
      {Object.entries(splitTimers).map(([index, timer]) => (
        <div
          key={index}
          className="text-lg text-color-light animate__animated animate__fadeInDown mb-2 flex items-center gap-2">
          <ChevronsRight />
          {entries[+index].label}:{' '}
          <span className="font-extrabold text-color-teritary">
            {formatTime(timer.end ? timer.end - timer.start : 0)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SplitTimes;
