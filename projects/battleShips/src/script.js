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

                if (j == 58) {//make ten with unicode, since j is going to be in 10th column 
                    j = [49,48]
                    column = String.fromCharCode(j[0]) + String.fromCharCode(j[1])

                } else { // not column so dont need to make 10
                    column = String.fromCharCode(j)
                    
                }
                let row = String.fromCharCode(i)

                array.push([row, column])
            }
        }
        this.gameBoardSize = ((array.length))
        return array
    }

    getBoatPosition(shipSize) {
        // make while..loop that loops until the boat can fit
            // make and use randomiser to pick a coordinate somewhere on board
            // use randomiser, pick 0-3, 0/1 (up/down) 2/3 (left/right)
            // check if the boat will fit, via increasing coords by size - 1, in whatever the relevant direction is
            // if not, loop back through
        // then return an array that houses the position of the boat

        let canFit = false
        let fullPos = []

        function getRandomNum(max) {
            return Math.floor(Math.random() * max)
        }

        while (canFit === false) {
            let randomPos = getRandomNum(99) // get random coordinate
            let randomDirection = getRandomNum(3) // 0 = up, 1 = down, 2 = left, 3 = right

            if (randomDirection == 0) {
                if (this.board[randomPos + (shipSize - 1)][1]) {
                    canFit = true
                    for (let i = 0; i < shipSize; i++) {
                        fullPos.push(this.board[randomPos + i])
                    }
                }

            } else if (randomDirection == 1) {
                if (this.board[randomPos - (shipSize - 1)][1]) {
                    canFit = true
                    for (let i = 0; i < shipSize; i++) {
                        fullPos.push(this.board[randomPos + i])
                    }
                }

            } else if (randomDirection == 2) {
                if (this.board[randomPos + (shipSize - 1)][0]) {
                    canFit = true
                    for (let i = 0; i < shipSize; i++) {
                        fullPos.push(this.board[randomPos + i])
                    }
                }

            } else {
                if (this.board[randomPos - (shipSize - 1)][1]) {
                    canFit = true
                    for (let i = 0; i < shipSize; i++) {
                        fullPos.push(this.board[randomPos + i])
                    }
                }

            }
        }
        return fullPos

    }



    receiveAttack(coordinates) {
        return coordinates
    }
}

// test functions //
let newShip = () => {return new Ship(5)}
let newGameBoard = () => {return new GameBoard()}
let boardMoves = newGameBoard().gameBoardSize
let showBoats = newGameBoard().getBoatPosition(5)

// exports //
module.exports = {newShip, newGameBoard, boardMoves, showBoats}