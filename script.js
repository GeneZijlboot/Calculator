let operator = '';
let previousValue = '';
let currentValue = '';

document.addEventListener("DOMContentLoaded", function(){
    //Store all components on HTML in our Javascript file
    let clear = document.querySelector(".btnclear");
    let equal = document.querySelector(".btnequal");
    let decimal = document.querySelector(".decimal");

    let numbers = document.querySelectorAll(".btnnumber");
    let operators = document.querySelectorAll(".btnoperator");

    let previousScreen = document.querySelector(".previous");
    let currentScreen = document.querySelector(".current");

    numbers.forEach((number) => number.addEventListener('click', function(e) {
        handleNumber(e.target.textContent)
        currentScreen.textContent = currentValue;
    }))

    operators.forEach((op) => op.addEventListener('click', function(e){
        handleOperator(e.target.textContent);
        previousScreen.textContent = previousValue + " " + operator;
        currentScreen.textContent = currentValue;
    }))

    clear.addEventListener('click', function(){
        previousValue = '';
        currentValue = '';
        operator = '';
        previousScreen.textContent = currentValue;
        currentScreen.textContent = currentValue;
        console.log("cleared");
    })

    equal.addEventListener('click', function(){
        if(currentValue != '' && previousValue != ''){
            Calculate();
            previousScreen.textContent = '';
            if(previousValue.length <= 5){
                currentScreen.textContent = previousValue;
            } else {
                currentScreen.textContent = previousValue.slice(0.5) +  "...";
            } 
        }   
    })

    decimal.addEventListener('click', function(){
        addDecimal();
    })
})

function handleNumber(num) {
    if(currentValue.length <= 10){
    currentValue += num;
    }
}

function handleOperator(op) {
    operator = op;
    previousValue = currentValue;
    currentValue = '';
}

function Calculate(){
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);

    if(operator === "+") {
        previousValue += currentValue;
    } else if (operator === "-") {
        previousValue -= currentValue;
    } else if (operator === 'x') {
        previousValue *= currentValue;
    } else if (operator === '/') {
        previousValue /= currentValue;
    } else if (operator === '%') {
        previousValue %= currentValue;
    }

    previousValue = roundNumber(previousValue);
    previousValue = previousValue.toString();
    currentValue = previousValue.toString();
}

function roundNumber(num){
    return Math.round(num * 1000) / 1000;
}

function addDecimal(){
    if(!currentValue.includes(".")){
        currentValue += '.';
    }
}