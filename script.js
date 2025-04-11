const clearBtn = document.querySelector('.clearBtn');
const deleteBtn = document.querySelector('.deleteBtn');
const equalsBtn = document.querySelector('[data-equals]');
const numbers = document.querySelectorAll('[data-number]');
const numberOperation = document.querySelectorAll('[data-operation]');
const currentNumberOnScreen = document.querySelector('.calculatorScreen h1');
const totalNumberOnScreen = document.querySelector('.calculatorScreen h2');

function numbersCreator() {
    let currentNumber = 0;
    let totalNumber = 0;

    const getCurrentNumber = () => { return currentNumber };
    const toggleCurrentNumber = (value) => { currentNumber = value };
    const getTotalNumber = () => { return totalNumber };
    const toggleTotalNumber = (value) => { totalNumber = value };

    return { getCurrentNumber, toggleCurrentNumber, getTotalNumber, toggleTotalNumber }; 
}

function manageNumbers() {
    const numbers = [];
    let clickedNumber = '';
    let currentOperation = '';
    let operation = 0;

    const pushNumberInArray = () => numbers.push(numbersCreator());

    const getClickedNumber = (number) => {
        clickedNumber += number;
        return clickedNumber;
    }

    const pushClickedNumberInArray = () => {
        numbers[0].toggleCurrentNumber(Number(clickedNumber));
    }

    const moveCurrentNumberToTotalNumber = () => {
        numbers[0].toggleTotalNumber(numbers[0].getCurrentNumber());
        clickedNumber = '';
        numbers[0].toggleCurrentNumber(0);
    }

    const returnCurrentNumber = () => numbers[0].getCurrentNumber();
    const returnTotalNumber = () => numbers[0].getTotalNumber();
    const returnArray = () => numbers[0].getCurrentNumber();

    const setClicked = (val) => { clickedNumber = val };
    const getClicked = () => clickedNumber;

    const setOperation = (op) => { currentOperation = op };
    const getOperation = () => currentOperation;

    const setNumberAndOperation = (op) => { operation = op };
    const getNumberAndOperation = () => { return operation };

    const sum = () => {
        numbers[0].toggleCurrentNumber(returnTotalNumber() + returnCurrentNumber());
    }

    const subtraction = () => {
        numbers[0].toggleCurrentNumber(returnTotalNumber() - returnCurrentNumber());
    }

    const multiplication = () => {
        numbers[0].toggleCurrentNumber(returnTotalNumber() * returnCurrentNumber());
    }

    const division = () => {
        numbers[0].toggleCurrentNumber(returnTotalNumber() / returnCurrentNumber());
    }

    const clearNumbers = () => {
        numbers[0].toggleCurrentNumber(0);
        numbers[0].toggleTotalNumber(0);
        clickedNumber = '';
        currentOperation = '';
    }

    return { setNumberAndOperation, getNumberAndOperation, sum, subtraction, multiplication, division, returnArray, getClickedNumber, pushNumberInArray, pushClickedNumberInArray, moveCurrentNumberToTotalNumber, returnCurrentNumber, returnTotalNumber, clearNumbers, getClicked, setClicked, setOperation, getOperation};
}

const manager = manageNumbers();
manager.pushNumberInArray();

function displayNumbers(number) {
    currentNumberOnScreen.innerHTML = number.getCurrentNumber();
}

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        const getArrayNumber = manager.returnArray();

        manager.getClickedNumber(number.dataset.number);
        manager.pushClickedNumberInArray();
        displayNumbers(getArrayNumber);
    });
});

numberOperation.forEach((numOperation) => {
    numOperation.addEventListener('click', () => {
        const operation = numOperation.dataset.operation;
        const getArrayNumber = manager.returnArray();

        if (operation === '+') manager.sum();
        if (operation === '-') manager.subtraction();
        if (operation === '*') manager.multiplication();
        if (operation === '/') manager.division();
        manager.setOperation(operation);
        manager.moveCurrentNumberToTotalNumber();
        manager.setNumberAndOperation(getArrayNumber.getTotalNumber() + operation);
        console.log(manager.getNumberAndOperation())
        totalNumberOnScreen.innerHTML = `${getArrayNumber.getTotalNumber()} ${operation}`;
        displayNumbers(getArrayNumber);
    });
});

equalsBtn.addEventListener('click', () => {
    const getArrayNumber = manager.returnArray();
    const operation = manager.getOperation();

    if (operation === '+') manager.sum();
    if (operation === '-') manager.subtraction();
    if (operation === '*') manager.multiplication();
    if (operation === '/') manager.division();

    displayNumbers(getArrayNumber);
    totalNumberOnScreen.innerHTML = '';
    manager.setOperation('');
});

clearBtn.addEventListener('click', () => {
    manager.clearNumbers();
    currentNumberOnScreen.innerHTML = '0';
    totalNumberOnScreen.innerHTML = '';
});

deleteBtn.addEventListener('click', () => {
    let value = manager.getClicked();
    value = value.slice(0, -1);
    manager.setClicked(value);

    if (value === '') {
        manager.returnArray().toggleCurrentNumber(0);
    } else {
        manager.returnArray().toggleCurrentNumber(Number(value));
    }

    displayNumbers(manager.returnArray());
});
