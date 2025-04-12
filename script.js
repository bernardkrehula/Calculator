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
    let operation = 0;
    let result = 0;

    const getCurrentNumber = () => { return currentNumber };
    const toggleCurrentNumber = (value) => { currentNumber = value };
    const getTotalNumber = () => { return totalNumber };
    const toggleTotalNumber = (value) => { totalNumber = value };
    const setNumberAndOperation = (op, num) => { operation = op, num };
    const getNumberAndOperation = () => { return operation };
    const getResultNumber = () => { return result };
    const toggleResultNumber = (value) => { result = value };

    return { getCurrentNumber, toggleCurrentNumber, getTotalNumber, toggleTotalNumber, setNumberAndOperation, getNumberAndOperation, getResultNumber, toggleResultNumber }; 
}

function manageNumbers() {
    const numbers = [];
    let clickedNumber = '';
    let currentOperation = '';

    const pushNumberInArray = () => numbers.push(numbersCreator());

    const getClickedNumber = (number) => {
        clickedNumber += number;
        return clickedNumber;
    }

    const pushClickedNumberInArray = () => {
        numbers[0].toggleCurrentNumber(Number(clickedNumber));
    }

    const setCurrentNumberToZero = () => {
        clickedNumber = '';
        numbers[0].toggleCurrentNumber(0);
    }

    const returnCurrentNumber = () => numbers[0].getCurrentNumber();
    const returnTotalNumber = () => numbers[0].getTotalNumber();
    const returnResultNumber = () => numbers[0].getResultNumber();
    const returnArray = () => numbers[0];

    const setClicked = (val) => { clickedNumber = val };
    const getClicked = () => clickedNumber;

    const sum = () => {
        let suma = returnResultNumber() + returnCurrentNumber();
        numbers[0].toggleResultNumber(suma);
    }

    const subtraction = () => {
        let subtract = returnResultNumber() - returnCurrentNumber();
        numbers[0].toggleResultNumber(subtract);
    }

    const multiplication = () => {
        let multiplicate = returnResultNumber() * returnCurrentNumber();
        numbers[0].toggleCurrentNumber(multiplicate);
    }

    const division = () => {
        let divide = returnResultNumber() / returnCurrentNumber();
        numbers[0].toggleCurrentNumber(divide);
    }

    const clearNumbers = () => {
        numbers[0].toggleCurrentNumber(0);
        numbers[0].toggleResultNumber(0);
        clickedNumber = '';
        currentOperation = '';
    }

    return { returnResultNumber, sum, subtraction, multiplication, division, returnArray, getClickedNumber, pushNumberInArray, pushClickedNumberInArray, setCurrentNumberToZero, returnCurrentNumber, returnTotalNumber, clearNumbers, getClicked, setClicked };
}

const manager = manageNumbers();
manager.pushNumberInArray();

function displayNumbers(number) {
    currentNumberOnScreen.innerHTML = number.getCurrentNumber();
    totalNumberOnScreen.innerHTML = number.getResultNumber();
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
       
        console.log(getArrayNumber.getResultNumber()) 
        manager.setCurrentNumberToZero();
        
        getArrayNumber.setNumberAndOperation(operation, getArrayNumber.getTotalNumber());
        
        displayNumbers(getArrayNumber);
    });
});

equalsBtn.addEventListener('click', () => {
    const getArrayNumber = manager.returnArray();

    displayNumbers(getArrayNumber);
    totalNumberOnScreen.innerHTML = '';
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
