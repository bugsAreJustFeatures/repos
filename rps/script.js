function getComputerChoice() {
    let choices = ["rock", "paper", "scissors"]
    return choices [Math.floor(Math.random() * choices.length)]
}
 

function playerSelection() {
    return prompt(String("rock, paper or scissors")).toLowerCase()
}

function playRound(playerSelection, getComputerChoice) { 

    let computerPoint = 0
    let humanPoint = 0


    if ((playerSelection == "rock" && getComputerChoice == "scissors") || 
    (playerSelection == "paper" && getComputerChoice == "rock") || 
    (playerSelection == "scissors" && getComputerChoice == "paper")) {          
    console.log(playerSelection + " beats " + getComputerChoice + " , You Win! ");
    humanPoint+= 1;


    } else if ((playerSelection == "rock" && getComputerChoice == "paper") || 
    (playerSelection == "paper" && getComputerChoice == "scissors") || 
    (playerSelection == "scissors" && getComputerChoice == "rock")) {
    console.log(getComputerChoice + " beats " + playerSelection + " , You Lose! ");    
    computerPoint+= 1 ;

    } else if (playerSelection == getComputerChoice) {
    console.log("Both players selected " + playerSelection  + " , It's a Draw. Play Again ") 

    } else console.log("Please check your answer and play again.");

    console.log(humanPoint + " : " + computerPoint)
}


function game(humanPoint, computerPoint) {

    let humanScore = humanPoint
    let computerScore = computerPoint 

    playRound(playerSelection(), getComputerChoice())
    playRound(playerSelection(), getComputerChoice())
    playRound(playerSelection(), getComputerChoice())
    playRound(playerSelection(), getComputerChoice())
    playRound(playerSelection(), getComputerChoice())

    console.log("You " + humanScore + " : " + computerScore + " Computer")
}

game()
