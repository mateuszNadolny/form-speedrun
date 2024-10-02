'use client';

import { useState } from 'react';

import { inputs } from '@/types/data';

import { InputTypes } from '@/types/types';

import GameInput from './game-input';
import GeneralTimer from './general-timer';
import { Button } from '@/components/ui/button';
import { formatTime } from '@/lib/time';
import GameWelcomeScreen from './game-welcome-screen';
const Game = () => {
  const [gameState, setGameState] = useState('idle'); // idle, playing, finished
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const [gameInputs, setGameInputs] = useState<InputTypes[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  const shuffleAndSelectInputs = () => {
    const shuffled = [...inputs].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 8).map((input) => ({
      ...input,
      value: input?.value?.toString() ?? ''
    }));
  };

  const startGame = () => {
    setGameInputs(shuffleAndSelectInputs());
    setCurrentInputIndex(0);
    setGameState('playing');
    setStartTime(Date.now());
  };

  const handleInputComplete = () => {
    if (currentInputIndex < gameInputs.length - 1) {
      setCurrentInputIndex(currentInputIndex + 1);
    } else {
      setEndTime(Date.now());
      setGameState('finished');
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-start justify-center">
      {gameState === 'idle' && <GameWelcomeScreen startGame={startGame} />}
      {gameState === 'playing' && (
        <div className="w-full flex lg:ml-80 flex-col items-start justify-center rounded-xl">
          <GeneralTimer startTime={startTime!} />
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
          <p className="text-color-teritary">
            Time taken: {formatTime(Math.floor((endTime! - startTime!) / 1000))}
          </p>
          <p className="text-color-teritary">Input count: {gameInputs.length}</p>
          <Button
            onClick={startGame}
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
