const currentCalculationText = document.querySelector("#currentCalculation");
const previousCalculationText = document.querySelector("#previousCalculation");
const clearAllBtn = document.querySelector("[data-clear-all]");
const deleteBtn = document.querySelector("[data-delete]");
const equalsBtn = document.querySelector("[data-equals]");
const operatorBtns = document.querySelectorAll("[data-operator]");
const numBtns = document.querySelectorAll("[data-num]");

let operator = null;
let num1 = null;
let num2 = null;
let result = null;

const calculate = (a, b, op) => {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "x":
      return a * b;
    case "/":
      return a / b;
  }
};

const addOperator = (op) => {
  operator = op;
  num2 = null;
  if(!num1) num1 = Number(currentCalculationText.textContent);
  previousCalculationText.textContent = num1 + " " + operator;
  currentCalculationText.textContent = "";
};

const updateDisplay = () => {
  previousCalculationText.textContent = `${num1} ${operator} ${num2} =`;
}

equalsBtn.addEventListener("click", () => {
  if(!num2) num2 = Number(currentCalculationText.textContent);
  updateDisplay();
  num1 = calculate(num1, num2,operator)
  currentCalculationText.textContent = num1;
});

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    addOperator(btn.textContent);
  });
});

operatorBtns.forEach((btn) => {
  console.log(btn.textContent);
});
numBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (
      currentCalculationText.textContent.includes(".") &&
      btn.textContent === "."
    )
      return;
    currentCalculationText.textContent += btn.textContent;
  });
});

deleteBtn.addEventListener("click", () => {
  currentCalculationText.textContent = currentCalculationText.textContent.slice(
    0,
    -1
  );
});

clearAllBtn.addEventListener("click", () => {
  num1 = 0;
  num2 = 0;
  operation = null;
  currentCalculationText.textContent = "";
  previousCalculationText.textContent = "";
});

window.addEventListener("keydown", (e) => {
  if (e.key >= 0 || e.key <= 9) {
    currentCalculationText.textContent += e.key;
  } else if (e.key === "Backspace") {
    currentCalculationText.textContent =
      currentCalculationText.textContent.slice(0, -1);
  }
});
