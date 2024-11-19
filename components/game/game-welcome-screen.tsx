import 'animate.css';
import PrimaryButton from '@/components/ui/primary-button';
import GameInstruction from '@/components/game/game-instruction';
import { Play } from 'lucide-react';

interface GameWelcomeScreenProps {
  startGame: () => void;
}

const GameWelcomeScreen = ({ startGame }: GameWelcomeScreenProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center md:justify-start animate__animated animate__fadeIn space-y-10">
      <h1 className="text-color-light font-extrabold text-4xl lg:text-7xl tracking-tight">
        Are you ready?
      </h1>
      <PrimaryButton onClick={startGame} className="flex gap-2">
        <Play />
        Start Game
      </PrimaryButton>
      <GameInstruction />
    </div>
  );
};

export default GameWelcomeScreen;
