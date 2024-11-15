'use client';

import { useState, useCallback } from 'react';

import GameInput from '@/components/game/game-input';
import GameWelcomeScreen from '@/components/game/game-welcome-screen';
import GeneralTimer from '@/components/game/general-timer';
import Statistics from '@/components/stats/statistics';

import { useTimerStore } from '@/store/timer-store';
import { useInputStore } from '@/store/input-store';

import { saveGameScore } from '@/actions/save-game-score';

import { inputs } from '@/types/data';
import { InputTypes } from '@/types/types';
import { formatTime } from '@/lib/time';
const Game = () => {
  const [gameState, setGameState] = useState('idle');
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const [gameInputs, setGameInputs] = useState<InputTypes[]>([]);
  const { addEntry, resetEntries } = useInputStore();
  const {
    startGeneralTimer,
    stopGeneralTimer,
    startSplitTimer,
    stopSplitTimer,
    resetTimers,
    getSplitTime
  } = useTimerStore();

  const shuffleAndSelectInputs = useCallback(() => {
    const shuffled = [...inputs].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 8).map((input) => ({
      ...input,
      value: input?.value?.toString() ?? ''
    }));
  }, []);

  const startGame = useCallback(() => {
    const selectedInputs = shuffleAndSelectInputs();
    setGameInputs(selectedInputs);
    setCurrentInputIndex(0);
    setGameState('playing');
    resetTimers();
    resetEntries();
    startGeneralTimer();
    startSplitTimer(0);
  }, [shuffleAndSelectInputs, resetTimers, resetEntries, startGeneralTimer, startSplitTimer]);

  const handleInputComplete = useCallback(() => {
    stopSplitTimer(currentInputIndex);
    const currentInput = gameInputs[currentInputIndex];
    const splitTime = getSplitTime(currentInputIndex);
    addEntry(currentInput.label, formatTime(splitTime));

    if (currentInputIndex === gameInputs.length - 1) {
      stopGeneralTimer();
      setGameState('finished');
      handleSaveScore();
    } else {
      setCurrentInputIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        startSplitTimer(nextIndex);
        return nextIndex;
      });
    }
  }, [
    currentInputIndex,
    gameInputs,
    stopSplitTimer,
    getSplitTime,
    addEntry,
    stopGeneralTimer,
    startSplitTimer
  ]);

  const handleSaveScore = useCallback(async () => {
    const totalTime = gameInputs.reduce((total, _, index) => total + getSplitTime(index), 0);
    const splitTimes = gameInputs.map((input, index) => ({
      label: input.label,
      time: getSplitTime(index)
    }));

    const result = await saveGameScore({
      totalTime,
      splitTimes
    });
  }, [gameInputs, getSplitTime]);

  return (
    <div className="w-full h-screen flex flex-col items-start justify-center">
      {gameState === 'idle' && <GameWelcomeScreen startGame={startGame} />}
      {gameState === 'playing' && (
        <div className="lg:w-[600px] w-full h-full flex mt-28 lg:mt-0 lg:ml-80 flex-col items-center lg:items-start justify-start lg:justify-center rounded-xl">
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
