import 'animate.css';
import { Button } from '@/components/ui/button';
import GameInstruction from './game-instruction';

interface GameWelcomeScreenProps {
  startGame: () => void;
}

const GameWelcomeScreen = ({ startGame }: GameWelcomeScreenProps) => {
  return (
    <div className="w-full lg:w-[600px] flex flex-col lg:ml-80 lg:items-start items-center justify-center animate__animated animate__fadeIn space-y-10">
      <h1 className="text-color-light font-extrabold text-4xl lg:text-6xl">Are you ready?</h1>
      <Button
        onClick={startGame}
        className="bg-color-teritary text-color-light text-xs lg:text-2xl lg:h-12 my-7">
        Start Game
      </Button>
      <GameInstruction />
    </div>
  );
};

export default GameWelcomeScreen;
