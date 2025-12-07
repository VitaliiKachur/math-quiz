import Card from "../components/Card/Card";
import Button from "../components/Button/Button";

const GamePage = ({ onFinish }) => {
  return (
    <Card>
      {}
      <div style={{ marginBottom: "20px" }}>
        <span>Час: 30с</span> | <span>Очки: 0</span>
      </div>

      <h2>5 + 3 = ?</h2>

      <input type="number" placeholder="?" />

      <Button onClick={onFinish} variant="primary">
        Відповісти
      </Button>
      {}
      <Button onClick={onFinish} variant="secondary">
        Завершити тест (Debug)
      </Button>
    </Card>
  );
};

export default GamePage;
