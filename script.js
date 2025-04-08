const clearBtn = document.querySelector('.clearBtn');
const deleteBtn = document.querySelector('.deleteBtn');
const numbers = document.querySelectorAll('[data-number]');
const numberOperation = document.querySelectorAll('[data-operation]');
const currentNumberOnScreen = document.querySelector('.calculatorScreen h1');
const totalNumberOnScreen = document.querySelector('.calculatorScreen h2');

function numbersCreator() {
    let id = crypto.randomUUID();
    let currentNumber = 0;
    let totalNumber = 0;

    const getId = () => { return id };
    const getCurrentNumber = () => { return currentNumber };
    const toggleCurrentNumber = (value) => { currentNumber = value };
    const getTotalNumber = () => { return totalNumber };
    const toggleTotalNumber = (value) => { totalNumber = value };
    
    return { getId, getCurrentNumber, toggleCurrentNumber, getTotalNumber, toggleTotalNumber }; 
}

function manageNumbers() {
    const numbers = [];
    let clickedNumber = '';
    const pushNumberInArray = () => numbers.push(numbersCreator());

    const getClickedNumber = (number) => {
        return clickedNumber += number;
    }
    const pushClickedNumberInArray = () => {
        numbers[0].toggleCurrentNumber(Number(clickedNumber));
    }
    const moveCurrentNumberToTotalNumber = () =>  {
        clickedNumber = 0;
        numbers[0].toggleTotalNumber(numbers[0].getCurrentNumber());
        numbers[0].toggleCurrentNumber(0);
    }
    const returnCurrentNumber = () => {
        return numbers[0].getCurrentNumber();
    }
    const returnTotalNumber = () => {
        return numbers[0].getTotalNumber();
    }
    const sum = () => {
        let suma = returnCurrentNumber() + returnTotalNumber();
        numbers[0].toggleCurrentNumber(suma);
        
    }
    const subtraction = () => {
        let subtract = returnCurrentNumber() - returnTotalNumber();
        numbers[0].toggleCurrentNumber(subtract);
    }
    const multiplication = () => {
        console.log(returnCurrentNumber())
        console.log(returnTotalNumber())
        let multiple = returnCurrentNumber() * returnTotalNumber();
        numbers[0].toggleCurrentNumber(multiple);
    }
    const division = () => {
        let divide = returnCurrentNumber() / returnTotalNumber()
        numbers[0].toggleCurrentNumber(divide);
    }
    const clearNumbers = () => {
        numbers[0].toggleCurrentNumber(0);
        numbers[0].toggleTotalNumber(0);
    }
    const returnArray = () => { return numbers[0].getTotalNumber() };
    return { sum, subtraction, multiplication, division, returnArray, getClickedNumber, pushNumberInArray, pushClickedNumberInArray, moveCurrentNumberToTotalNumber, returnCurrentNumber, returnTotalNumber, clearNumbers };
}

const manager = manageNumbers();
manager.pushNumberInArray();

function displayNumbers(number) {
    currentNumberOnScreen.innerHTML = `${number}`;
}
numbers.forEach((number) => {
    number.addEventListener('click', () => {
        manager.getClickedNumber(number.dataset.number)
        manager.pushClickedNumberInArray();
        displayNumbers(manager.returnCurrentNumber());
    })
})
numberOperation.forEach((numOperation) => {
    numOperation.addEventListener('click', () => {
        let operation = numOperation.dataset.operation;

        if(operation == '+'){
            manager.sum();
        }
        if(operation == '-'){
            manager.subtraction();
        }
        if(operation == '*'){
            manager.multiplication();
        }
        if(operation == '/'){
            manager.division();
        }
        manager.moveCurrentNumberToTotalNumber();
        currentNumberOnScreen.innerHTML = '';
        totalNumberOnScreen.innerHTML = `${manager.returnArray()}`
    });
})
clearBtn.addEventListener('click', () => {
    manager.clearNumbers();
})