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
    console.log(playerSelection + " beats " + getComputerChoice + " ,You Win! "); 

} else if ((playerSelection == "rock" && getComputerChoice == "paper") || 
    (playerSelection == "paper" && getComputerChoice == "scissors") || 
    (playerSelection == "scissors" && getComputerChoice == "rock")) {
    console.log(getComputerChoice + " beats " + playerSelection + " ,You Lose! ");

} else if (playerSelection == getComputerChoice) {
    console.log(playerSelection + " is the same as " + getComputerChoice + " ,It's a Draw ") 

} else console.log("An Error Has Occured, Please check your answer and play again.")
}





playRound(playerSelection(), getComputerChoice())






    




    



   







