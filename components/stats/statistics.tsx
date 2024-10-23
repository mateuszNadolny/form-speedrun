import ConfettiTrigger from '../ui/confetti';
import Chart from './charts';
import SplitTimes from './split-time';
import TotalTime from './total-time';

const Statistics = () => {
  return (
    <ConfettiTrigger>
      <div className="w-screen max-w-screen h-screen flex items-center justify-center p-32">
        <div className="w-full flex flex-col items-start justify-center rounded-xl">
          <TotalTime />
          <SplitTimes />
        </div>
        <Chart />
      </div>
    </ConfettiTrigger>
  );
};

export default Statistics;
