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

    const setClickedNumber = (number) => {
        clickedNumber += number;
        return clickedNumber;
    }
    const pushNumberToFirstNumber = () => {
        creator.toggleFirstNumber(Number(clickedNumber))
    }

    const getClickedNumber = () => clickedNumber;

    const setClickedNumberToZero = () => {
        clickedNumber = '';
    }

    const clearNumbers = () => {
        numbers[0].toggleCurrentNumber(0);
        numbers[0].toggleResultNumber(0);
        clickedNumber = '';
    }

    return { pushNumberToFirstNumber, getClickedNumber, setClickedNumber, setClickedNumberToZero, clearNumbers };
}

const manager = manageNumbers();

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

       manager.setClickedNumber(num);
       currentNumberOnScreen.innerHTML = `${manager.getClickedNumber()}`;
    });
});

numberOperation.forEach((numOperation) => {
    numOperation.addEventListener('click', () => {
        let operate = numOperation.dataset.operation;
        manager.pushNumberToFirstNumber();
      
        if (creator.getFirstNumber() !== '') {
            currentNumberOnScreen.innerHTML = '';
          
            if (creator.getSecondNumber() === undefined) {
                creator.toggleSecondNumber(creator.getFirstNumber());
                creator.toggleFirstNumber('');
                creator.setOperation(operate);
            } 
      
            else {
                creator.toggleResultNumber(calculate(creator.getFirstNumber(), creator.getSecondNumber(), creator.getOperation())) ;
                creator.toggleSecondNumber(creator.getResultNumber());
                creator.toggleFirstNumber('');
                creator.setOperation(operate);
                
                totalNumberOnScreen.innerHTML = `${creator.getSecondNumber()}`;
            }
        }
        manager.setClickedNumberToZero();
        totalNumberOnScreen.innerHTML = `${creator.getSecondNumber()}` + `${creator.getOperation()}`;
    });
});
decimalOperation.addEventListener('click', () => {
    manager.setClickedNumber('.');
    currentNumberOnScreen.innerHTML = manager.getClickedNumber();
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

