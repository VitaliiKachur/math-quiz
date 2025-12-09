import { useState } from 'react';
import useTimer from './useTimer';
import useMathGenerator from './useMathGenerator';
import { useStore } from '../store/useStore'; 

const useMathQuiz = () => { 
  const settings = useStore((state) => state.settings);
  const addResult = useStore((state) => state.addResult);

  const [gameState, setGameState] = useState('start'); 
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0); 
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);

  const { currentProblem, generateProblem, checkResult } = useMathGenerator();

  const finishGame = () => {
    setGameState('result');
    addResult({
      score,
      totalQuestions,
      difficulty: settings.difficulty,
      accuracy: totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0
    });
  };

  const { timeLeft, startTimer, stopTimer } = useTimer(settings.duration, finishGame);

  const startGame = () => {
    setScore(0);
    setTotalQuestions(0);
    setUserAnswer('');
    setFeedback(null);
    generateProblem(settings); 
    startTimer(); 
    setGameState('game');
  };

  const checkAnswer = () => {
    const isCorrect = checkResult(userAnswer);
    
    setFeedback(isCorrect ? 'correct' : 'wrong');
    setTimeout(() => setFeedback(null), 500);

    setTotalQuestions(prev => prev + 1);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    
    generateProblem(settings);
    setUserAnswer('');
  };

  const manualFinish = () => {
    stopTimer();
    finishGame();
  };

  return {
    gameState,
    score,
    totalQuestions, 
    timeLeft,
    currentProblem,
    userAnswer,
    feedback,
    setUserAnswer,
    startGame,
    checkAnswer,
    finishGame: manualFinish,
    settings 
  };
};

export default useMathQuiz;