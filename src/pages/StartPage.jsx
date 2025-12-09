import Card from '../components/Card/Card';
import Button from '../components/Button/Button';

const StartPage = ({ onStart, onSettings }) => {
  return (
    <Card>
      <h1>🧮 Математичний Геній</h1>
      <p>Перевір свої навички швидкості та точності!</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Button onClick={onStart}>🚀 Розпочати гру</Button>
        <Button onClick={onSettings} variant="secondary">⚙️ Налаштування</Button>
      </div>
    </Card>
  );
};

export default StartPage;