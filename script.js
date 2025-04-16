const clearBtn = document.querySelector('.clearBtn');
const deleteBtn = document.querySelector('.deleteBtn');
const equalsBtn = document.querySelector('[data-equals]');
const numbers = document.querySelectorAll('[data-number]');
const numberOperation = document.querySelectorAll('[data-operation]');
const decimalOperation = document.querySelector('[data-decimal]')
const currentNumberOnScreen = document.querySelector('.calculatorScreen h1');
const totalNumberOnScreen = document.querySelector('.calculatorScreen h2');

/* function numbersCreator() {
    let currentNumber = 0;
    let totalNumber = 0;
    let result = 0;

    const getCurrentNumber = () => { return currentNumber };
    const toggleCurrentNumber = (value) => { currentNumber = value };
    const getTotalNumber = () => { return totalNumber };
    const toggleTotalNumber = (value) => { totalNumber = value };
    const getResultNumber = () => { return result };
    const toggleResultNumber = (value) => { result = value };

    return { getCurrentNumber, toggleCurrentNumber, getTotalNumber, toggleTotalNumber, getResultNumber, toggleResultNumber }; 
}



function manageNumbers() {
    const numbers = [];
    let clickedNumber = '';
    let currentOperation = '';
    let operation = '';

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
        currentOperation = '';
    }

    return { moveCurrentNumberToResultNumber, getOperation, setOperation, returnResultNumber, sum, subtraction, multiplication, division, returnArray, getClickedNumber, pushNumberInArray, pushClickedNumberInArray, setCurrentNumberToZero, returnCurrentNumber, returnTotalNumber, clearNumbers, getClicked, setClicked };
}



const manager = manageNumbers();
manager.pushNumberInArray();

function displayNumbers(number) {
    currentNumberOnScreen.innerHTML = number.getCurrentNumber();
    totalNumberOnScreen.innerHTML = number.getResultNumber();
}
 */
let firstNumber = '';
let secondNumber;
let result = 0;
let operation;

//Napravi funckiju calculate
//Onda prima 3 argumenta a,b i operation


//Onemoguciti dijeljenje s 0 ako se dijeli s 0 mora baciti error
function calculate(a, b, operation) {
    switch (operation) {
        case '+':
            return b + a;
        case '-':
            return b - a;
        case '*':
            return b * a;
        case '/':
            return b / a;
    }
}


numbers.forEach((number) => {
    number.addEventListener('click', () => {
       //Puni prvi broj ovaj listener
       let num = number.dataset.number;
       firstNumber += num;
       currentNumberOnScreen.innerHTML = `${firstNumber}`;
    });
});
           /*   console.log('first number: ', firstNumber);
       console.log('second number: ', secondNumber);
       console.log('operation: ', operation); */
numberOperation.forEach((numOperation) => {
    numOperation.addEventListener('click', () => {
        let operate = numOperation.dataset.operation;

       
        if (firstNumber !== '') {
            firstNumber = Number(firstNumber);
            currentNumberOnScreen.innerHTML = '';
          
            if (secondNumber === undefined) {
                secondNumber = firstNumber;
                firstNumber = '';
                operation = operate;
            } 
      
            else {
               
                result = calculate(firstNumber, secondNumber, operation);
                console.log("Rezultat:", result);

        
                secondNumber = result;
                firstNumber = '';
                operation = operate;
                
                totalNumberOnScreen.innerHTML = `${secondNumber}`;
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

