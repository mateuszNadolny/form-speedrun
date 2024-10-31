import Game from '@/components/game/game';

const GamePage = () => {
  return (
    <section className="flex h-screen min-h-screen flex-col items-center justify-center bg-color-primary overflow-auto">
      <Game />
    </section>
  );
};

export default GamePage;
