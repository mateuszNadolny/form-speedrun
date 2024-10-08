'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import GameInput from './game-input';
import GameWelcomeScreen from './game-welcome-screen';
import GeneralTimer from './general-timer';
import SplitTimer from './split-timer';

import { useTimerStore } from '@/store/timer-store';
import { useInputStore } from '@/store/input-store';

import { inputs } from '@/types/data';
import { InputTypes } from '@/types/types';
import { formatTime } from '@/lib/time';
const Game = () => {
  const [gameState, setGameState] = useState('idle'); // idle, playing, finished
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const [gameInputs, setGameInputs] = useState<InputTypes[]>([]);
  const { addEntry, resetEntries } = useInputStore();
  const {
    startGeneralTimer,
    stopGeneralTimer,
    startSplitTimer,
    stopSplitTimer,
    resetTimers,
    splitTimers
  } = useTimerStore();

  const shuffleAndSelectInputs = () => {
    const shuffled = [...inputs].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3).map((input) => ({
      ...input,
      value: input?.value?.toString() ?? ''
    }));
  };

  const startGame = () => {
    const selectedInputs = shuffleAndSelectInputs();
    setGameInputs(selectedInputs);
    setCurrentInputIndex(0);
    setGameState('playing');
    resetTimers();
    resetEntries();
    startGeneralTimer();
    startSplitTimer(0);
  };

  const handleInputComplete = () => {
    stopSplitTimer(currentInputIndex);
    const currentInput = gameInputs[currentInputIndex];
    const splitTime = splitTimers[currentInputIndex];
    if (splitTime) {
      const formattedTime = formatTime(splitTime.end! - splitTime.start);
      addEntry(currentInput.label, formattedTime);
    }

    if (currentInputIndex < gameInputs.length - 1) {
      setCurrentInputIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        startSplitTimer(nextIndex);
        return nextIndex;
      });
    } else {
      stopGeneralTimer();
      setGameState('finished');
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-start justify-center">
      {gameState === 'idle' && <GameWelcomeScreen startGame={startGame} />}
      {gameState === 'playing' && (
        <div className="w-full flex lg:ml-80 flex-col items-start justify-center rounded-xl">
          <GeneralTimer />
          <div>
            <GameInput input={gameInputs[currentInputIndex]} onComplete={handleInputComplete} />
            <p className="mt-4 text-xs text-muted-foreground">
              Input {currentInputIndex + 1} of {gameInputs.length}
            </p>
          </div>
        </div>
      )}
      {gameState === 'finished' && (
        <>
          <h1 className="text-5xl text-color-light mb-4">Finished!</h1>
          <GeneralTimer />
          <SplitTimer />
          <p className="text-color-teritary">Input count: {gameInputs.length}</p>
          <Button
            onClick={() => {}}
            className="bg-color-teritary text-color-light hover:bg-color-primary">
            Play Again
          </Button>
        </>
        //   <Results
        //     startTime={startTime}
        //     endTime={endTime}
        //     inputCount={gameInputs.length}
        //   />
      )}
    </div>
  );
};

export default Game;
