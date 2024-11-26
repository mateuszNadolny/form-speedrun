import { auth } from '@/auth';

import ClientWrapper from '@/components/settings/delete-account-client-wrapper';
import { Trash2 } from 'lucide-react';

const DeleteAccountWrapper = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  return (
    <div className="bg-gray-800/50 w-full rounded-xl p-4 lg:p-6 border border-red-600 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Trash2 className="w-5 h-5 text-red-600" />
        <h3 className="font-semibold text-md lg:text-2xl text-red-600">Delete Account</h3>
      </div>

      <p className="text-sm lg:text-lg text-muted-foreground">
        This action cannot be undone. All your data, including your speedrun records, will be
        permanently deleted.
      </p>

      <ClientWrapper userId={session.user.id} />
    </div>
  );
};

export default DeleteAccountWrapper;
