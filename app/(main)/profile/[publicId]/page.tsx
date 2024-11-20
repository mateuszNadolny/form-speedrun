import { Suspense } from 'react';

import Loading from '@/app/(main)/profile/[publicId]/loading';

import ProfileHeader from '@/components/profile/profile-header';
import ProfileStatsWrapper from '@/components/profile/profile-stats-wrapper';
import { columns, Score } from '@/components/scoreboard/columns';
import ScoreboardTable from '@/components/scoreboard/scoreboard-table';

import { getUserGameScores } from '@/actions/get-user-game-scores';

interface ProfilePageProps {
  params: {
    publicId: string;
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const data = await getUserGameScores(params.publicId);

  return (
    <section className="flex flex-col w-full h-screen max-h-screen pt-20 px-5 lg:p-28 overflow-y-auto">
      <Suspense fallback={<Loading />}>
        <ProfileHeader
          name={data[0].username}
          image={data[0].image}
          createdAt={new Date(data[0].createdAt)}
          publicId={params.publicId}
        />
        <ProfileStatsWrapper
          scores={data.map((score) => ({
            ...score,
            totalTime: score.time,
            createdAt: new Date(score.createdAt),
            splitTimes: score.splitTimes.map((split) => ({
              ...split,
              id: `${score.id}-${split.label}`
            }))
          }))}
        />
        <ScoreboardTable columns={columns} data={data} pageSize={5} />
      </Suspense>
    </section>
  );
}
