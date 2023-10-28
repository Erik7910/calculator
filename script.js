let operatorOne = '';
let operatorTwo = '';
let currentOperation = null;

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]')
const currentOperationScreen = document.getElementById('calcOutput');
const clearButton = document.getElementById('clearBtn');
const lastOperationScreen = document.getElementById('lastOutput');
const equalsButton = document.getElementById('equalsBtn')
const decimalPoint = document.getElementById('decimalPoint')

numberButtons.forEach((button) => {
  button.addEventListener('click', () => appendNumber(button.textContent))
}
)

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

decimalPoint.addEventListener('click', appendDecimal) 
clearButton.addEventListener('click',clear)
equalsButton.addEventListener('click', evaluate)


function appendNumber(number) {
    if (currentOperationScreen.textContent === '0' || shouldResetScreen)
      resetScreen()
    currentOperationScreen.textContent += number
  }


function clear() {
    currentOperationScreen.textContent = '0'
    lastOperationScreen.textContent = ' '
    operatorOne = 0
}

function resetScreen(){
    currentOperationScreen.textContent = '';
    shouldResetScreen = false
}

function evaluate(){
    if (currentOperation === null || shouldResetScreen) {
      return
    }
    
    if (currentOperation === '/' && currentOperationScreen.textContent === '0') {
      alert("You can't divide by 0!")
      return
    }
    operatorTwo = currentOperationScreen.textContent

    currentOperationScreen.textContent = roundResult(operate(currentOperation, operatorOne, operatorTwo))
    console.log(operatorOne)
    lastOperationScreen.textContent = `${operatorOne} ${currentOperation} ${operatorTwo} =`
    currentOperation = null
}

function appendDecimal(){
    if (currentOperationScreen.textContent === '')
        currentOperationScreen.textContent = '0'
    if (currentOperationScreen.textContent.includes('.')) 
    return
    currentOperationScreen.textContent += '.'
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
  }


function setOperation(operator) {
    if (currentOperation !== null) evaluate()
    operatorOne = currentOperationScreen.textContent
    currentOperation = operator
    lastOperationScreen.textContent = `${operatorOne} ${currentOperation}`
    currentOperationScreen.textContent = "0"
    shouldResetScreen = true
}


function add(a, b) {
    return a + b
}
  
function substract(a, b) {
    return a - b
}
  
function multiply(a, b) {
    return a * b
}
  
function divide(a, b) {
    return a / b
}
  
function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
      case '+':
        return add(a, b)
      case '-':
        return substract(a, b)
      case '*':
        return multiply(a, b)
      case '/':
        if (b === 0) 
          return null
        else 
          return divide(a, b)
      default:
        return null
    }
}
