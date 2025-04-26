class Ship {
    constructor(length, hitNum = 0, sunk = false) {
        this.length = length
        this.hitNum = hitNum
        this.sunk = sunk
    }

    hit() {
        if (this.hitNum < this.length) { // acknowledge the hit and increase the number of hits on the hit ship, but only if its not sunk 
            this.hitNum = this.hitNum + 1
        } 
        return this.hitNum
    }

    isSunk() {
        if (this.hitNum == this.length) { // check to see if it has been sunken
            this.sunk = true
        }
        return this.sunk
    }
}

class GameBoard {
    constructor() {
        this.board = this.makeBoard()
    }

    makeBoard() {
        let array = []
        for (let i = 65; i < 75; i++) {
            for (let j = 48; j < 58; j++) {
                let row = String.fromCharCode(i)
                let column = String.fromCharCode(j)

                array.push([row, column])
            }
        }
        return array
    }

    receiveAttack(coordinates) {
        return coordinates
    }
}

let newShip = () => {return new Ship(5)}
let newGameBoard = () => {return new GameBoard()}
module.exports = {newShip, newGameBoard}