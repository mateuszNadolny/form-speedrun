import { useTimerStore } from '@/store/timer-store';
import { formatTime, countGeneralTime } from '@/lib/time';

import 'animate.css';

const TotalTime = () => {
  const { splitTimers } = useTimerStore();

  const totalTime = countGeneralTime(splitTimers);
  return (
    <h2 className="ml-6 lg:ml-0 text-5xl text-color-light animate__animated animate__fadeInDown mb-8">
      Total Time:{' '}
      <span className="font-extrabold text-color-teritary">{formatTime(totalTime)}</span>
    </h2>
  );
};

export default TotalTime;
