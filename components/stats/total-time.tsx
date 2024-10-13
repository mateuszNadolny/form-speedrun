import { useTimerStore } from '@/store/timer-store';
import { formatTime } from '@/lib/time';

import 'animate.css';

const TotalTime = () => {
  const { splitTimers } = useTimerStore();

  const countGeneralTime = () => {
    let totalTime = 0;
    Object.values(splitTimers).forEach((timer) => {
      totalTime += timer.end ? timer.end - timer.start : 0;
    });
    return totalTime;
  };

  const totalTime = countGeneralTime();
  return (
    <h2 className="text-5xl text-color-light animate__animated animate__fadeInDown mb-8">
      Total Time:{' '}
      <span className="font-extrabold text-color-teritary">{formatTime(totalTime)}</span>
    </h2>
  );
};

export default TotalTime;
