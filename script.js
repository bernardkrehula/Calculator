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
    const resetFirstNumber = () => { firstNumber = '' };
    const setFirstNumber = (value) => { firstNumber += value };
    const getSecondNumber = () => { return secondNumber };
    const setSecondNumber = (value) => { secondNumber = value };
    const getOperation = () => { return operation };
    const setOperation = (value) => { operation = value };
    const getResultNumber = () => { return result };
    const setResultNumber = (value) => { result = value };

    return { getFirstNumber, setFirstNumber, resetFirstNumber, getSecondNumber, setSecondNumber, getOperation, setOperation, getResultNumber, setResultNumber }; 
}

const creator = numbersCreator();

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
       creator.setFirstNumber(num);
       currentNumberOnScreen.innerHTML = `${creator.getFirstNumber()}`;
    });
});

numberOperation.forEach((numOperation) => {
    numOperation.addEventListener('click', () => {
        let operate = numOperation.dataset.operation;

       
        if (creator.getFirstNumber() !== '') {
            currentNumberOnScreen.innerHTML = '';
          
            if (creator.getSecondNumber() === undefined) {
                creator.setSecondNumber(creator.getFirstNumber());
                creator.resetFirstNumber();
                creator.setOperation(operate);
            } 
      
            else {
               
                creator.setResultNumber(calculate(Number(creator.getFirstNumber()), Number(creator.getSecondNumber()), creator.getOperation()));
        
                creator.setSecondNumber(creator.getResultNumber());
                creator.resetFirstNumber();
                creator.setOperation(operate);
                
                totalNumberOnScreen.innerHTML = `${creator.getSecondNumber()}`;
            }
        }
        totalNumberOnScreen.innerHTML = `${creator.getSecondNumber()}` + `${creator.getOperation()}`;
    });
});
decimalOperation.addEventListener('click', () => {
    creator.setFirstNumber('.');
    currentNumberOnScreen.innerHTML = creator.getFirstNumber();
})
equalsBtn.addEventListener('click', () => {
    creator.setResultNumber(calculate(Number(creator.getFirstNumber()), Number(creator.getSecondNumber()), creator.getOperation()));
    currentNumberOnScreen.innerHTML = creator.getResultNumber();
    totalNumberOnScreen.innerHTML = '';
});

clearBtn.addEventListener('click', () => {
    creator.resetFirstNumber();
    creator.setSecondNumber(undefined);
    creator.setResultNumber(0);
    creator.setOperation(undefined);
    currentNumberOnScreen.innerHTML = '';
    totalNumberOnScreen.innerHTML = ``;
});

deleteBtn.addEventListener('click', () => {
    let firstNumber =  creator.getFirstNumber().slice(0, -1);

    creator.resetFirstNumber();
    creator.setFirstNumber(firstNumber);
    currentNumberOnScreen.innerHTML = `${creator.getFirstNumber()}`;
});