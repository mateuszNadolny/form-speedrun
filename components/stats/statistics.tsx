import ConfettiTrigger from '@/components/ui/confetti';
import Chart from '@/components/stats/charts';
import SplitTimes from '@/components/stats//split-time';
import TotalTime from '@/components/stats//total-time';
import PlayAgainButton from '@/components/game/play-again-button';

interface StatisticsProps {
  resetGame: () => void;
}

const Statistics = ({ resetGame }: StatisticsProps) => {
  return (
    <ConfettiTrigger>
      <div className="w-screen max-w-screen min-h-screen mt-[400px] lg:mb-0 lg:mt-0 flex flex-col lg:flex-row items-center justify-start lg:px-32">
        <div className="w-full flex flex-col lg:items-start lg:justify-start mt-26 lg:mt-[-8rem] rounded-xl">
          <TotalTime />
          <SplitTimes />
        </div>
        <Chart />
        <PlayAgainButton resetGame={resetGame} />
      </div>
    </ConfettiTrigger>
  );
};

export default Statistics;
