import { useState, useEffect, useCallback } from 'react';

const useTimer = (initialTime, onTimeUp) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = useCallback(() => {
    setTimeLeft(initialTime);
    setIsRunning(true);
  }, [initialTime]);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  useEffect(() => {
    let interval = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (onTimeUp) onTimeUp();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onTimeUp]);

  return { timeLeft, startTimer, stopTimer };
};

export default useTimer;