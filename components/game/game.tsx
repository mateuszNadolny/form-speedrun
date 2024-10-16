'use client';

import { useState } from 'react';

import GameInput from './game-input';
import GameWelcomeScreen from './game-welcome-screen';
import GeneralTimer from './general-timer';
import Statistics from '../stats/statistics';

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
    return shuffled.slice(0, 8).map((input) => ({
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
      const formattedTime = formatTime(Date.now() - splitTime.start);
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
        <div className="w-full h-full flex mt-28 lg:mt-0 lg:ml-80 flex-col items-center lg:items-start justify-start lg:justify-center rounded-xl">
          <GeneralTimer />
          <div className="flex flex-col items-center lg:items-start space-y-6">
            <GameInput input={gameInputs[currentInputIndex]} onComplete={handleInputComplete} />
            <p className="mt-4 text-xs text-muted-foreground">
              Input {currentInputIndex + 1} of {gameInputs.length}
            </p>
          </div>
        </div>
      )}
      {gameState === 'finished' && <Statistics />}
    </div>
  );
};

export default Game;
