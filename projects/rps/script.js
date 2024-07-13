// DOM
// button function
function createButton(text) {
    const button = document.createElement("button");
    button.textContent = text;
    button.style.width = "150px";
    button.style.height = "50px";
    button.style.fontSize = "20px";
    button.style.marginLeft = "30px"; 
    document.body.appendChild(button);
    return button;
}
// creation of buttons
const rockBtn = createButton('rock');
const paperBtn = createButton('paper');
const scissorsBtn = createButton('scissors');

// div displays the scores
const scoresDiv = document.createElement('div');
scoresDiv.style.margin = "100px";
scoresDiv.style.maxWidth = "300px";
document.body.appendChild(scoresDiv);

// div displays end of round message
const messageDiv = document.createElement('div');
messageDiv.style.margin = "100px";
messageDiv.style.maxWidth = "300px";
document.body.appendChild(messageDiv);

document.body.style.backgroundColor = "#41B3A3";

// JS code
let humanPoint = 0;
let computerPoint = 0;

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"]
    return choices[Math.floor(Math.random() * choices.length)]
}

function playRound(playerSelection) {
    let computerSelection = getComputerChoice()

    if ((playerSelection == "rock" && computerSelection == "scissors") ||
        (playerSelection == "paper" && computerSelection == "rock") ||
        (playerSelection == "scissors" && computerSelection == "paper")) {
        humanPoint++;
        messageDiv.textContent = playerSelection + " beats " + computerSelection;

    } else if ((playerSelection == "rock" && computerSelection == "paper") ||
        (playerSelection == "paper" && computerSelection == "scissors") ||
        (playerSelection == "scissors" && computerSelection == "rock")) {
        computerPoint++;
        messageDiv.textContent = computerSelection + " beats " + playerSelection;

    } else {
        messageDiv.textContent = "Both players selected " + playerSelection + " , It's a Draw. Play Again "
    };

    scoresDiv.textContent = "Your Score " + humanPoint + " : " + computerPoint + " Computer Score ";

    game();
};

function game() {
    if (humanPoint == 5) {
        messageDiv.textContent = "Congratulations, You have won " + humanPoint + " : " + computerPoint; resetGamePlaWins();
    } else if (computerPoint == 5) {
        messageDiv.textContent = "Bad luck, You have lost " + humanPoint + " : " + computerPoint; resetGameComWins();
    }
};

function resetGameComWins() {

   messageDiv.textContent = "Bad luck, You have lost " + humanPoint + " : " + computerPoint; 
   humanPoint = 0;
   computerPoint = 0;
}
function resetGamePlaWins() {

    messageDiv.textContent = "Congratulations, You have won " + humanPoint + " : " + computerPoint;  
    humanPoint = 0;
    computerPoint = 0; 
 }

rockBtn.addEventListener("click", () => { playRound("rock")});
paperBtn.addEventListener("click", () => { playRound("paper")});
scissorsBtn.addEventListener("click", () => { playRound("scissors")});
