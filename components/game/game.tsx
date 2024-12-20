'use client';

import { useState, useCallback, useEffect } from 'react';
import GameInput from '@/components/game/game-input';
import GameWelcomeScreen from '@/components/game/game-welcome-screen';
import GeneralTimer from '@/components/game/general-timer';
import Statistics from '@/components/stats/statistics';
import { useTimerStore } from '@/store/timer-store';
import { useInputStore } from '@/store/input-store';
import { saveGameScore } from '@/actions/save-game-score';
import { InputTypes } from '@/types/types';
import { generateInputs } from '@/types/data';
import { formatTime } from '@/lib/time';
import { createGameSession } from '@/actions/create-game-session';

const Game = () => {
  const [gameState, setGameState] = useState('idle'); //idle, playing, finished
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
  const [sessionId, setSessionId] = useState<string | null>(null);

  const generateGameInputs = useCallback(() => {
    const allInputs = generateInputs();
    const shuffled = [...allInputs].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 8);
  }, []);

  const resetGame = useCallback(() => {
    setGameState('idle');
    setCurrentInputIndex(0);
    resetTimers();
    resetEntries();
    setGameInputs([]);
  }, [resetTimers, resetEntries]);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  useEffect(() => {
    if (gameState === 'playing') {
      startSplitTimer(currentInputIndex);
    }
  }, [currentInputIndex, gameState, startSplitTimer]);

  const startGame = useCallback(async () => {
    try {
      const session = await createGameSession();
      if (!session) {
        throw new Error('Failed to create session');
      }

      setSessionId(session.sessionId);
      setGameInputs(session.inputs);
      setCurrentInputIndex(0);
      setGameState('playing');
      resetTimers();
      resetEntries();
      startGeneralTimer();
    } catch (error) {
      console.error('Error starting game:', error);
      setGameState('idle');
    }
  }, [resetTimers, resetEntries, startGeneralTimer]);
  const handleSaveScore = useCallback(async () => {
    const splitTimes = gameInputs.map((input, index) => ({
      label: input.label,
      time: getSplitTime(index)
    }));

    await saveGameScore({
      sessionId: sessionId as string,
      endTime: Date.now(),
      splitTimes
    });
  }, [gameInputs, getSplitTime, sessionId]);

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
      setCurrentInputIndex((prevIndex) => prevIndex + 1);
    }
  }, [
    currentInputIndex,
    gameInputs,
    stopSplitTimer,
    getSplitTime,
    addEntry,
    stopGeneralTimer,
    handleSaveScore
  ]);

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
      {gameState === 'finished' && <Statistics resetGame={resetGame} />}
    </div>
  );
};

export default Game;
