import type { Metadata } from 'next';

import { auth } from '@/auth';
import { getUserById } from '@/lib/user';
import DeleteAccountWrapper from '@/components/settings/delete-account-wrapper';
import UpdateUsernameForm from '@/components/settings/update-username-form';

export const metadata: Metadata = {
  title: 'Settings | Form Speedrunner',
  description: 'Manage your settings'
};

const SettingsPage = async () => {
  const session = await auth();
  const user = await getUserById(session?.user?.id as string);

  return (
    <section className="flex flex-col w-full items-center gap-8 h-screen max-h-screen py-20 px-5 lg:pt-26 lg:px-64 overflow-y-auto">
      <h1 className="text-xl lg:text-4xl font-bold text-color-light text-center font-semibold font-heading">
        Settings
      </h1>
      <UpdateUsernameForm currentUsername={user?.name || ''} />
      <DeleteAccountWrapper />
    </section>
  );
};

export default SettingsPage;
