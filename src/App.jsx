import { useState } from 'react';
import useMathQuiz from './hooks/useMathQuiz';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import SettingsForm from './components/SettingsForm/SettingsForm';
import Modal from './components/Modal/Modal';
import Button from './components/Button/Button';
import './styles/global.css';

function App() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('quizSettings');
    return saved ? JSON.parse(saved) : { 
      duration: 30, 
      difficulty: 'easy', 
      operators: ['+', '-'] 
    };
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { 
    gameState, score, totalQuestions, timeLeft, currentProblem, userAnswer,
    feedback, setUserAnswer, startGame, checkAnswer, finishGame
  } = useMathQuiz(settings);

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem('quizSettings', JSON.stringify(newSettings));
    setIsSettingsOpen(false); 
  };

  const percentage = totalQuestions > 0 
    ? Math.round((score / totalQuestions) * 100) 
    : 0;

  return (
    <div className="app-container">
      {gameState === 'start' && (
        <StartPage 
          onStart={startGame} 
          onSettings={() => setIsSettingsOpen(true)} 
        />
      )}
      
    {gameState === 'game' && (
        <GamePage 
          timeLeft={timeLeft}
          score={score}
          totalQuestions={totalQuestions}  
          problem={currentProblem}
          userAnswer={userAnswer}
          feedback={feedback}
          onAnswerChange={setUserAnswer}
          onCheckAnswer={checkAnswer}
          onFinish={finishGame}
        />
      )}
      
      <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}>
        <SettingsForm 
          currentSettings={settings} 
          onSave={handleSaveSettings}
          onCancel={() => setIsSettingsOpen(false)}
        />
      </Modal>

      <Modal isOpen={gameState === 'result'} onClose={startGame}>
        
        <h2 style={{ color: '#fff' }}>🏁 Фініш!</h2>
        <p style={{ color: '#ccc', marginTop: '0' }}>
          Складність: <strong style={{ color: '#fff' }}>{settings.difficulty.toUpperCase()}</strong>
        </p>
        
        <div style={{ 
          margin: '30px 0', 
          fontSize: '1.4rem', 
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '20px', 
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#ffffff'
        }}>
          <p style={{ margin: '10px 0', color: '#fff' }}>
            ✅ Правильно: <strong style={{ color: '#4caf50', fontSize: '1.6rem' }}>{score}</strong> 
            <span style={{ fontSize: '1rem', color: '#aaa', marginLeft: '5px' }}>з {totalQuestions}</span>
          </p>
          
          <p style={{ margin: '10px 0', color: '#fff' }}>
            🎯 Точність: <strong style={{ color: '#646cff', fontSize: '1.6rem' }}>{percentage}%</strong>
          </p>
        </div>

        <p style={{ 
          marginBottom: '30px', 
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: percentage >= 80 ? '#4caf50' : '#ffca28' 
        }}>
            {percentage >= 80 ? 'Чудовий результат! 🔥' : 'Тренуйся ще! 💪'}
        </p>

        <div style={{ display: 'flex', gap: '15px', flexDirection: 'column' }}>
           <Button onClick={startGame}>Грати знову</Button>
           <Button variant="secondary" onClick={() => window.location.reload()}>На головну</Button>
        </div>
      </Modal>
    </div>
  );
}

export default App;