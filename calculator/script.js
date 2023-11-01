const clearBtn = document.querySelector("#clear-button");
const deleteBtn = document.querySelector("#delete-button");
const divideBtn = document.querySelector("#divide-button");
const multiplyBtn = document.querySelector("#multiply-button");
const subtractBtn = document.querySelector("#subtract-button");
const addBtn = document.querySelector("#add-button");
const decimalBtn = document.querySelector("#dot-button");
const equalBtn = document.querySelector("#equal-button");
const numbersBtn = document.querySelectorAll(".numbers");
const resultElement = document.querySelector("#result");

// initialize the variable
let result = "";
let operation = "";
let previousOperand = 0;

// function to append number
function appendNumber(number) {
  if (number === "." && result.includes(".")) {
    return;
  }
  result += number;
  updateDisplay();
}

// update result
function updateDisplay() {
  if (operation) {
    resultElement.innerText = `${previousOperand} ${operation} ${result}`;
  } else {
    resultElement.innerText = result;
  }
}

// select operator
function selectOperator(operatorValue) {
  if (result === "") {
    return;
  }

  if (operation !== "" && previousOperand !== "") {
    calculateResult();
  }

  operation = operatorValue;
  previousOperand = result;
  result = "";
  updateDisplay();
}

// calculate result
function calculateResult() {
  let evalutedResult;
  const prev = parseFloat(previousOperand);
  const current = result;

  if (isNaN(prev) || isNaN(current)) {
    return;
  }

  switch (operation) {
    case "+":
      evalutedResult = prev + current;
      console.log(evalutedResult);
      break;
    case "-":
      evalutedResult = prev - current;
      break;
    case "*":
      evalutedResult = prev * current;
      break;
    case "/":
      evalutedResult = prev / current;
      break;

    default:
      return;
  }

  result = evalutedResult.toString();
  operation = "";
  previousOperand = "";
}

// click number buttons
numbersBtn.forEach((button) => {
  button.addEventListener("click", function () {
    appendNumber(button.innerText);
  });
});

// click dot button
decimalBtn.addEventListener("click", function () {
  appendNumber(".");
});
addBtn.addEventListener("click", function () {
  selectOperator("+");
});
subtractBtn.addEventListener("click", function () {
  selectOperator("-");
});
multiplyBtn.addEventListener("click", function () {
  selectOperator("*");
});
divideBtn.addEventListener("click", function () {
  selectOperator("/");
});
equalBtn.addEventListener("click", function () {
  if (result === "") {
    return;
  }

  calculateResult();
  updateDisplay();
});
