import type { Metadata } from 'next';
import Game from '@/components/game/game';

export const metadata: Metadata = {
  title: 'Play | Form Speedrunner',
  description: 'Play Form Speedrunner'
};

const GamePage = () => {
  return (
    <section className="flex h-screen min-h-screen flex-col items-center justify-center overflow-auto">
      <Game />
    </section>
  );
};

export default GamePage;
