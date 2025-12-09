import { useState } from 'react';

const useMathGenerator = () => {
  const [currentProblem, setCurrentProblem] = useState({
    num1: 0, num2: 0, operator: '+', answer: 0
  });

  const generateProblem = () => {
    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let num1 = Math.floor(Math.random() * 9) + 2; 
    let num2 = Math.floor(Math.random() * 9) + 2; 

    if (operator === '-' && num1 < num2) {
      [num1, num2] = [num2, num1];
    }
    
    let correctResult;
    switch (operator) {
      case '+': correctResult = num1 + num2; break;
      case '-': correctResult = num1 - num2; break;
      case '*': correctResult = num1 * num2; break;
      default: correctResult = 0;
    }

    setCurrentProblem({ num1, num2, operator, correctResult });
  };

  const checkResult = (userAnswer) => {
    const val = parseInt(userAnswer, 10);
    return val === currentProblem.correctResult;
  };

  return { currentProblem, generateProblem, checkResult };
};

export default useMathGenerator;