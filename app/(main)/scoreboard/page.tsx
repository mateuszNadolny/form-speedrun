import { columns, Score } from '@/components/scoreboard/columns';
import ScoreboardTable from '@/components/scoreboard/scoreboard-table';

import { getGameScores } from '@/actions/get-game-scores';
import PrimaryButton from '@/components/ui/primary-button';
import Link from 'next/link';
import { Play } from 'lucide-react';

async function getData(): Promise<Score[]> {
  const scores = await getGameScores();
  return scores;
}

const ScoreboardPage = async () => {
  const data = await getData();
  return (
    <section className="flex h-screen min-h-screen flex-col items-center justify-start touch-auto	overflow-scroll lg:overflow-hidden py-24">
      <div className="text-xl lg:text-4xl font-bold text-color-light text-center mb-8">
        Top <span className="text-teal-500 font-extrabold">100</span> fastest form{' '}
        <span className="text-teal-500 font-extrabold">speedrunners</span>
      </div>
      <ScoreboardTable columns={columns} data={data} />
      <div className="text-color-light text-sm my-6">{`Don't see your name? Keep practicing and climb the ranks!`}</div>
      <PrimaryButton>
        <Link href="/game" className="flex items-center gap-2">
          <Play />
          Play again
        </Link>
      </PrimaryButton>
    </section>
  );
};

export default ScoreboardPage;
