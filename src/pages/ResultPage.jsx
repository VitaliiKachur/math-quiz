import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';

const ResultPage = () => {
  const { score, totalQuestions, settings, playerName } = useQuiz();
  const navigate = useNavigate();

  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  return (
    <Card>
      <h2 style={{ color: '#fff' }}>🏁 Фініш, {playerName}!</h2>
      <p style={{ color: '#ccc' }}>Складність: <strong style={{ color: '#fff' }}>{settings.difficulty.toUpperCase()}</strong></p>
      
      <div style={{ margin: '30px 0', padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}>
        <p>✅ Правильно: <strong style={{ color: '#4caf50' }}>{score}</strong> / {totalQuestions}</p>
        <p>🎯 Точність: <strong style={{ color: '#646cff' }}>{percentage}%</strong></p>
      </div>

      <p style={{ marginBottom: '30px', color: percentage >= 80 ? '#4caf50' : '#ffca28', fontWeight: 'bold' }}>
        {percentage >= 80 ? 'Чудовий результат! 🔥' : 'Тренуйся ще! 💪'}
      </p>

      <div style={{ display: 'flex', gap: '15px', flexDirection: 'column', width: '100%' }}>
         <Button onClick={() => navigate('/')}>На головну</Button>
      </div>
    </Card>
  );
};

export default ResultPage;