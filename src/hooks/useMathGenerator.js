import { useState, useCallback } from 'react';

const useMathGenerator = () => {
  const [currentProblem, setCurrentProblem] = useState({
    num1: 0, num2: 0, operator: '+', correctResult: 0
  });

  const generateProblem = useCallback((settings) => {
    const { difficulty, operators } = settings;
    const safeOperators = (operators && operators.length > 0) ? operators : ['+'];

    let maxNum = 10;
    let minNum = 1; 
    let allowDecimals = false; 

    switch (difficulty) {
      case 'easy': 
        maxNum = 10;
        allowDecimals = false;
        break;
      case 'medium': 
        maxNum = 20;
        allowDecimals = false;
        break;
      case 'hard': 
        maxNum = 50;
        allowDecimals = true; 
        break;
      case 'expert': 
        maxNum = 100;
        minNum = 5;
        allowDecimals = true; 
        break;
      default:
        maxNum = 10;
    }

    const operator = safeOperators[Math.floor(Math.random() * safeOperators.length)];
    
    const getRandomNum = (min, max, isFloat) => {
      const val = Math.random() * (max - min) + min;
      if (isFloat) return parseFloat(val.toFixed(1)); 
      return Math.floor(val);
    };

    let num1, num2, correctResult;
    const useFloat = allowDecimals && Math.random() > 0.5;
    
    if (operator === '/') {
      if (useFloat) {
         const divisors = [2, 4, 5, 10]; 
         num2 = divisors[Math.floor(Math.random() * divisors.length)];
         let result = getRandomNum(1, maxNum / 5, true); 
         num1 = parseFloat((result * num2).toFixed(1));
         correctResult = result;
      } else {
         let result = Math.floor(Math.random() * 10) + 1; 
         num2 = Math.floor(Math.random() * (maxNum / result)) + 2; 
         num1 = num2 * result;
         correctResult = result;
      }
    } else {
      const isMultiplication = operator === '*';
      const currentUseFloat = isMultiplication ? (useFloat && Math.random() > 0.8) : useFloat;
      const effectiveMax = isMultiplication ? Math.ceil(Math.sqrt(maxNum * 10)) : maxNum;

      num1 = getRandomNum(minNum, effectiveMax, currentUseFloat);
      num2 = getRandomNum(minNum, effectiveMax, currentUseFloat);

      switch (operator) {
        case '+': correctResult = parseFloat((num1 + num2).toFixed(1)); break;
        case '-': correctResult = parseFloat((num1 - num2).toFixed(1)); break;
        case '*': correctResult = parseFloat((num1 * num2).toFixed(1)); break;
        default: correctResult = 0;
      }
    }

    const displayOperator = operator === '/' ? ':' : operator;
    setCurrentProblem({ num1, num2, operator: displayOperator, correctResult });

  }, []);

  const checkResult = (userAnswer) => {
    if (!userAnswer) return false;
    const normalizedInput = userAnswer.toString().replace(',', '.').trim();
    const val = parseFloat(normalizedInput);
    return Math.abs(val - currentProblem.correctResult) < 0.001;
  };

  return { currentProblem, generateProblem, checkResult };
};

export default useMathGenerator;