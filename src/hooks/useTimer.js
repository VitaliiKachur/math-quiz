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

    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) return 0;
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]); 

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (onTimeUp) {
        onTimeUp();
      }
    }
  }, [timeLeft, isRunning, onTimeUp]);

  return { timeLeft, startTimer, stopTimer };
};

export default useTimer;