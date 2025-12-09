import Card from '../components/Card/Card';
import Button from '../components/Button/Button';

const GamePage = ({ 
  timeLeft, 
  score, 
  totalQuestions, 
  problem, 
  userAnswer, 
  onAnswerChange, 
  onCheckAnswer, 
  onFinish,
  feedback 
}) => {
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onCheckAnswer();
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^-?\d*[.,]?\d*$/.test(value)) {
      onAnswerChange(value);
    }
  };

  const getCardClass = () => {
    if (feedback === 'correct') return 'card-correct';
    if (feedback === 'wrong') return 'card-wrong';
    return '';
  };

  return (
    <Card className={getCardClass()}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        width: '100%',
        marginBottom: '40px',
        fontSize: '1.8rem',    
        fontWeight: 'bold',
        color: '#ffffff'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.5))' }}>⏱</span> 
          <span style={{ 
            color: timeLeft <= 5 ? '#ff4444' : '#ffffff',
            textShadow: timeLeft <= 5 ? '0 0 10px #ff0000' : 'none',
            minWidth: '60px' 
          }}>
            {timeLeft} с
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: '#e0e0e0', fontSize: '1.4rem' }}>Питання:</span>
          <span style={{ 
            color: '#ffd700', 
            textShadow: '0 0 10px rgba(255, 215, 0, 0.6)', 
            fontSize: '2.2rem' 
          }}>
            {totalQuestions + 1}
          </span>
        </div>
      </div>
      
      <h2 style={{ fontSize: '4rem', margin: '20px 0 40px 0', letterSpacing: '2px' }}>
        {problem.num1} {problem.operator} {problem.num2} = ?
      </h2>
      
      <input 
        type="text" 
        inputMode="decimal"
        value={userAnswer}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="?"
        autoFocus
        autoComplete="off"
        style={{ 
          fontSize: '2.5rem', 
          padding: '15px', 
          width: '60%', 
          textAlign: 'center',
          fontWeight: 'bold',
          background: 'rgba(255,255,255,0.1)',
          border: '2px solid rgba(255,255,255,0.2)',
          color: '#fff' 
        }}
      />
      
      <div style={{ marginTop: '40px', width: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <Button onClick={onCheckAnswer} variant="primary">
          Відповісти
        </Button>

        <Button onClick={onFinish} variant="secondary">
          Завершити гру
        </Button>
      </div>
    </Card>
  );
};

export default GamePage;