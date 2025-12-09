import { useState } from 'react';
import useTimer from './useTimer';
import useMathGenerator from './useMathGenerator';

const GAME_DURATION = 30;

const useMathQuiz = () => {
  const [gameState, setGameState] = useState('start'); 
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');

  const { currentProblem, generateProblem, checkResult } = useMathGenerator();

  const finishGame = () => {
    setGameState('result');
  };

  const { timeLeft, startTimer, stopTimer } = useTimer(GAME_DURATION, finishGame);


  const startGame = () => {
    setScore(0);
    setUserAnswer('');
    generateProblem();
    startTimer(); 
    setGameState('game');
  };

  const checkAnswer = () => {
    const isCorrect = checkResult(userAnswer);
    
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    
    generateProblem();
    setUserAnswer('');
  };

  const manualFinish = () => {
    stopTimer();
    finishGame();
  };

  return {
    gameState,
    score,
    timeLeft,
    currentProblem,
    userAnswer,
    setUserAnswer,
    startGame,
    checkAnswer,
    finishGame: manualFinish
  };
};

export default useMathQuiz;