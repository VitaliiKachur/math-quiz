import { useState } from 'react';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import ResultPage from './pages/ResultPage';
import './styles/global.css';

function App() {
  const [currentPage, setCurrentPage] = useState('start');

  const handleStartGame = () => setCurrentPage('game');
  const handleFinishGame = () => setCurrentPage('result');
  const handleRestartGame = () => setCurrentPage('start');

  return (
    <div className="app-container">
      {currentPage === 'start' && <StartPage onStart={handleStartGame} />}
      {currentPage === 'game' && <GamePage onFinish={handleFinishGame} />}
      {currentPage === 'result' && <ResultPage onRestart={handleRestartGame} />}
    </div>
  );
}

export default App;