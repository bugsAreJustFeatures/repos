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

// adding own ships to player one's board

console.log(playerOne)

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

