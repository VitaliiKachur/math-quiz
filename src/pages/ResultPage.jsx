import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore'; 
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';

const ResultPage = ({ currentScore, total }) => {
  const navigate = useNavigate();
  
  const playerName = useStore((state) => state.playerName);
  const history = useStore((state) => state.history); 
  const clearHistory = useStore((state) => state.clearHistory);

  const percentage = total > 0 ? Math.round((currentScore / total) * 100) : 0;

  return (
    <Card>
      <h2 style={{ color: '#fff' }}>🏁 Результат: {currentScore}/{total}</h2>
      
      <div style={{ margin: '20px 0', padding: '15px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}>
        <p>Гравець: <strong>{playerName}</strong></p>
        <p>Точність: <strong style={{ color: percentage >= 80 ? '#4caf50' : '#ffca28' }}>{percentage}%</strong></p>
      </div>

      <h3 style={{ color: '#ffd700', marginTop: '30px' }}>📜 Історія ігор</h3>
      
      <div style={{ 
        maxHeight: '200px', 
        overflowY: 'auto', 
        width: '100%', 
        marginBottom: '20px',
        border: '1px solid #444',
        borderRadius: '8px'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', color: '#ccc' }}>
          <thead>
            <tr style={{ background: '#333', color: '#fff', position: 'sticky', top: 0 }}>
              <th style={{ padding: '8px' }}>Дата</th>
              <th style={{ padding: '8px' }}>Рівень</th>
              <th style={{ padding: '8px' }}>Рахунок</th>
            </tr>
          </thead>
          <tbody>
            {history.map((game) => (
              <tr key={game.id} style={{ borderBottom: '1px solid #444', textAlign: 'center' }}>
                <td style={{ padding: '8px' }}>{game.date}</td>
                <td style={{ padding: '8px' }}>{game.difficulty}</td>
                <td style={{ padding: '8px', color: '#fff' }}>
                  {game.score}/{game.totalQuestions} ({game.accuracy}%)
                </td>
              </tr>
            ))}
            {history.length === 0 && (
              <tr><td colSpan="3" style={{ padding: '15px' }}>Історії поки немає</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexDirection: 'column', width: '100%' }}>
         <Button onClick={() => navigate('/')}>На головну</Button>
         {history.length > 0 && (
            <Button variant="secondary" onClick={clearHistory} style={{ fontSize: '0.9rem' }}>
              Очистити історію
            </Button>
         )}
      </div>
    </Card>
  );
};

export default ResultPage;