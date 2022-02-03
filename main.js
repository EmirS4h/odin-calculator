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
  if (!num1) num1 = Number(currentCalculationText.textContent);
  previousCalculationText.textContent = num1 + " " + operator;
  currentCalculationText.textContent = "";
};

const updateDisplay = () => {
  previousCalculationText.textContent = `${num1} ${operator} ${num2} =`;
};

const equals = () => {
  if (!num1) return;
  if (!num2) num2 = Number(currentCalculationText.textContent);
  updateDisplay();
  num1 = calculate(num1, num2, operator);
  currentCalculationText.textContent = num1;
};

equalsBtn.addEventListener("click", () => {
  equals();
});

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    addOperator(btn.textContent);
  });
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
  if (e.key >= 0 || e.key <= 9 || e.key === ".") {
    if (currentCalculationText.textContent.includes(".") && e.key === ".")
      return;
    currentCalculationText.textContent += e.key;
  } else if (e.key === "Backspace") {
    currentCalculationText.textContent =
      currentCalculationText.textContent.slice(0, -1);
  } else if (e.code === "Enter" || e.code === "NumpadEnter") {
    equals();
  } else if (e.key === "+") {
    addOperator("+");
  } else if (e.key === "-") {
    addOperator("-");
  } else if (e.key === "*") {
    addOperator("x");
  } else if (e.key === "/") {
    addOperator("/");
  }
});
