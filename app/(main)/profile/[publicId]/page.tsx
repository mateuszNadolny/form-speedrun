import { notFound } from 'next/navigation';
import ProfileHeader from '@/components/profile/profile-header';
import ProfileStatsWrapper from '@/components/profile/profile-stats-wrapper';
import { getUserProfileData } from '@/actions/get-user-profile-data';
interface ProfilePageProps {
  params: {
    publicId: string;
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const user = await getUserProfileData(params.publicId);

  if (!user || 'success' in user) {
    notFound();
  }
  return (
    <section className="flex flex-col w-full h-screen max-h-screen pt-20 px-5 lg:p-32">
      <ProfileHeader name={user.name} image={user.image} createdAt={user.createdAt} />
      <ProfileStatsWrapper scores={user.scores} />
    </section>
  );
}
