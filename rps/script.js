humanPoint = 0;
computerPoint = 0;

function getComputerChoice() {
    let choices = ["rock", "paper", "scissors"]
    return choices [Math.floor(Math.random() * choices.length)]
}
 

function playerSelection() {
    return prompt(String("rock, paper or scissors")).toLowerCase()
}

function playRound(playerSelection, getComputerChoice) { 


    if ((playerSelection == "rock" && getComputerChoice == "scissors") || 
    (playerSelection == "paper" && getComputerChoice == "rock") || 
    (playerSelection == "scissors" && getComputerChoice == "paper")) {          
    console.log(playerSelection + " beats " + getComputerChoice + " , You Win! ");
    humanPoint++;


    } else if ((playerSelection == "rock" && getComputerChoice == "paper") || 
    (playerSelection == "paper" && getComputerChoice == "scissors") || 
    (playerSelection == "scissors" && getComputerChoice == "rock")) {
    console.log(getComputerChoice + " beats " + playerSelection + " , You Lose! ");    
    computerPoint++;

    } else if (playerSelection == getComputerChoice) {
    console.log("Both players selected " + playerSelection  + " , It's a Draw. Play Again ") 

    } else console.log("Please check your answer and play again.");

    console.log(humanPoint + " : " + computerPoint)
}


function game() {
    
    while(humanPoint < 5 && computerPoint < 5) {
        playRound(playerSelection(), getComputerChoice())
    }


    console.log("You " + humanPoint + " : " + computerPoint + " Computer")
}

game()
