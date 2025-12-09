import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore'; 
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';

const StartPage = ({ onOpenSettings, onStartGame }) => {
  const [name, setName] = useState('');
  
  const setPlayerName = useStore((state) => state.setPlayerName);
  const navigate = useNavigate();

  const handleStart = () => {
    if (!name.trim()) {
      alert('Будь ласка, введіть ім’я!');
      return;
    }
    setPlayerName(name); 
    onStartGame();
    navigate(`/game/${name}`);
  };

  return (
    <Card>
      <h1>🧮 Математичний Геній</h1>
      <p>Перевір свої навички швидкості та точності!</p>
      
      <input 
        type="text" 
        placeholder="Введіть ваше ім'я"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: '15px', padding: '12px', width: '80%', borderRadius: '8px', border: 'none', textAlign: 'center' }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
        <Button onClick={handleStart}>🚀 Розпочати гру</Button>
        <Button onClick={onOpenSettings} variant="secondary">⚙️ Налаштування</Button>
      </div>
    </Card>
  );
};

export default StartPage;