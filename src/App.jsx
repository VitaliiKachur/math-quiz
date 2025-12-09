import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useQuiz } from './context/QuizContext';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import ResultPage from './pages/ResultPage';
import SettingsForm from './components/SettingsForm/SettingsForm';
import Modal from './components/Modal/Modal';
import './styles/global.css';

function App() {
  const { settings, updateSettings } = useQuiz();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<StartPage onOpenSettings={() => setIsSettingsOpen(true)} />} />
        <Route path="/game/:userId" element={<GamePage />} />
        <Route path="/results" element={<ResultPage />} />
      </Routes>

      <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}>
        <SettingsForm 
          currentSettings={settings} 
          onSave={(newSettings) => {
            updateSettings(newSettings);
            setIsSettingsOpen(false);
          }}
          onCancel={() => setIsSettingsOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default App;