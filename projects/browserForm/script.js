
//-----DOM-----//
const form = document.querySelector("form")
const inputBox = document.querySelectorAll("input");
let input;
for (let i = 0; i < inputBox.length; i++) {
    input = inputBox[i]
}

const emailLabel = document.getElementById("emailLabel");
const emailInput = document.getElementById("emailInput");

const countryLabel = document.getElementById("countryLabel");
const countryInput = document.getElementById("countryInput");

const postCodeLabel = document.getElementById("postCodeLabel");
const postCodeInput = document.getElementById("postCodeInput");

const passwordLabel = document.getElementById("passwordLabel");
const passwordInput = document.getElementById("passwordInput");

const passwordConfirmationLabel = document.getElementById("passwordConfirmationLabel");
const passwordConfirmationInput = document.getElementById("passwordConfirmationInput");

const submitBtn = document.getElementById("submitBtn");

//-----events for hovering-----//
emailLabel.addEventListener("mouseover", function() {
    emailInput.style.border = "3px solid black"
})

emailLabel.addEventListener("mouseout", function() {
    emailInput.style.border = ""
})

countryLabel.addEventListener("mouseover", function() {
    countryInput.style.border = "3px solid black"
})

countryLabel.addEventListener("mouseout", function() {
    countryInput.style.border = ""
})

postCodeLabel.addEventListener("mouseover", function() {
    postCodeInput.style.border = "3px solid black"
})

postCodeLabel.addEventListener("mouseout", function() {
    postCodeInput.style.border = ""
})
passwordLabel.addEventListener("mouseover", function() {
    passwordInput.style.border = "3px solid black"
})

passwordLabel.addEventListener("mouseout", function() {
    passwordInput.style.border = ""
})

passwordConfirmationLabel.addEventListener("mouseover", function() {
    passwordConfirmationInput.style.border = "3px solid black"
})

passwordConfirmationLabel.addEventListener("mouseout", function() {
    passwordConfirmationInput.style.border = ""
})



//-----form validation-----//

//function for checking email validity
//regex pattern variable that only allows ".com" and ".co.uk addresses"
let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|co\.uk)$/;
function emailFunction() { 
        //every time an input is made this function is ran through and then ...
         // ...resets message (is located inside the emailInput event on line 90)...
        if (!emailInput.checkValidity()) { // ...checks if emailInput is valid or not...
            emailInput.reportValidity() //...if invalid then sends messages...
        } else if (emailInput.checkValidity()) { //... if valid it checks email address and returns true allowing form to bee sent...
            if (emailPattern.test(emailInput.value)) {
                return true;
            } else { //...final message if email address is incorrect 
                emailInput.setCustomValidity("Please enter a valid '.com' or '.co.uk' email address. ")
            }
        }
    }

let zipPostCodePattern = /^(\d{5}(-\d{4})?|[A-Za-z]{1,2}\d[A-Za-z\d]? ?\d[A-Za-z]{2})$/;
function postCodeFunction() {

    //stop form from sending if zip/post code input is not valid
    if (!zipPostCodePattern.test(postCodeInput.value)) {
        postCodeInput.setCustomValidity("Please make sure you have entered a valid UK post code")
    } else {
        return true;
    }
}

let passwordPattern = /^(?=.{6,12}$)/;
function passwordFunction() {
    if (!passwordPattern.test(passwordInput.value)) {
        passwordInput.setCustomValidity("Password must be between 6 and 12 characters long")
    } else {
        return true;
    }
}

function passwordConfirmationFunction(e) {
    if ((passwordInput.value !== "") && (passwordInput.value === passwordConfirmationInput.value)) {
        return true;
    } else {
        passwordConfirmationInput.setCustomValidity("Passwords do not match");
}}

form.addEventListener("submit", function(event) {
    // stop form from sending if email input is not valid
    if (!emailInput.checkValidity()) {
        event.preventDefault()
        emailFunction() //check for validity of email field when submitting entire form
    };

    //stop form from sending if country input is not valid
    if (countryInput.value === "") { 
        event.preventDefault();
        countryInput.setCustomValidity("Please Select a country.")
        countryInput.reportValidity();
    };

    if (!postCodeInput.checkValidity()) {
        event.preventDefault();
        postCodeInput.reportValidity();
    };

    if (!passwordInput.checkValidity()) {
        event.preventDefault();
        passwordInput.reportValidity();
    };

    if (passwordFunction() && passwordConfirmationInput.checkValidity()) {
        passwordConfirmationFunction()
        } else {
            event.preventDefault();
            passwordConfirmationInput.reportValidity();
        }
    })

//event for checking email validity while filling in the field
emailInput.addEventListener("input", function() {
    emailInput.setCustomValidity("");
    emailFunction();
})

postCodeInput.addEventListener("input", function() {
    postCodeInput.setCustomValidity("");
    postCodeFunction();
})

passwordInput.addEventListener("input", function() {
    passwordInput.setCustomValidity("");
    passwordFunction();
})

passwordConfirmationInput.addEventListener("input", function() {
    passwordConfirmationInput.setCustomValidity("");
    passwordConfirmationFunction();
})



