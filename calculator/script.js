// -----DOM--- //

function enterNums(x, y) {
    document.getElementById("answerBox").textContent = x;
    
} 

document.getElementById("n1").addEventListener("click", () => {
    enterNums("1");
});
document.getElementById("n2").addEventListener("click", () => {
    enterNums("2");
});
document.getElementById("n3").addEventListener("click", () => {
    enterNums("3");
});
document.getElementById("n4").addEventListener("click", () => {
    enterNums("4");
});
document.getElementById("n5").addEventListener("click", () => {
    enterNums("5");
});
document.getElementById("n6").addEventListener("click", () => {
    enterNums("6");
});
document.getElementById("n7").addEventListener("click", () => {
    enterNums("7");
});
document.getElementById("n8").addEventListener("click", () => {
    enterNums("8");
});
document.getElementById("n9").addEventListener("click", () => {
    enterNums("9");
});
document.getElementById("n0").addEventListener("click", () => {
    enterNums("0");
});
document.getElementById("decimal").addEventListener("click", () => {
    enterNums(".");
});











// ------Logic-------- //

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



