class Operation {

    constructor(numA, numB, operation, idNumber) {

        this.numA = numA;
        this.numB = numB;
        this.operation = operation;
        this.iD = idNumber;

        operations_Array.push(this);
        if (operations_Array.length > 8) {
            operations_Array.shift();
        }
    }

    returnOperand() {
        switch (this.operation) {
            case '+':
                return this.numA + this.numB;
            case '-':
                return this.numA - this.numB;
            case '*':
                return this.numA * this.numB;
            case '/':
                if (this.numB == 0) {
                    alert('stop that.');
                    return;
                }
                return this.numA / this.numB;
            default:
                return 0;
        }
    }

    returnProcessString() {
        return this.numA.toString() + ' ' + this.operation + ' ' + this.numB.toString() + ' ' + this
            .returnOperand().toString();
    }
}

class Calculator {

    // TODO: REWORK THIS TO HAVE A CLEAR LINE FUNCTION, NOT JUST THE ALL CLEAR.

    constructor(previousDisplay, currentDisplay) {
        this.previousDisplay = previousDisplay;
        this.currentDisplay = currentDisplay;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) {
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') {
            return;
        }
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {

        const _prev = parseFloat(this.previousOperand);
        const _curr = parseFloat(this.currentOperand);

        if (isNaN(_prev) || isNaN(_curr)) {
            return;
        }

        var comp = new Operation(_prev, _curr, this.operation, 1);
        // operations_Array.push(comp);

        this.updateHistory();

        this.clear();

        this.currentOperand = comp.returnOperand();
    }

    updateDisplay() {
        if (this.operation === undefined) {
            this.operation = '';
        }
        this.currentDisplay.innerText = this.currentOperand;
        this.previousDisplay.innerText = this.previousOperand + " " + this.operation;
    }

    updateHistory() {
        // TODO: CONSIDER MOVING THIS TO UPDATE DISPLAY METHOD.
        for (var i = 0; i < operations_Array.length; i++) {
            // console.log(operations_Array[i].returnProcessString());
            historyDisplayItems[i].innerText = operations_Array[i].returnProcessString();
        }
    }

    clearAllHistory() {
        operations_Array.length = 0;
        updateHistory();
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');

const historyDisplayItems = document.querySelectorAll('[data-history-item]');
const historyClearButton = document.querySelector('[data-clear-history]');

const allclearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalButton = document.querySelector('[data-equals]');

const previousDisplay = document.querySelector('[data-previous]');
const currentDisplay = document.querySelector('[data-current]');

var operations_Array = [];

const calculator = new Calculator(previousDisplay, currentDisplay);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

allclearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

equalButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});

historyClearButton.addEventListener('click', button => {
    calculator.clearAllHistory();
    calculator.updateHistory();
    calculator.updateDisplay();
});

// KEYBOARD NUMBERS
document.addEventListener('keydown', function (event) {
    if (event.keyCode == 48) {
        calculator.appendNumber('0');
        calculator.updateDisplay();
    } else if (event.keyCode == 49) {
        calculator.appendNumber('1');
        calculator.updateDisplay();
    } else if (event.keyCode == 50) {
        calculator.appendNumber('2');
        calculator.updateDisplay();
    } else if (event.keyCode == 51) {
        calculator.appendNumber('3');
        calculator.updateDisplay();
    } else if (event.keyCode == 52) {
        calculator.appendNumber('4');
        calculator.updateDisplay();
    } else if (event.keyCode == 53) {
        calculator.appendNumber('5');
        calculator.updateDisplay();
    } else if (event.keyCode == 54) {
        calculator.appendNumber('6');
        calculator.updateDisplay();
    } else if (event.keyCode == 55) {
        calculator.appendNumber('7');
        calculator.updateDisplay();
    } else if (event.keyCode == 56) {
        calculator.appendNumber('8');
        calculator.updateDisplay();
    } else if (event.keyCode == 57) {
        calculator.appendNumber('9');
        calculator.updateDisplay();
    } else if (event.keyCode == 110) {
        calculator.appendNumber('.');
        calculator.updateDisplay();
    }
});

// KEYBOARD OPERATIONS
document.addEventListener('keydown', e => {
    if (e.keyCode == 107) {
        calculator.chooseOperation('+');
        calculator.updateDisplay();
    } else if (e.keyCode == 109) {
        calculator.chooseOperation('-');
        calculator.updateDisplay();
    } else if (e.keyCode == 106) {
        calculator.chooseOperation('*');
        calculator.updateDisplay();
    } else if (e.keyCode == 111) {
        calculator.chooseOperation('/');
        calculator.updateDisplay();
    }
});

// KEYBOARD CONTROL
document.addEventListener('keydown', e => {
    if (e.keyCode == 13) {
        calculator.compute();
        calculator.updateDisplay();
    }
});
document.addEventListener('keydown', e => {
    if (e.keyCode == 12) {
        calculator.clear();
        calculator.updateDisplay();
    }
});
document.addEventListener('keydown', e => {
    if (e.keyCode == 8) {
        calculator.delete();
        calculator.updateDisplay();
    }
});