import Card from '../components/Card/Card';
import Button from '../components/Button/Button';

const ResultPage = ({ onRestart }) => {
  return (
    <Card>
      <h1>Результати</h1>
      <p>Ви набрали: 10 очок</p>
      <Button onClick={onRestart}>Спробувати ще раз</Button>
    </Card>
  );
};

export default ResultPage;
