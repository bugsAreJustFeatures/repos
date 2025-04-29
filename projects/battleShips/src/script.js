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
        //  array = [
        //  [[A],[1]], [[B],[1]], [[C],[1]] ...
        //  [[A],[2]], [[A],[2]], [[A],[2]] ...
        //  ]
        let column;
        for (let i = 65; i < 75; i++) { // letter, x
            for (let j = 49; j < 59; j++) { // number, y

                if (j == 58) {//make ten with unicode, since j is going to be in 10th column 
                    j = [49,48]
                    column = String.fromCharCode(j[0]) + String.fromCharCode(j[1])

                } else { // not column so dont need to make 10
                    column = String.fromCharCode(j)
                    
                }
                let row = String.fromCharCode(i)

                array.push([[row], [column]])
            }
        }
        this.gameBoardSize = ((array.length))
        return array
    }

    getBoatPosition(shipSize) {
        let canPlace = false
        let fullPos = []
        let message;

        function getRandomNum(max) {
            return Math.floor(Math.random() * max)
        }

        while (canPlace === false) {
            let randomPos = getRandomNum(99) // use random num to call a random coordinate
            let randomDirection = getRandomNum(1)

            let xAxisPos = this.board[randomPos][0][0] // if randomPos = 50, will be the 6th row because 0 is the 1st, returns 6
            let yAxisPos = this.board[randomPos][0][1] // if randomPos = 50, will be the 6th column because 0 is the 1st, returns F

            let horizontalCheck = (xAxisPos === this.board[randomPos + (shipSize - 1)][0][0]) // checks to make sure the row has remained the same, used to check ships placed horizontally dont go over into other columns
            let verticalCheck = (yAxisPos === this.board[randomPos + (shipSize - 1)][0][1]) // checks to make sure the column has remained the same, used to check ships placed vertically dont go over into other rows 

            if (randomDirection == 0) { // horizontal check, y axis will stay the same
                if (horizontalCheck) {
                    canPlace = true
                    message = "HORIZONTAL"
                    for (let i = 0; i < shipSize; i++) {
                        let next = 10 * i
                        fullPos.push(this.board[randomPos + next])
                    }
                } else {
                    canPlace = true
                    message = "HORIZONTAL"
                    return `couldnt place ${message} at ${this.board[randomPos]}`
                }

            } else if (randomDirection == 1) { // vertical check, x axis will stay the same
                if (verticalCheck) {
                    canPlace = true
                    message = "VERTICAL"
                    for (let i = 0; i < shipSize; i++) {
                        fullPos.push(this.board[randomPos + i])
                    }
                } else {
                    canPlace = true
                    message = "VERTICAL"
                    return `couldnt place ${message} at ${this.board[randomPos]}`
                }
            }
        }
        return `${message} at ${fullPos}`

    }



    receiveAttack(coordinates) {

        return coordinates
    }
}

// test functions //
let newShip = () => {return new Ship(5)}
let newGameBoard = () => {return new GameBoard()}
let boardMoves = newGameBoard().gameBoardSize
let carrierBoat = newGameBoard().getBoatPosition(5)

// exports //
module.exports = {newShip, newGameBoard, boardMoves, carrierBoat}