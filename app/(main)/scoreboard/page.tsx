import Link from 'next/link';

import { Suspense } from 'react';
import Loading from '@/app/(main)/scoreboard/loading';

import { auth } from '@/auth';

import PrimaryButton from '@/components/ui/primary-button';
import { columns, Score } from '@/components/scoreboard/columns';
import ScoreboardTable from '@/components/scoreboard/scoreboard-table';

import { getGameScores } from '@/actions/get-game-scores';

import { Play, User } from 'lucide-react';

async function getData(): Promise<Score[]> {
  const scores = await getGameScores();
  return scores;
}

async function ScoreboardContent() {
  const data = await getData();

  return (
    <>
      <div className="text-xl lg:text-4xl font-bold text-color-light text-center mb-8">
        Top <span className="text-teal-500 font-extrabold">100</span> fastest form{' '}
        <span className="text-teal-500 font-extrabold">speedrunners</span>
      </div>
      <ScoreboardTable columns={columns} data={data} />
      <div className="text-color-light text-sm my-6">
        {`Don't see your name? Keep practicing and climb the ranks!`}
      </div>
    </>
  );
}

const ScoreboardPage = async () => {
  const session = await auth();

  return (
    <section className="flex h-screen min-h-screen flex-col items-center justify-start touch-auto overflow-scroll lg:overflow-hidden py-24">
      <Suspense fallback={<Loading />}>
        <ScoreboardContent />
      </Suspense>
      <div className="flex gap-4">
        <PrimaryButton>
          <Link href="/game" className="flex items-center gap-2">
            <Play />
            Play again
          </Link>
        </PrimaryButton>
        <PrimaryButton>
          <Link href="/profile" className="flex items-center gap-2">
            <User />
            {session?.user ? 'Your ranking' : 'Sign in to save your score'}
          </Link>
        </PrimaryButton>
      </div>
    </section>
  );
};

export default ScoreboardPage;
