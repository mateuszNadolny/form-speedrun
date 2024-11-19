import { notFound } from 'next/navigation';
import { getUserProfileData } from '@/actions/get-user-profile-data';
import ProfileHeader from '@/components/profile/profile-header';

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
    <section className="flex flex-col w-full h-screen max-h-screen p-32">
      <ProfileHeader name={user.name} image={user.image} createdAt={user.createdAt} />
    </section>
  );
}
