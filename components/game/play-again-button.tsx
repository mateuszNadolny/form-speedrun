'use client';

import { Play, Trophy } from 'lucide-react';
import PrimaryButton from '@/components/ui/primary-button';

import 'animate.css';
import Link from 'next/link';

interface PlayAgainButtonProps {
  resetGame: () => void;
}

const PlayAgainButton = ({ resetGame }: PlayAgainButtonProps) => {
  return (
    <div className="flex flex-col lg:flex-row justify-center lg:absolute lg:bottom-[9rem] my-5 lg:my-0 gap-3 lg:gap-5 lg:left-32 animate__animated animate__fadeInDown">
      <PrimaryButton onClick={resetGame} className="flex gap-2 lg:my-7">
        <Play />
        Play again
      </PrimaryButton>
      <PrimaryButton className="flex gap-2 lg:my-7">
        <Trophy />
        <Link href={'/scoreboard'}>Scoreboard</Link>
      </PrimaryButton>
    </div>
  );
};

export default PlayAgainButton;
