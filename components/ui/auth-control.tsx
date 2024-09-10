'use client';

import 'animate.css';
import Link from 'next/link';

import { useSession } from 'next-auth/react';

import { Button } from './button';
import UserDropdown from './user-dropdown';

const SigninButton = () => {
  return (
    <>
      <Button
        variant="link"
        className="animate__animated animate__backInRight animate__delay-1s font-regular text-[11.32px] text-color-teritary fixed top-2 lg:top-8 right-2 lg:right-10">
        <Link href="/signin">{`Click here to sign in`}</Link>
      </Button>
    </>
  );
};

const UserIcon = () => {
  return <UserDropdown />;
};

const AuthControl = () => {
  const session = useSession();
  if (session?.status === 'authenticated') {
    return <UserIcon />;
  } else {
    return <SigninButton />;
  }
};

export default AuthControl;
