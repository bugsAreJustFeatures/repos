

function num1(number1) {
    return number1;
}


function num2(number2) {
    return number2;
}

//operator functions
function add(num1, num2) {
    return num1 + num2;
}
function subtract(num1, num2) {
    return num1 - num2;
}
function multiply(num1, num2) {
    return num1 * num2;
}
function divide(num1, num2) {
    return num1 / num2;
}

function operate(a, b, sign) {
    if (sign == "+") {
        return add(a, b)
    } else if (sign == "-") {
        return subtract(a, b)
    } else if (sign == "*") {
        return multiply(a, b)
    } else if (sign == "/") {
        return divide(a, b)
    };
};


