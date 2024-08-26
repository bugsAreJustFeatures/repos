
//-----DOM-----//
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

//-----events for hovering-----//
emailLabel.addEventListener("mouseover", function() {
    emailInput.style.border = "3px solid black"
})

emailLabel.addEventListener("mouseout", function() {
    emailInput.style.border = "2px solid black"
})

countryLabel.addEventListener("mouseover", function() {
    countryInput.style.border = "3px solid black"
})

countryLabel.addEventListener("mouseout", function() {
    countryInput.style.border = "2px solid black"
})

postCodeLabel.addEventListener("mouseover", function() {
    postCodeInput.style.border = "3px solid black"
})

postCodeLabel.addEventListener("mouseout", function() {
    postCodeInput.style.border = "2px solid black"
})
passwordLabel.addEventListener("mouseover", function() {
    passwordInput.style.border = "3px solid black"
})

passwordLabel.addEventListener("mouseout", function() {
    passwordInput.style.border = "2px solid black"
})

passwordConfirmationLabel.addEventListener("mouseover", function() {
    passwordConfirmationInput.style.border = "3px solid black"
})

passwordConfirmationLabel.addEventListener("mouseout", function() {
    passwordConfirmationInput.style.border = "2px solid black"
})

//-----form validation-----//