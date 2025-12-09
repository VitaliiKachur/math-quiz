import useMathQuiz from './hooks/useMathQuiz'; 
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import ResultPage from './pages/ResultPage';
import './styles/global.css';

function App() {
  const { 
    gameState, 
    score, 
    timeLeft, 
    currentProblem, 
    userAnswer,
    startGame, 
    finishGame,
    checkAnswer,
    setUserAnswer
  } = useMathQuiz(); 

  return (
    <div className="app-container">
      {gameState === 'start' && <StartPage onStart={startGame} />}
      
      {gameState === 'game' && (
        <GamePage 
          timeLeft={timeLeft}
          score={score}
          problem={currentProblem}
          userAnswer={userAnswer}
          onAnswerChange={setUserAnswer}
          onCheckAnswer={checkAnswer}
          onFinish={finishGame} 
        />
      )}
      
      {gameState === 'result' && (
        <ResultPage 
          finalScore={score} 
          onRestart={startGame} 
        />
      )}
    </div>
  );
}

export default App;