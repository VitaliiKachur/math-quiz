import Card from '../components/Card/Card';
import Button from '../components/Button/Button';

const StartPage = ({ onStart }) => {
  return (
    <Card>
      <h1>Математичний Тренажер</h1>
      <p>Перевір свої навички швидкості та точності!</p>
      <Button onClick={onStart}>Розпочати гру</Button>
    </Card>
  );
};

export default StartPage;