import Card from '../components/Card/Card';
import Button from '../components/Button/Button';

const ResultPage = ({ finalScore, onRestart }) => {
  return (
    <Card>
      <h1>🎉 Гра Завершена!</h1>
      <p style={{ fontSize: '1.5rem', color: '#646cff', fontWeight: 'bold' }}>
        Ви набрали: {finalScore} очок!
      </p>
      
      <Button onClick={onRestart}>
        Спробувати ще раз
      </Button>
    </Card>
  );
};

export default ResultPage;