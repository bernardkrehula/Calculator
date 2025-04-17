const clearBtn = document.querySelector('.clearBtn');
const deleteBtn = document.querySelector('.deleteBtn');
const equalsBtn = document.querySelector('[data-equals]');
const numbers = document.querySelectorAll('[data-number]');
const numberOperation = document.querySelectorAll('[data-operation]');
const decimalOperation = document.querySelector('[data-decimal]')
const currentNumberOnScreen = document.querySelector('.calculatorScreen h1');
const totalNumberOnScreen = document.querySelector('.calculatorScreen h2');

function numbersCreator() {
    let firstNumber = '';
    let secondNumber;
    let operation;
    let result = 0;

    const getFirstNumber = () => { return firstNumber };
    const toggleFirstNumber = (value) => { firstNumber = value };
    const getSecondNumber = () => { return secondNumber };
    const toggleSecondNumber = (value) => { secondNumber = value };
    const getOperation = () => { return operation };
    const setOperation = (value) => { operation = value };
    const getResultNumber = () => { return result };
    const toggleResultNumber = (value) => { result = value };

    return { getFirstNumber, toggleFirstNumber, getSecondNumber, toggleSecondNumber, getOperation, setOperation, getResultNumber, toggleResultNumber }; 
}

const creator = numbersCreator();

function manageNumbers() { 
    let clickedNumber = '';

    const getClickedNumber = (number) => {
        clickedNumber += number;
        return clickedNumber;
    }
    const convertStringToNumber = () => {
        clickedNumber = Number(clickedNumber);
    }

    const setCurrentNumberToZero = () => {
        clickedNumber = '';
        creator.toggleFirstNumber(0);
    }

    const returnFirstNumber = () => creator.getFirstNumber();
    const returnSecondNumber = () => creator.getSecondNumber();
    const returnResultNumber = () => creator.getResultNumber();

    const setClicked = (val) => { clickedNumber = val };
    const getClicked = () => clickedNumber;

    const getOperation = () => { return operation };
    const setOperation = (value) => { operation = value };

    const moveCurrentNumberToResultNumber = () => { numbers[0].toggleResultNumber(returnCurrentNumber()) }

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
        numbers[0].toggleResultNumber(multiplicate);
    }

    const division = () => {
        let divide = returnResultNumber() / returnCurrentNumber();
        numbers[0].toggleResultNumber(divide);
    }

    const clearNumbers = () => {
        numbers[0].toggleCurrentNumber(0);
        numbers[0].toggleResultNumber(0);
        clickedNumber = '';
    }

    return { convertStringToNumber, returnFirstNumber, returnResultNumber, returnSecondNumber, moveCurrentNumberToResultNumber, getOperation, setOperation, returnResultNumber, sum, subtraction, multiplication, division, getClickedNumber, setCurrentNumberToZero, clearNumbers, getClicked, setClicked };
}

const manager = manageNumbers();

let firstNumber = '';
let secondNumber;
let result = 0;
let operation;

function calculate(a, b, operation) {
    switch (operation) {
        case '+':
            return b + a;
        case '-':
            return b - a;
        case '*':
            return b * a;
        case '/':
            if(b / a === Infinity){
                return 'error'
            }
            else{
                return b / a;
            } 
    }
}


numbers.forEach((number) => {
    number.addEventListener('click', () => {
       let num = number.dataset.number;

       currentNumberOnScreen.innerHTML = `${firstNumber}`;
       manager.getClickedNumber(num)
    });
});

numberOperation.forEach((numOperation) => {
    numOperation.addEventListener('click', () => {
        let operate = numOperation.dataset.operation;
        creator.setOperation(operate);

        if (manager.returnFirstNumber() !== '') {
            firstNumber = Number(firstNumber);
            currentNumberOnScreen.innerHTML = '';
          
            if (manager.returnSecondNumber() === undefined) {
                manager.toggleSecondNumber(firstNumber);
                manager.toggleFirstNumber('');
                manager.setOperation(operate);
            } 
      
            else {
                manager.toggleResultNumber(calculate(firstNumber, secondNumber, operation)) ;
                manager.toggleSecondNumber(result);
                manager.toggleFirstNumber('');
                manager.setOperation(operate);
                
                totalNumberOnScreen.innerHTML = `${manager.getSecondNumber()}`;
            }
        }
        totalNumberOnScreen.innerHTML = `${secondNumber}` + `${operate}`;
    });
});
decimalOperation.addEventListener('click', () => {
    firstNumber = firstNumber + '.';
    currentNumberOnScreen.innerHTML = firstNumber;
})
equalsBtn.addEventListener('click', () => {
    result = calculate(Number(firstNumber), secondNumber, operation);
    currentNumberOnScreen.innerHTML = result;
    totalNumberOnScreen.innerHTML = '';
});

clearBtn.addEventListener('click', () => {
    firstNumber = '';
    secondNumber = undefined;
    result = 0;
    operation = undefined;
    currentNumberOnScreen.innerHTML = '';
    totalNumberOnScreen.innerHTML = ``;
});

deleteBtn.addEventListener('click', () => {
   firstNumber = firstNumber.slice(0, -1);
   currentNumberOnScreen.innerHTML = `${firstNumber}`;
});

