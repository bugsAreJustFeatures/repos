import { Player, GameBoard, Ship } from "./script.js"

let announcementBox
let oneAnnouncements
let twoAnnouncements
let shipStatus
let playerOneStatus
let playerTwoStatus


document.addEventListener("DOMContentLoaded", () => {
    announcementBox = document.getElementById("announcementSection")
    oneAnnouncements = document.getElementById("playerOneAnnouncements")
    twoAnnouncements = document.getElementById("playerTwoAnnouncements")
    shipStatus = document.getElementById("shipStatus")
    playerOneStatus = document.getElementById("playerOneStatus")
    playerTwoStatus = document.getElementById("playerTwoStatus")
})


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

console.log(playerTwo.currentlyPlaced.toString()) // display all boat positions in a single string

// add event listeners to each square to listen for clicks
for (let i = 0; i < playerTwo.board.length; i++) {
    let squareTwoCoordinates = playerTwo.board[i]
    let squareTwoId = getId(squareTwoCoordinates)

    
    let squarePosition = document.getElementById(squareTwoId)
    squarePosition.addEventListener("click", () => {

        if (squarePosition.style.border === "5px solid lightcoral" || squarePosition.style.border === "5px solid limegreen") {
            oneAnnouncements.innerHTML = `Cannot attack ${squareTwoId} again.`
            
        } else {
            let callAttack = playerTwo.receiveAttack(squareTwoCoordinates)
            let hasPlayerWon = playerTwo.endChecker()
    
            if (callAttack) { // attack from humans was successful
                squarePosition.style.border = "5px solid limegreen"
                oneAnnouncements.innerHTML = `Successful hit on ${squareTwoCoordinates}`
    
                let shipsThatSunk = []
                for (let [name, data] of Object.entries(playerOne.ships)) {
                    if (data.status.sunk === true) {
                        shipsThatSunk.push(name)
                    }
                } 

                if (shipsThatSunk.length > 0) {
                    playerOneStatus.innerHTML = `Your Sunk Ships: ${shipsThatSunk}`
                }

                if (hasPlayerWon) {
                    alert(`Game is over, Player One (You) has Won! Refresh page to play again.`)
                    return
                }
    
            } else {
                squarePosition.style.border = "5px solid lightcoral"
                oneAnnouncements.innerHTML = `Missed at ${squareTwoId}`
            }
    
            // computer turn // 
    
            let randomIndex
            let randomAttack
            let getAttackedId
            let findAttackedSquare
    
            let legalMove = false
    
            loop2: while (legalMove === false) {
                randomIndex = playerTwo.getRandomNum(100);
                randomAttack = playerTwo.board[randomIndex];
                getAttackedId = getId(randomAttack);
                findAttackedSquare = document.getElementById(`square${getAttackedId}`);
            
                let alreadyAttacked = false;
            
                for (let [type, data] of Object.entries(playerOne.boardAttacks)) {
                    for (let i = 0; i < data.coordinates.length; i++) {
                        if (getId(data.coordinates[i]) === getAttackedId) {
                            alreadyAttacked = true;
                            continue loop2;
                        }
                    }
                }
                legalMove = true;
            }
    
            let computerAttack = playerOne.receiveAttack(randomAttack) // find and attack the square
    
            let hasComputerWon = playerOne.endChecker()
    
            if (computerAttack) { // if it was a success
                findAttackedSquare.style.backgroundColor = "red"
                twoAnnouncements.innerHTML = "Computer has hit one of your ships."
                
                let shipsThatSunk = []
                for (let [name, data] of Object.entries(playerTwo.ships)) {
                    if (data.status.sunk === true) {
                        shipsThatSunk.push(name)
                    }
                } 

                if (shipsThatSunk.length > 0) {
                    playerTwoStatus.innerHTML = `Computer's Sunk Ships: ${shipsThatSunk}`
                }
    
                 if (hasComputerWon) {
                    alert(`Game is over, Player Two (Computer) has Won! Refresh page to play again.`)
                }
            } else { // if it was a miss
                findAttackedSquare.style.backgroundColor = "lightblue"
                twoAnnouncements.innerHTML ="Your Opponent missed"
    
            }
    
        }

        
    })
    
}


    




