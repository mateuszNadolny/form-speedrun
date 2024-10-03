'use client';
import { useState } from 'react';

import Image from 'next/image';

import 'animate.css';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '../ui/button';

const StepOne = () => {
  return (
    <DialogHeader>
      <DialogTitle className="text-start text-color-light animate__animated animate__fadeIn text-[18.33px]">
        Welcome to the <span className="text-color-teritary">Form Speedrun </span>game
      </DialogTitle>
      <DialogDescription className="text-[11.32] text-muted-foreground animate__animated animate__fadeIn">
        {` Your goal is to quickly submit 8 randomly generated form inputs, one at a time.`}
        <br />
        {`Each new input will
        appear right after you’ve submitted the previous one.`}
      </DialogDescription>
    </DialogHeader>
  );
};

const StepTwo = () => {
  return (
    <DialogHeader>
      <DialogTitle className="text-start text-color-light animate__animated animate__fadeIn text-[18.33px]">
        Make sure to input <span className="text-color-teritary">correct data </span>
      </DialogTitle>
      <DialogDescription className="text-[11.32] text-muted-foreground animate__animated animate__fadeIn">
        {`Each input will come with specific data for you to enter, and it will change every time you play. `}
        <br />
        {`Copying and pasting data into the input fields won’t be allowed.`}
      </DialogDescription>
      <Image
        src={'/step2gif.gif'}
        alt="step2gif"
        width={300}
        height={300}
        quality={100}
        priority
        className="animate__animated animate__fadeIn"
      />
    </DialogHeader>
  );
};

const StepThree = () => {
  return (
    <DialogHeader>
      <DialogTitle className="text-start text-color-light animate__animated animate__fadeIn text-[18.33px]">
        Try to beat the scores of <span className="text-color-teritary">other players</span>
      </DialogTitle>
      <DialogDescription className="text-[11.32] text-muted-foreground animate__animated animate__fadeIn">
        {`Each input will come with specific data for you to enter, and it will change every time you play. `}
        <br />
        {`Copying and pasting data into the input fields won’t be allowed.`}
      </DialogDescription>
    </DialogHeader>
  );
};

const GameInstruction = () => {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <Dialog>
      <DialogTrigger>
        <p className="mt-4 text-sm text-muted-foreground hover:text-color-teritary">How to play?</p>
      </DialogTrigger>
      <DialogContent className="bg-color-primary border-0 ">
        {currentStep === 0 && <StepOne />}
        {currentStep === 1 && <StepTwo />}
        {currentStep === 2 && <StepThree />}
        <div className="w-full flex justify-between">
          <Button
            size="sm"
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(currentStep - 1)}
            className="font-regular text-[11.32px] bg-color-teritary">
            Back
          </Button>
          <Button
            size="sm"
            disabled={currentStep === 2}
            onClick={() => setCurrentStep(currentStep + 1)}
            className="font-regular text-[11.32px] bg-color-teritary">
            Next
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameInstruction;
