import Game from '@/components/game/game';

const GamePage = () => {
  return (
    <section className="flex h-screen min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-950 overflow-auto">
      <Game />
    </section>
  );
};

export default GamePage;
