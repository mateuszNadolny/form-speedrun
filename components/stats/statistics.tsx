import ConfettiTrigger from '../ui/confetti';
import SplitTimes from './split-time';
import TotalTime from './total-time';

const Statistics = () => {
  return (
    <ConfettiTrigger>
      <div className="w-full h-screen flex flex-col items-start justify-center">
        <div className="w-full flex lg:ml-80 flex-col items-start justify-center rounded-xl">
          <TotalTime />
          <SplitTimes />
        </div>
      </div>
    </ConfettiTrigger>
  );
};

export default Statistics;
