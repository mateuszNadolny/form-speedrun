'use client';

import { signIn } from 'next-auth/react';

import { useSearchParams } from 'next/navigation';

import { FaGithub, FaGoogle, FaDiscord } from 'react-icons/fa';

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

import ProvidersError from '@/components/auth/providers-error';
import PrimaryButton from '@/components/ui/primary-button';

const ProvidersSelector = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider'
      : '';
  const onClick = async (provider: 'google' | 'github' | 'discord') => {
    await signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <div className="mb-4">
      <ProvidersError message={urlError} />
      <div className="w-full flex flex-col gap-4">
        <PrimaryButton
          className="w-full flex items-center justify-center gap-3"
          onClick={() => onClick('github')}>
          <FaGithub className="text-white h-5 w-5" />
          Continue with GitHub
        </PrimaryButton>
        <PrimaryButton
          className="w-full flex items-center justify-center gap-3"
          onClick={() => onClick('google')}>
          <FaGoogle className="text-white h-5 w-5" />
          Continue with Google
        </PrimaryButton>
        <PrimaryButton
          className="w-full flex items-center justify-center gap-3"
          onClick={() => onClick('discord')}>
          <FaDiscord className="text-white h-5 w-5" />
          Continue with Discord
        </PrimaryButton>
      </div>
    </div>
  );
};

export default ProvidersSelector;
