let square1 = document.getElementById("square1")
let square2 = document.getElementById("square2")
let square3 = document.getElementById("square3")
let square4 = document.getElementById("square4")
let square5 = document.getElementById("square5")
let square6 = document.getElementById("square6")
let square7 = document.getElementById("square7")
let square8 = document.getElementById("square8")
let square9 = document.getElementById("square9")
let gameSquares = document.getElementsByClassName("gameSquare")

const orginalArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const newArr = []

let playerOneTurn;
let playerTwoTurn;


let playerTurnNumber = 0;
let turn;


console.log(playerTurnNumber)

function playerTurnController() {

    playerOneTurn = "&times;"
    playerTwoTurn = "&#9900;"
    
if (playerTurnNumber % 2 !== 0) {
    return playerOneTurn
} else 
    return playerTwoTurn
}

for (gameSquare of gameSquares) {
    gameSquare.addEventListener("click", function() {

    for (let i = 0; i < 1; i++) {
          // playerTurnNumber++;
    // playerTurnController()
    turn = playerTurnController();
    console.log(playerTurnNumber)

    if (this.innerHTML === "") {
        
        playerTurnNumber++;
        playerTurnController()
        turn = playerTurnController();
        this.innerHTML = turn;
        gameSquare = orginalArr[i]
        newArr.push(orginalArr[i])
        // orginalArr.splice(0, 1)

    // console.log("originalArr = " + orginalArr)
    // console.log(newArr)
    // console.log(turn)

    } else {
        playerTurnNumber--
        console.log("Already in use")
    } 

    }})
    };