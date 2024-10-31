'use client';

import { RefreshCcwDot } from 'lucide-react';
import { Button } from '../ui/button';

import 'animate.css';

const PlayAgainButton = () => {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="flex justify-center lg:absolute lg:bottom-10 lg:left-32 animate__animated animate__fadeInDown">
      <Button
        onClick={() => refreshPage()}
        className="flex gap-2 bg-color-teritary text-color-light text-md lg:text-xl lg:h-12 my-7">
        <RefreshCcwDot />
        Play again
      </Button>
    </div>
  );
};

export default PlayAgainButton;
