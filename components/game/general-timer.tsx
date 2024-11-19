'use client';

import { useState, useEffect } from 'react';
import { useTimerStore } from '@/store/timer-store';
import { formatTime } from '@/lib/time';

const GeneralTimer = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const { generalStartTime, generalEndTime } = useTimerStore();

  useEffect(() => {
    if (generalStartTime !== null) {
      const interval = setInterval(() => {
        const endTime = generalEndTime || Date.now();
        setElapsedTime(endTime - generalStartTime);
      }, 10);

      return () => clearInterval(interval);
    }
  }, [generalStartTime, generalEndTime]);

  return (
    <div className="my-8 text-4xl lg:text-2xl text-color-secondary font-extralight">
      {formatTime(elapsedTime)}
    </div>
  );
};

export default GeneralTimer;
