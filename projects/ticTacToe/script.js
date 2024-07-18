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
let modalMessage = document.getElementById("modalHeader")
let dialog = document.getElementById("resetModal")
let modalBtn = document.getElementById("modalBtn")
let usernameOneInput = document.getElementById("usernameOneInput")
let usernameTwoInput = document.getElementById("usernameTwoInput")
let playBtn = document.getElementById("playBtn");
let gameStatus = document.getElementById("gameStatus")

const orginalArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const newArr = []

let playerOneTurn; // X
let playerTwoTurn; // O 

let playerTurnNumber = 0;//used for chagning turns
let turn;// shows whos turn it is through the symbols

let playerOneName = "Player 1";
let playerTwoName = "Player 2";

function playerTurnController() {

    playerOneTurn = "&times;"
    playerTwoTurn = "&#9900;"
    
if (playerTurnNumber % 2 !== 0) {
    gameStatus.innerHTML = `${playerTwoName}'s Turn`
    return playerOneTurn
} else 
    gameStatus.innerHTML = `${playerOneName}'s Turn`
    return playerTwoTurn
}

for (gameSquare of gameSquares) {
    gameSquare.addEventListener("click", function() {

    for (let i = 0; i < 1; i++) {
    turn = playerTurnController();

    if (this.innerHTML === "") {
        
        playerTurnNumber++;
        playerTurnController()
        turn = playerTurnController();
        this.innerHTML = turn;
        gameSquare = orginalArr[i]
        newArr.push(orginalArr[i])
        winChecker()
    } else {
        playerTurnNumber-- && playerTurnNumber++
        gameStatus.innerHTML = "Square is already in use"
    } 

    }})
    };

    const board = ["", "", "", "", "", "", "", "", ""] //board that is used for games

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]; 

    function winChecker() {
        for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i]

        const cellA = gameSquares[condition[0]]
        const cellB = gameSquares[condition[1]]
        const cellC = gameSquares[condition[2]]

        if (cellA.innerHTML === "" || cellB.innerHTML === "" || cellC.innerHTML === "") {
            continue;
        } else if ((cellA.innerHTML === cellB.innerHTML) && (cellB.innerHTML === cellC.innerHTML)) {
                modalMessage.innerHTML = winnerMessage();
                dialog.showModal()
                stopGame();
                
            } else if (playerTurnNumber == 9) {
                modalMessage.innerHTML = "Draw";
                dialog.showModal()
                stopGame();
            }
        }
    }


    //just make board empty
    function resetBoard() {
        for (gameSquare of gameSquares) {
            gameSquare.innerHTML = ""
        };
    }
    //stops users from inputting into the board
    function stopGame() {
        for (gameSquare of gameSquares) {
            gameSquare.addEventListener("click", function() {
                this.innerHTML = this.innerHTML
            })
            
        };
    }


//is the message that is displayed on the modal that pops up when someone wins
function winnerMessage() {
    if (playerOneTurn) {
        return playerOneName + " has won!";
    } else {
        return playerTwoName + " has won!";
    }
}

//calls resetBoard() on the modal
modalBtn.addEventListener("click", function() {
    resetBoard()
})

//uses the input from usernames to make it interactive
playBtn.addEventListener("click", function() {
    playerOneName = usernameOneInput.value
    playerTwoName = usernameTwoInput.value

    usernameOneInput.value = ""
    usernameTwoInput.value = ""
    return playerOneName + playerTwoName;
}
)












    