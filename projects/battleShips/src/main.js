import { Player, GameBoard, Ship } from "./script.js"

// playerOne board 
let playerOne = new Player().gameBoard
let playerOneCarrier = playerOne.ships.carrier.coordinates[0]
let playerOneBattleShip = playerOne.ships.battleShip.coordinates[0]
let playerOneDestroyer = playerOne.ships.destroyer.coordinates[0]
let playerOneSubmarine = playerOne.ships.submarine.coordinates[0]
let playerOnePatrolBoat = playerOne.ships.patrolBoat.coordinates[0]



function getId(array) { // turn coordinates (array) into a the Id (string)
    array = array.join("")
    return array
}

function getCoordinates(coordinates) { // turn id (string) into coordinates (array)
    coordinates = coordinates.split("")
    coordinates = [[coordinates[0]], [coordinates[1]]]
    return coordinates
}


// adding own ships to player one's board


for (let i = 0; i < playerOne.gameBoardSize; i++) {
    // look for carrier 
    for (let j = 0; j < playerOneCarrier.length; j++) {
        // find where the ship is
        let carrierPosition = getId(playerOneCarrier[j])
        let findPosition = document.getElementById(`square${carrierPosition}`)

        // style the squares where the ship is
        findPosition.style.border = "5px solid blue"

    }
    // look for battleShip
    for (let j = 0; j < playerOneBattleShip.length; j++) {
        // find where the ship is
        let battleShipPosition = getId(playerOneBattleShip[j])
        let findPosition = document.getElementById(`square${battleShipPosition}`)

        // style the squares where the ship is
        findPosition.style.border = "5px solid green"
    }
    // look for destroyer
    for (let j = 0; j < playerOneDestroyer.length; j++) {
        // find where the ship is
        let destroyerPosition = getId(playerOneDestroyer[j])
        let findPosition = document.getElementById(`square${destroyerPosition}`)

        // style the squares where the ship is
        findPosition.style.border = "5px solid pink"
    }
    // look for submarine
    for (let j = 0; j < playerOneSubmarine.length; j++) {
        // find where the ship is
        let submarinePosition = getId(playerOneSubmarine[j])
        let findPosition = document.getElementById(`square${submarinePosition}`)

        // style the squares where the ship is
        findPosition.style.border = "5px solid yellow"
    }
    // look for patrolBoat 
    for (let j = 0; j < playerOnePatrolBoat.length; j++) {
        // find where the ship is
        let patrolBoatPosition = getId(playerOnePatrolBoat[j])
        let findPosition = document.getElementById(`square${patrolBoatPosition}`)

        // style the squares where the ship is
        findPosition.style.border = "5px solid brown"
    }
}

// playerTwo board
let playerTwo = new Player().gameBoard
console.log(playerTwo)
let playerTwoCarrier = playerTwo.ships.carrier.coordinates[0]
let playerTwoBattleShip = playerTwo.ships.battleShip.coordinates[0]
let playerTwoDestroyer = playerTwo.ships.destroyer.coordinates[0]
let playerTwoSubmarine = playerTwo.ships.submarine.coordinates[0]
let playerTwoPatrolBoat = playerTwo.ships.patrolBoat.coordinates[0]

console.log(playerTwo.currentlyPlaced.toString())
// add event listeners to each square to listen for clicks


for (let i = 0; i < playerTwo.board.length; i++) {

    let squareTwoCoordinates = playerTwo.board[i]
    let squareTwoId = getId(squareTwoCoordinates)

    let squarePosition = document.getElementById(squareTwoId)
    squarePosition.addEventListener("click", () => {
        console.log(`You have clicked on ${squareTwoCoordinates}`)

        let callAttack = playerTwo.receiveAttack(squareTwoCoordinates)
        console.log(squareTwoCoordinates)
        console.log(callAttack)
    })
    
}

// when i know what square has been clicked, i get the coordinates via the helper function at the top of this file - done 

// call receiveAttack with the newly found coordinates

// if the attack is successfull:
    // make the border a certain colour - limegreen for example
    // announce that it was a successful hit
        // check to see if the hit ship has been sunk
        // if so, announce this
    // make sure that the game is not over by checking that not all ships are sunk
