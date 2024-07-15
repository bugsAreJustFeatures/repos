const orginalArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const newArr = []

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



square1.addEventListener("click", function() {

    
    playerTurnNumber++;
    playerTurnController()
    turn = playerTurnController();
    console.log(playerTurnNumber)

    if (this.innerHTML === "") {
        
        this.innerHTML = turn;
        square1 = orginalArr[0]
        newArr.push(orginalArr[0])
        // orginalArr.splice(0, 1)

    // console.log("originalArr = " + orginalArr)
    // console.log(newArr)
    // console.log(turn)

    } else {
        console.log("Already in use")
    } 
})
square2.addEventListener("click", function() {
    
    playerTurnNumber++;
    playerTurnController()
    turn = playerTurnController()
    console.log(playerTurnNumber)
    if (this.innerHTML === "") {
        
        this.innerHTML = turn;
        square2 = orginalArr[1]
        newArr.push(orginalArr[1])
        // orginalArr.splice(1, 1)

    // console.log("originalArr = " + orginalArr)
    // console.log(newArr)

    } else {
        console.log("Already in use")
    } 
})
square3.addEventListener("click", function() {
    
    playerTurnNumber++;
    playerTurnController()
    turn = playerTurnController()
    console.log(playerTurnNumber)
    if (this.innerHTML === "") {
        
        this.innerHTML = turn;  
        square3 = orginalArr[2]
        newArr.push(orginalArr[2])
        // orginalArr.splice(2, 1)

    // console.log("originalArr = " + orginalArr)
    // console.log(newArr)

    } else {
        console.log("Already in use")
    } 
})
square4.addEventListener("click", function() {
    playerTurnNumber++;
    playerTurnController()
    turn = playerTurnController()
    console.log(playerTurnNumber)
    if (this.innerHTML === "") {
        
        this.innerHTML = turn
        square4 = orginalArr[3]
        newArr.push(orginalArr[3])
        // orginalArr.splice(3, 1)

    // console.log("originalArr = " + orginalArr)
    // console.log(newArr)

    } else {
        console.log("Already in use")
    } 
})
square5.addEventListener("click", function() {
    playerTurnNumber++;
    playerTurnController()
    turn = playerTurnController()
    console.log(playerTurnNumber)
    if (this.innerHTML === "") {
        
        this.innerHTML = turn
        square5 = orginalArr[4]
        newArr.push(orginalArr[4])
        // orginalArr.splice(4, 1)

    // console.log("originalArr = " + orginalArr)
    // console.log(newArr)

    } else {
        console.log("Already in use")
    } 
})
square6.addEventListener("click", function() {
    playerTurnNumber++;
    playerTurnController()
    turn = playerTurnController()
    console.log(playerTurnNumber)
    if (this.innerHTML === "") {
        
        this.innerHTML = turn
        square6 = orginalArr[5]
        newArr.push(orginalArr[5])
        // orginalArr.splice(5, 1)

    // console.log("originalArr = " + orginalArr)
    // console.log(newArr)

    } else {
        console.log("Already in use")
    } 
})
square7.addEventListener("click", function() {
    playerTurnNumber++;
    playerTurnController()
    turn = playerTurnController()
    console.log(playerTurnNumber)
    if (this.innerHTML === "") {
        
        this.innerHTML = turn
        square7 = orginalArr[6]
        newArr.push(orginalArr[6])
        // orginalArr.splice(6, 1)

    // console.log("originalArr = " + orginalArr)
    // console.log(newArr)

    } else {
        console.log("Already in use")
    } 
})
square8.addEventListener("click", function() {
    playerTurnNumber++;
    playerTurnController()
    turn = playerTurnController()
    console.log(playerTurnNumber)
    if (this.innerHTML === "") {
        
        this.innerHTML = turn
        square8 = orginalArr[7]
        newArr.push(orginalArr[7])
        // orginalArr.splice(7, 1)

    // console.log("originalArr = " + orginalArr)
    // console.log(newArr)

    } else {
        console.log("Already in use")
    } 
})
square9.addEventListener("click", function() {
    playerTurnNumber++;
    playerTurnController()
    turn = playerTurnController()
    console.log(playerTurnNumber)
    if (this.innerHTML === "") {
        
        this.innerHTML = turn
        square9 = orginalArr[8]
        newArr.push(orginalArr[8])
        // orginalArr.splice(8, 1)

    // console.log("originalArr = " + orginalArr)
    // console.log(newArr)

    } else {
        console.log("Already in use")
    } 
})




