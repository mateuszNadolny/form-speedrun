import 'animate.css';
import { Button } from '@/components/ui/button';
import GameInstruction from './game-instruction';

interface GameWelcomeScreenProps {
  startGame: () => void;
}

const GameWelcomeScreen = ({ startGame }: GameWelcomeScreenProps) => {
  return (
    <div className="w-full flex flex-col lg:ml-80 lg:items-start items-center justify-center animate__animated animate__fadeIn">
      <h1 className="text-color-light font-extrabold text-[34px] lg:text-[64.66px]">
        Are you ready?
      </h1>
      <Button
        onClick={startGame}
        className="bg-color-teritary text-color-light text-[12.98px] lg:text-[24.69px] lg:h-12 my-7">
        Start Game
      </Button>
      <GameInstruction />
    </div>
  );
};

export default GameWelcomeScreen;
