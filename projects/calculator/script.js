// -----DOM--- //

let number1 = document.getElementById("n1");
let number2 = document.getElementById("n2");
let number3 = document.getElementById("n3");
let number4 = document.getElementById("n4");
let number5 = document.getElementById("n5");
let number6 = document.getElementById("n6");
let number7 = document.getElementById("n7");
let number8 = document.getElementById("n8");
let number9 = document.getElementById("n9");
let number0 = document.getElementById("n0");
let decimal = document.getElementById("decimal");
let equalSign = document.getElementById("equals");
let allClear = document.getElementById("allClear");
let add = document.getElementById("addSign");
let subtract = document.getElementById("subtractSign");
let multiply = document.getElementById("multiplySign");
let divide = document.getElementById("divideSign");
let plusMinus = document.getElementById("plusMinus");
let modulo = document.getElementById("modulo");
let answerBox = document.getElementById("answerBox");

// -----eventListeners-------- //
number1.addEventListener("click", () => {
    enterNums("1")
});
number2.addEventListener("click", () => {
    enterNums("2");
});
number3.addEventListener("click", () => {
    enterNums("3");
});
number4.addEventListener("click", () => {
    enterNums("4");
});
number5.addEventListener("click", () => {
    enterNums("5");
});
number6.addEventListener("click", () => {
    enterNums("6");
});
number7.addEventListener("click", () => {
    enterNums("7");
});
number8.addEventListener("click", () => {
    enterNums("8");
});
number9.addEventListener("click", () => {
    enterNums("9");
});
number0.addEventListener("click", () => {
    enterNums("0");
});
decimal.addEventListener("click", () => {
    enterNums(".");
});

// ----------equations events--------- //
let addResult;
let subtractResult;
let multiplyResult;
let divideResult;
let moduloResult;

let num1;
add.addEventListener("click", () => {
     addResult = parseFloat(answerBox.textContent) || 0;
    answerBox.textContent = "";
});

let num3;
subtract.addEventListener("click", () => {
    subtractResult = parseFloat(answerBox.textContent) || 0;
    answerBox.textContent = "";
})

let num4;
multiply.addEventListener("click", () => {
    multiplyResult = parseFloat(answerBox.textContent) || 0;
    answerBox.textContent = "";
})

let num5;
divide.addEventListener("click", () => {
    divideResult = parseFloat(answerBox.textContent) || 0;
    answerBox.textContent = "";
})

allClear.addEventListener("click", () => {
    answerBox.textContent = "";

    addResult = undefined;
    subtractResult = undefined;
    multiplyResult = undefined;
    divideResult = undefined;
});

equalSign.addEventListener("click", () => {
    let num2 = parseFloat(answerBox.textContent);

    if (addResult !== undefined) {
        answerBox.textContent = addResult + num2;
    } else if (subtractResult !== undefined) {
        answerBox.textContent = subtractResult - num2;
    } else if (multiplyResult !== undefined) {
        answerBox.textContent = multiplyResult * num2;
    } else if (divideResult !== undefined) {
        answerBox.textContent = divideResult / num2;
    } 
});

plusMinus.addEventListener("click", () => {
    let currentValue = parseFloat(answerBox.textContent);
    if (!isNaN(currentValue)) {
        answerBox.textContent = -currentValue;
    }
});

modulo.addEventListener("click", () => {
    moduloResult = parseFloat(answerBox.textContent) || 0;
    answerBox.textContent = moduloResult / 100;
})


// ------entering numbers into calculator-------- //
function enterNums(x) {
    if (x === "." && answerBox.textContent.includes(".")) {
        return;
    }
    answerBox.textContent += x;
};

// -----keyboard support------//
document.addEventListener("keydown", handleKeyDown);

let keyActions = {
    "+": () => add.click(),
    "-": () => subtract.click(),
    "*": () => multiply.click(),
    "/": () => divide.click(),
    "%": () => modulo.click(),
    "Enter": () => equalSign.click(),
    "Escape": () => allClear.click(),
    "Backspace": () => {
        answerBox.textContent = answerBox.textContent.slice(0, -1);
    }
};

function handleKeyDown(event) {
    let key = event.key;

    if (!isNaN(key) || key === ".") {
        enterNums(key);
    }

    if (keyActions.hasOwnProperty(key)) {
        keyActions[key]();
    }
};

