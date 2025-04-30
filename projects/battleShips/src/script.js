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

        while (canPlace == false) {
            let horizontalCheck;
            let horizontalCheckAdd; // true = added, false = sutracted

            let verticalCheck;
            let verticalCheckAdd;// true = added, false = sutracted
            
            let randomPos = getRandomNum(99)// use random num to call a random coordinate
            let randomDirection = getRandomNum(2)

            let xAxisPos = this.board[randomPos] // if randomPos = 50, will be the 6th row because 0 is the 1st, returns 6
            let yAxisPos = this.board[randomPos] // if randomPos = 50, will be the 6th column because 0 is the 1st, returns F

            // canPlace = true
            // let endPos = this.board[randomPos + ((shipSize - 1) * 10)]
            // horizontalCheck = (xAxisPos[0][1] === endPos[0][1]) 
            // return horizontalCheck
            if (randomDirection == 0) { // horizontal check, y axis will stay the same
                if ((randomPos + ((shipSize - 1) * 10)) <= 99) { // checks if ship can fit horizontally and does not spill over the edge by adding working out the next correct space
                    let endPos = this.board[randomPos + ((shipSize - 1) * 10)]
                    horizontalCheck = (xAxisPos[0][1] === endPos[0][1]) 
                    horizontalCheckAdd = true
    
                } else if (randomPos - ((shipSize - 1) * 10) >= 0) { // cannot fit by adding so checks if it would fit by subtracting, which it should always and (as i currently understand) cannot fail if the other fails. 
                    let endPos = this.board[randomPos - ((shipSize - 1) * 10)]
                    horizontalCheck = (xAxisPos[0][1] === endPos[0][1]) 
                    horizontalCheckAdd = false
                }

                if (horizontalCheck && (horizontalCheckAdd === true)) {
                    canPlace = true
                    message = "HORIZONTAL + "
                    for (let i = 0; i < shipSize; i++) {
                        let next = 10 * i
                        fullPos.push(this.board[randomPos + next])
                    }

                } else if (horizontalCheck && horizontalCheckAdd === false) {
                    canPlace = true
                    message = "HORIZONTAL - " 
                    for (let i = 0; i < shipSize; i++) {
                        let next = 10 * i
                        fullPos.push(this.board[randomPos - next])
                    }
                }

            } else if (randomDirection == 1) { // vertical check, x axis will stay the same
                if (randomPos + (shipSize - 1) <= 99) {// checks that ships dont spill over out of the board
                    let endPos = this.board[randomPos + (shipSize - 1)]
                    verticalCheck = (yAxisPos[0][0] === endPos[0][0])
                    verticalCheckAdd = true
                } else if (randomPos - (shipSize - 1) >= 0) { // if it will spill out, it subtracts and places ship the other vertical way
                    let endPos = this.board[randomPos - (shipSize - 1)]
                    verticalCheck = (yAxisPos[0][0] === endPos[0][0])
                    verticalCheckAdd = false
                }

                if (verticalCheck && verticalCheckAdd === true) {
                    canPlace = true
                    message = "VERTICAL + "
                    for (let i = 0; i < shipSize; i++) {
                        fullPos.push(this.board[randomPos + i])
                    }
                } else if (verticalCheck && verticalCheckAdd === false) {
                    canPlace = true
                    message = "VERTICAL - "
                    for (let i = 0; i < shipSize; i++) {
                        fullPos.push(this.board[randomPos - i])
                    }
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