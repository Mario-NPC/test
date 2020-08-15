export const calculate = (operation, num1, num2, setResult) => {
  switch (operation){
    case '+':
      setResult(num1+num2);
      break;
    case '-':
      setResult(num1-num2);
      break;
    case '/':
      setResult(num1/num2);
      break;
    case '*':
      setResult(num1*num2);
      break;
    default:
      setResult(null)
  }
}

export const formatCalculateString = (num1, operation, num2, result) => {
  if(num1 && operation && num2 && result ){
    return `${num1} ${operation} ${num2} = ${result}`
  } else if (num1 && operation && num2){
    return `${num1} ${operation} ${num2}`
  } else if (num1 && operation) {
    return `${num1} ${operation}`
  } else if (num1){
    return `${num1}`
  }
  return ''
}