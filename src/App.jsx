import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useStore } from './store/useStore'; 
import useMathQuiz from './hooks/useMathQuiz'; 

import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import ResultPage from './pages/ResultPage';
import SettingsForm from './components/SettingsForm/SettingsForm';
import Modal from './components/Modal/Modal';
import './styles/global.css';

function App() {
  const quizState = useMathQuiz(); 
  
  const settings = useStore((state) => state.settings);
  const setSettings = useStore((state) => state.setSettings);
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="app-container">
      <Routes>
        <Route 
           path="/" 
           element={<StartPage 
              onOpenSettings={() => setIsSettingsOpen(true)} 
              onStartGame={quizState.startGame} 
           />} 
        />
        
        <Route 
           path="/game/:userId" 
           element={<GamePage quizState={quizState} />} 
        />
        
        <Route 
           path="/results" 
           element={<ResultPage currentScore={quizState.score} total={quizState.totalQuestions} />} 
        />
      </Routes>

      <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}>
        <SettingsForm 
          currentSettings={settings} 
          onSave={(newSettings) => {
            setSettings(newSettings); 
            setIsSettingsOpen(false);
          }}
          onCancel={() => setIsSettingsOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default App;