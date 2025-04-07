const clearBtn = document.querySelector('.clearBtn');
const deleteBtn = document.querySelector('.deleteBtn');
const numbers = document.querySelectorAll('[data-number]');
const numberOperation = document.querySelectorAll('[data-operation]');
const currentNumberOnScreen = document.querySelector('.calculatorScreen h1');

function numbersCreator() {
    let id = crypto.randomUUID();
    let currentNumber = 0;
    let totalNumber = 0;

    const getId = () => { return id };
    const getCurrentNumber = () => { return currentNumber };
    const toggleCurrentNumber = (value) => { currentNumber = value };
    const getTotalNumber = () => { return totalNumber };
    const toggleTotalNumber = (value) => { };
    
    return { getId, getCurrentNumber, toggleCurrentNumber, getTotalNumber, toggleTotalNumber }; 
}

function manageNumbers() {
    const numbers = [];
    let currentNumber = 0;
    let totalNumber = 0;
    let clickedNumberString = '';

    const getClickedNumberForScreen = (number) => {
        return clickedNumberString += number;
    }
    const sum = () => {
        currentNumber += parseInt(clickedNumberString);
        totalNumber += currentNumber;
        return totalNumber;
    }
    const subtraction = () => {

    }
    const multiplication = () => {

    }
    const division = () => {

    }
    const returnArray = () => { return numbers };
    return { sum, subtraction, multiplication, division, returnArray, getClickedNumberForScreen };
}

const manager = manageNumbers();

function displayNumbers(number) {
    currentNumberOnScreen.innerHTML = `${number}`;
}
numbers.forEach((number) => {
    number.addEventListener('click', () => {
        displayNumbers(manager.getClickedNumber(number.dataset.number))
    })
})
numberOperation.forEach((operation) => {
    operation.addEventListener('click', () => {
        let calculatingOperationsString = operation.dataset.operation;
      
        if(calculatingOperationsString == '+'){
            manager.sum()
        }
        if(calculatingOperationsString == '*'){
            console.log('radi')
        }
        if(calculatingOperationsString == '-'){
            console.log('radi')
        }
        if(calculatingOperationsString == '/'){
            console.log('radi')
        }
    })
})