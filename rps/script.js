function getComputerChoice() {
    let choices = ["Rock", "Paper", "Scissors"]
    return choices [Math.floor(Math.random() * choices.length)]
}
 

function playerSelection() {
    return prompt(String("Rock, Paper or Scissors"))
}

function playRound(playerSelection, getComputerChoice) { 


if ((playerSelection == "Rock" && getComputerChoice == "Scissors") || 
    (playerSelection == "Paper" && getComputerChoice == "Rock") || 
    (playerSelection == "Scissors" && getComputerChoice == "Paper")) {
    console.log(playerSelection + " beats " + getComputerChoice + " ,You Win! "); 

} else if ((playerSelection == "Rock" && getComputerChoice == "Paper") || 
    (playerSelection == "Paper" && getComputerChoice == "Scissors") || 
    (playerSelection == "Scissors" && getComputerChoice == "Rock")) {
    console.log(getComputerChoice + " beats " + playerSelection + " ,You Lose! ");

} else if (playerSelection == getComputerChoice) 
    console.log(playerSelection + " is the same as " + getComputerChoice + " ,It's a Draw ") }




playRound(playerSelection(), getComputerChoice())






    




    



   







