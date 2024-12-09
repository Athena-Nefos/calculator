//  -------> what do we need for a calculator?

// -------->  Characters? Operators needed, Screen, keys, querySelectors ( turn calculator on and start with zero)

//Select necessary elements

const screen = document.getElementById('calScreen');
const numPad = document.getElementById('numPad');

//Data for Buttons
const buttons = ['7', '8', '9', '+',
                 '4', '5', '6', '-',
                 '1', '2', '3', '*',
                 'C', '0', '=', '/'
];

//Variables to store current state

let currentInput = '';
let operator = '';
let previousValue = '';

//Function to create and add buttons
buttons.forEach((btnText) => {
    const button = document.createElement('button');
    button.innerText = btnText;
    button.classList.add('btn');

    // Add event listener to button
    button.addEventListener('click', () => {
        handleButtonClick(btnText);
    });

    //Append button to numPad
    numPad.appendChild(button);

});

//Function to handle button clicks
function handleButtonClick(btnText) {
    if (!isNaN(btnText) || btnText === '0') {
        //If the button is a number
        currentInput += btnText;
        screen.innerText = currentInput;
    } else if (['+', '-', '*', '/'].includes(btnText)){
        //If the button is an operator
        if (currentInput !== '') {
        operator = btnText;
        previousValue = currentInput;
        currentInput = ' ';
        }
    } else if (btnText === '=') {
        //Calculate the results
        if (previousValue && currentInput && operator) {
            const result = calculateResult(previousValue, operator, currentInput);
            screen.innerText =result;
            previousValue = result; //Store result for further calculations
            currentInput = '';
            operator = '';
        }
    } else if (btnText === 'C') {
        //Clear Everything
        currentInput = '';
        previousValue = '';
        operator = '';
        screen.innerText = '0';
    }
}

//Function to perform the calculation
function calculateResult(num1, operator, num2) {
    num1 = parseFloat(num1); //Convert to number
    num2 = parseFloat(num2); //Convert to number

    switch (operator){
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num2 !== 0 ? num1 / num2 : 'Error'; //perform didvision and handle division by Zero
        default: 
            return 'Error';
    }
}
