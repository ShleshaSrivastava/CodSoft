// Select elements
const display = document.getElementById("result");
const operatorDisplay = document.getElementById("operator-display");
const buttons = document.querySelectorAll("button");

// Initialize variables
let currentInput = "";
let firstOperand = "";
let operator = "";
let waitingForSecondOperand = false;

// Event listeners for button clicks
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonText = button.textContent;

        if (buttonText === "C") {
            clear();
        } else if (buttonText === "=") {
            calculate();
        } else if (isNumber(buttonText) || buttonText === ".") {
            appendNumber(buttonText);
        } else {
            handleOperator(buttonText);
            updateOperatorDisplay(); // Update the operator display
        }
    });
});

// Functions for calculator operations
function appendNumber(number) {
    if (waitingForSecondOperand) {
        currentInput = number;
        waitingForSecondOperand = false;
    } else {
        currentInput += number;
    }
    display.value = currentInput;
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === "") {
        firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation();
        display.value = result;
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
}

function performCalculation() {
    const inputValue = parseFloat(currentInput);

    switch (operator) {
        case "+":
            return firstOperand + inputValue;
        case "-":
            return firstOperand - inputValue;
        case "*":
            return firstOperand * inputValue;
        case "/":
            if (inputValue === 0) {
                return "Error";
            }
            return firstOperand / inputValue;
        default:
            return inputValue;
    }
}

function clear() {
    currentInput = "";
    firstOperand = "";
    operator = "";
    waitingForSecondOperand = false;
    display.value = "";
    updateOperatorDisplay(); // Clear the operator display
}

function calculate() {
    if (operator && !waitingForSecondOperand) {
        const result = performCalculation();
        display.value = result;
        currentInput = result;
        firstOperand = "";
        operator = "";
        waitingForSecondOperand = true;
        updateOperatorDisplay(); // Clear the operator display
    }
}

function isNumber(value) {
    return !isNaN(value);
}

// Function to update the operator display
function updateOperatorDisplay() {
    operatorDisplay.textContent = operator ? `Operator: ${operator}` : "";
}
