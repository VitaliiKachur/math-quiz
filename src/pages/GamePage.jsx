import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';

const GamePage = ({ quizState }) => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { 
    timeLeft, totalQuestions, currentProblem, userAnswer, 
    feedback, setUserAnswer, checkAnswer, finishGame, gameState 
  } = quizState;

  useEffect(() => {
    if (gameState === 'result') {
      navigate('/results');
    }
  }, [gameState, navigate]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') checkAnswer();
  };

  const getCardClass = () => {
    if (feedback === 'correct') return 'card-correct';
    if (feedback === 'wrong') return 'card-wrong';
    return '';
  };

  return (
    <Card className={getCardClass()}>
      <div style={{ position: 'absolute', top: '10px', right: '20px', color: '#888', fontSize: '0.9rem' }}>
        Гравець: {userId}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '40px', color: '#fff', fontSize: '1.8rem', fontWeight: 'bold' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>⏱</span> 
          <span style={{ color: timeLeft <= 5 ? '#ff4444' : '#ffffff' }}>{timeLeft} с</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: '#e0e0e0', fontSize: '1.4rem' }}>Питання:</span>
          <span style={{ color: '#ffd700' }}>{totalQuestions + 1}</span>
        </div>
      </div>
      
      <h2 style={{ fontSize: '4rem', margin: '20px 0' }}>
        {currentProblem.num1} {currentProblem.operator} {currentProblem.num2} = ?
      </h2>
      
      <input 
        type="text" 
        inputMode="decimal"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
        autoComplete="off"
        style={{ fontSize: '2.5rem', padding: '15px', width: '60%', textAlign: 'center', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '2px solid rgba(255,255,255,0.2)' }}
      />
      
      <div style={{ marginTop: '40px', width: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <Button onClick={checkAnswer}>Відповісти</Button>
        <Button onClick={finishGame} variant="secondary">Завершити гру</Button>
      </div>
    </Card>
  );
};

export default GamePage;