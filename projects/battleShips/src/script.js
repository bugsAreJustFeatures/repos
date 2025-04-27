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
        this.gameBoardSize
    }

    makeBoard() { 
        let array = []
        let column
        for (let i = 65; i < 75; i++) { // letter
            for (let j = 49; j < 59; j++) { // number

                if (j == 58) {//make ten with unicode
                    j = [49,48]
                    column = String.fromCharCode(j[0]) + String.fromCharCode(j[1])

                } else { // not column so dont need to make 10
                    column = String.fromCharCode(j)
                    
                }
                let row = String.fromCharCode(i)

                array.push([row, column])
            }
        }
        this.gameBoardSize = ((array.length) - 1)
        return array
    }

    deployShips() {
        
    }

    receiveAttack(coordinates) {
        return coordinates
    }
}

// test functions //
let newShip = () => {return new Ship(5)}
let newGameBoard = () => {return new GameBoard()}
let boardSize = newGameBoard().gameBoardSize

// exports //
module.exports = {newShip, newGameBoard, boardSize}