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
        for (let i = 65; i < 75; i++) { // letter, x
            for (let j = 49; j < 59; j++) { // number, y

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
        let canFit = false
        let fullPos = []
        let message;

        function getRandomNum(max) {
            return Math.floor(Math.random() * max)
        }

        while (canFit == false) {
            let randomPos = 0 // get random coordinate
            let randomDirection = getRandomNum(3) // 0 = up, 1 = down, 2 = left, 3 = right

            if (randomDirection == 0) { // up, keep row same
                let legalCheckerZero = this.board[randomPos][0] == this.board[randomPos + (shipSize - 1)][0]
                if (legalCheckerZero) { // [A,9] [A,10] [B,1] [B,2] [B,3] 
                    canFit = true
                    message = "UP"
                    for (let i = 0; i < shipSize; i++) {
                        fullPos.push(this.board[randomPos + i])
                    }
                }

            } else if (randomDirection == 1) { // down, keep row same
                let legalCheckerOne = this.board[randomPos][0] == this.board[randomPos - (shipSize - 1)][0]
                if (legalCheckerOne) {
                    canFit = true
                    message = "DOWN"
                    for (let i = 0; i < shipSize; i++) {
                        fullPos.push(this.board[randomPos - i])
                    }
                }

            } else if (randomDirection == 2) { // left, keep column same
                let legalCheckerTwo = this.board[randomPos][1] == this.board[randomPos + (shipSize - 1)][1]
                if (legalCheckerTwo) {
                    canFit = true
                    message = "LEFT"
                    for (let i = 0; i < shipSize; i++) {
                        fullPos.push(this.board[randomPos + i][1])
                    }
                }

            } else if (randomDirection == 3) { //right, keep column same
                let legalCheckerThree = this.board[randomPos][1] == this.board[randomPos - (shipSize - 1)][1]
                if (legalCheckerThree) {
                    canFit = true
                    message = "RIGHT"
                    for (let i = 0; i < shipSize; i++) {
                        fullPos.push(this.board[randomPos - i][1])
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
let carrierBoat = newGameBoard().getBoatPosition(5)

// exports //
module.exports = {newShip, newGameBoard, boardMoves, carrierBoat}