import type { Metadata } from 'next';
import { Suspense } from 'react';

import Loading from '@/app/(main)/profile/[publicId]/loading';

import ProfileHeader from '@/components/profile/profile-header';
import ProfileStatsWrapper from '@/components/profile/profile-stats-wrapper';
import { columns } from '@/components/scoreboard/columns';
import ScoreboardTable from '@/components/scoreboard/scoreboard-table';

import { getUserGameScores } from '@/actions/get-user-game-scores';
import { getUserProfileData } from '@/actions/get-user-profile-data';

interface ProfilePageProps {
  params: {
    publicId: string;
  };
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const user = await getUserProfileData(params.publicId);

  return {
    title: `${user?.name ?? 'Anonymous'}'s Profile | Form Speedrunner`,
    description: `View ${user?.name ?? 'Anonymous'}'s speedrun profile and achievements`
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const data = await getUserGameScores(params.publicId);
  const user = await getUserProfileData(params.publicId);

  return (
    <section className="flex flex-col w-full h-screen max-h-screen py-20 px-5 lg:pt-26 lg:px-20 overflow-y-auto">
      <Suspense fallback={<Loading />}>
        <ProfileHeader
          name={user?.name ?? 'Anonymous'}
          image={user?.image as string}
          createdAt={new Date(user?.createdAt as Date)}
          publicId={params.publicId}
        />
        {(user?.scores?.length ?? 0) > 0 && (
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
        )}
        <ScoreboardTable columns={columns} data={data} pageSize={5} />
      </Suspense>
    </section>
  );
}
