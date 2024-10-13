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
import { ArrowBigLeftDash, ArrowBigRightDashIcon, CircleHelp } from 'lucide-react';

const classNames = {
  dialogTitle: 'text-start text-color-light animate__animated animate__fadeIn text-[21.01px] mb-4',
  dialogDescription: 'text-[11.32] text-muted-foreground animate__animated animate__fadeIn',
  dialogSpan: 'text-color-teritary'
};

const StepOne = () => {
  return (
    <DialogHeader>
      <DialogTitle className={classNames.dialogTitle}>
        Welcome to the <span className={classNames.dialogSpan}>Form Speedrun </span>game
      </DialogTitle>
      <DialogDescription className={classNames.dialogDescription}>
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
      <DialogTitle className={classNames.dialogTitle}>
        Make sure to input <span className={classNames.dialogSpan}>correct data </span>
      </DialogTitle>
      <DialogDescription className={classNames.dialogDescription}>
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
      <DialogTitle className={classNames.dialogTitle}>
        Try to beat the scores of <span className={classNames.dialogSpan}>other players</span>
      </DialogTitle>
      <DialogDescription className={classNames.dialogDescription}>
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
      <DialogTrigger className="flex items-center gap-2 text-muted-foreground hover:text-color-teritary mt-5">
        <CircleHelp className="h-5 w-5" />
        <p className="text-sm">How to play?</p>
      </DialogTrigger>
      <DialogContent className="bg-color-primary border-0 space-y-4">
        {currentStep === 0 && <StepOne />}
        {currentStep === 1 && <StepTwo />}
        {currentStep === 2 && <StepThree />}
        <div className="w-full flex justify-between">
          <Button
            size="lg"
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(currentStep - 1)}
            className="font-regular text-[12.98px] bg-color-teritary">
            <ArrowBigLeftDash />
          </Button>
          <Button
            size="lg"
            disabled={currentStep === 2}
            onClick={() => setCurrentStep(currentStep + 1)}
            className="font-regular text-[12.98px] bg-color-teritary">
            <ArrowBigRightDashIcon />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameInstruction;
