import Link from 'next/link';

import { Button } from './button';
import { LogIn } from 'lucide-react';
const SigninButton = () => {
  return (
    <>
      <Button
        variant="link"
        className="font-regular text-[11.32px] text-color-teritary flex items-center">
        <LogIn className="mr-2 h-4 w-4" />
        <Link href="/signin">{`Click here to sign in`}</Link>
      </Button>
    </>
  );
};

export default SigninButton;
