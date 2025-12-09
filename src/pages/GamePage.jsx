import Card from '../components/Card/Card';
import Button from '../components/Button/Button';

const GamePage = ({ 
  timeLeft, 
  score, 
  problem, 
  userAnswer, 
  onAnswerChange, 
  onCheckAnswer,
  onFinish 
}) => {
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onCheckAnswer();
    }
  };

  return (
    <Card>
      {}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-around', 
        marginBottom: '25px',
        fontSize: '1.2rem',
        fontWeight: 'bold'
      }}>
        <span style={{ color: timeLeft <= 10 ? 'red' : 'inherit' }}>
          ⏳ Час: {timeLeft}с
        </span> 
        <span>
          🏆 Очки: {score}
        </span>
      </div>
      
      {}
      <h2 style={{ fontSize: '3rem', margin: '30px 0' }}>
        {problem.num1} {problem.operator} {problem.num2} = ?
      </h2>
      
      {}
      <input 
        type="number" 
        placeholder="Ваша відповідь" 
        value={userAnswer}
        onChange={(e) => onAnswerChange(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      
      <Button onClick={onCheckAnswer}>
        Відповісти / Наступне завдання
      </Button>
      
      {}
      <Button onClick={onFinish} variant="secondary">
        Завершити гру
      </Button>
    </Card>
  );
};

export default GamePage;