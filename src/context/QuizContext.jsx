import { createContext, useContext, useState } from 'react';
import useMathQuiz from '../hooks/useMathQuiz';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [playerName, setPlayerName] = useState('');
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('quizSettings');
    return saved ? JSON.parse(saved) : { 
      duration: 30, 
      difficulty: 'easy', 
      operators: ['+', '-'] 
    };
  });

  const quizState = useMathQuiz(settings);

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem('quizSettings', JSON.stringify(newSettings));
  };

  return (
    <QuizContext.Provider value={{
      ...quizState,
      settings,
      updateSettings,
      playerName,
      setPlayerName
    }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);