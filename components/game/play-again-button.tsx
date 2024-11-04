'use client';

import { RefreshCcwDot } from 'lucide-react';
import PrimaryButton from '../ui/primary-button';

import 'animate.css';

const PlayAgainButton = () => {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="flex justify-center lg:absolute lg:bottom-10 lg:left-32 animate__animated animate__fadeInDown">
      <PrimaryButton onClick={() => refreshPage()} className="flex gap-2 my-7">
        <RefreshCcwDot />
        Play again
      </PrimaryButton>
    </div>
  );
};

export default PlayAgainButton;
