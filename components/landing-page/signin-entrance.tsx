'use client';

import Link from 'next/link';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import React from 'react';

const SigninEntrance = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-regular text-[18.33px] bg-color-teritary">
          {`Let's get started`}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-color-primary border-none max-w-[350px] lg:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="text-color-light text-center text-[18.33px]">
            How would you like to proceed?
          </DialogTitle>
        </DialogHeader>
        <Button className="font-regular text-[11.32px] lg:text-lg bg-color-teritary">
          <Link href="/signin">{`I want to sign in and save my scores 😎`}</Link>
        </Button>
        <Button className="font-regular text-[11.32px] lg:text-lg bg-color-secondary h-auto">
          <Link href="/">
            {`I want to continue without signing in`}
            <br /> {`(I won't be able to save my scores 😐)`}
          </Link>
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SigninEntrance;
