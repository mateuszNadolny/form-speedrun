'use client';

import { formatTime } from '@/lib/time';
import { useState, useEffect } from 'react';

interface GeneralTimerProps {
  startTime: number | null;
}

export default function GeneralTimer({ startTime }: GeneralTimerProps) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (startTime !== null) {
      const interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10); // Update every 10ms for smooth millisecond display

      return () => clearInterval(interval);
    }
  }, [startTime]);

  return (
    <div className="my-8 text-2xl text-color-secondary font-extralight">
      {formatTime(elapsedTime)}
    </div>
  );
}
