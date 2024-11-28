'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Image from 'next/image';
import { blurhashToBase64 } from 'blurhash-base64';

import 'animate.css';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowBigLeftDash, ArrowBigRightDashIcon, CircleHelp } from 'lucide-react';

const classNames = {
  dialogTitle:
    'text-start text-color-light animate__animated animate__fadeIn text-2xl font-bold mb-6',
  dialogDescription:
    'text-base leading-relaxed text-muted-foreground/80 animate__animated animate__fadeIn',
  dialogSpan: 'text-color-teritary font-semibold',
  stepIndicator: 'flex items-center justify-center gap-2',
  stepDot: (isActive: boolean) =>
    `h-2.5 w-2.5 rounded-full transition-all duration-300 ${
      isActive ? 'bg-color-teritary scale-125' : 'bg-muted-foreground/30'
    }`,
  navigationButton:
    'font-medium text-sm bg-color-teritary/90 hover:bg-color-teritary transition-colors duration-200'
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0
  })
};

const dotVariants = {
  inactive: { scale: 1 },
  active: {
    scale: 1.3,
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  }
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
        src={'https://utfs.io/f/c130RmXai3uL2xNpmOSt6AskWfN8BQnFrUgVwDvIMdXY3O04'}
        alt="step2gif"
        width={300}
        height={300}
        quality={100}
        priority
        className="animate__animated animate__fadeIn"
        placeholder="blur"
        blurDataURL={blurhashToBase64('L04LqG.TX7RPyDyDtRV@8^Mwt8o#')}
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
        {`After each race you can check the detailed performance analytics of you race.`}
        <br />
        {`Get better, compete with players worldwide and climb the global leaderboard!`}
      </DialogDescription>
    </DialogHeader>
  );
};

const StepWrapper = ({ children, direction }: { children: React.ReactNode; direction: number }) => (
  <motion.div
    custom={direction}
    variants={slideVariants}
    initial="enter"
    animate="center"
    exit="exit"
    transition={{
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    }}>
    {children}
  </motion.div>
);

const GameInstruction = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const totalSteps = 3;

  const handleNext = () => {
    setDirection(1);
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-muted-foreground hover:text-color-teritary transition-colors duration-200 mt-5 cursor-pointer">
          <CircleHelp className="h-5 w-5" />
          <p className="text-sm font-medium">How to play?</p>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="bg-color-primary border-0 space-y-6 p-8">
        <div className={classNames.stepIndicator}>
          {[...Array(totalSteps)].map((_, index) => (
            <motion.div
              key={index}
              variants={dotVariants}
              animate={currentStep === index ? 'active' : 'inactive'}
              className={classNames.stepDot(currentStep === index)}
            />
          ))}
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          {currentStep === 0 && (
            <StepWrapper direction={direction}>
              <StepOne />
            </StepWrapper>
          )}
          {currentStep === 1 && (
            <StepWrapper direction={direction}>
              <StepTwo />
            </StepWrapper>
          )}
          {currentStep === 2 && (
            <StepWrapper direction={direction}>
              <StepThree />
            </StepWrapper>
          )}
        </AnimatePresence>

        <motion.div
          className="w-full flex justify-between items-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              disabled={currentStep === 0}
              onClick={handlePrevious}
              className={classNames.navigationButton}>
              <ArrowBigLeftDash className="mr-2 h-5 w-5" />
              Previous
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              disabled={currentStep === 2}
              onClick={handleNext}
              className={classNames.navigationButton}>
              Next
              <ArrowBigRightDashIcon className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default GameInstruction;
