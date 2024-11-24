import { auth } from '@/auth';
import { isOAuthAccount } from '@/lib/user';
import { Suspense } from 'react';
import ChangePasswordForm from './change-password-form';

const ChangePasswordFormWrapper = async () => {
  const session = await auth();
  const isOAuth = await isOAuthAccount(session?.user?.id as string);

  console.log(isOAuth);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChangePasswordForm isOAuthAccount={isOAuth} />
    </Suspense>
  );
};

export default ChangePasswordFormWrapper;
