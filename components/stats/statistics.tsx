import ConfettiTrigger from '../ui/confetti';
import Chart from './charts';
import SplitTimes from './split-time';
import TotalTime from './total-time';
import PlayAgainButton from '../game/play-again-button';

const Statistics = () => {
  return (
    <ConfettiTrigger>
      <div className="w-screen max-w-screen min-h-screen mt-48 lg:mb-0 lg:mt-0 flex flex-col lg:flex-row items-center justify-start lg:px-32">
        <div className="w-full flex flex-col items-start justify-start lg:mt-[-8rem] rounded-xl">
          <TotalTime />
          <SplitTimes />
        </div>
        <Chart />
        <PlayAgainButton />
      </div>
    </ConfettiTrigger>
  );
};

export default Statistics;
