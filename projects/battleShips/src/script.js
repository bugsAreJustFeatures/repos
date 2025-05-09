
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
        this.ships = {
            carrier: {status: new Ship(5), coordinates: []},
            battleShip: {status: new Ship(4), coordinates: []},
            destroyer: {status: new Ship(3), coordinates: []},
            submarine: {status: new Ship(3), coordinates: []},
            patrolBoat: {status: new Ship(2), coordinates: []}
        }
        this.boardAttacks = {
            onTarget: {coordinates: []},
            missed: {coordinates: []}
        }
        this.currentlyPlaced = []
        this.deployShips() // undefined, see function comment
        this.buildBoard()
    }

    makeBoard() { 
        let array = []
        //  array = [
        //  [[A],[1]], [[B],[1]], [[C],[1]] ...
        //  [[A],[2]], [[B],[2]], [[C],[2]] ...
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

    buildBoard() { // display the board
        let findGameWrapper = document.getElementById("gameWrapper")
        if (findGameWrapper.innerHTML === "") {// make playerOne's board

            // needs to be inside playerOne maker, so it doesnt make the titles and button twice
            //display player board titles
            let playerOneTitle = document.createElement("div")
            playerOneTitle.id = "playerOneTitle"
            playerOneTitle.className = "title"
            playerOneTitle.innerHTML = "Your Board"
            findGameWrapper.appendChild(playerOneTitle)
            let playerTwoTitle = document.createElement("div")
            playerTwoTitle.id = "playerTwoTitle"
            playerTwoTitle.className = "title"
            playerTwoTitle.innerHTML = "Opponent's Board"
            findGameWrapper.appendChild(playerTwoTitle)

            // play game button
            let playButton = document.createElement("button")
            playButton.id = "playButton"
            playButton.innerHTML = "Play"
            findGameWrapper.appendChild(playButton)

            let playerOneBoard = document.createElement("div") // house the board
            playerOneBoard.id = "playerOneBoard"
            playerOneBoard.className = "playerBoard"
            findGameWrapper.appendChild(playerOneBoard)

            let columnLabels = document.createElement("div") // show the label of each column
            columnLabels.className = "columnLabels"
            playerOneBoard.appendChild(columnLabels)

            let rowLabels = document.createElement("div") //show the label of each row
            rowLabels.className = "rowLabels"
            playerOneBoard.appendChild(rowLabels)

            for (let i = 0; i < 10; i++) { // each column label
                let eachColumn = document.createElement("div")
                eachColumn.className = "eachColumn"
                let columnFinder = 10 * i
                eachColumn.innerHTML = this.board[columnFinder][0]
                columnLabels.appendChild(eachColumn)
            }

            for (let j = 0; j < 10; j++) {// each row label
                let eachRow = document.createElement("div")
                eachRow.className = "eachRow"
                eachRow.innerHTML = this.board[j][1]
                rowLabels.appendChild(eachRow)
            }

            let boardGridContainer = document.createElement("div") // make board squares
            boardGridContainer.className = "boardGridContainer"
            playerOneBoard.appendChild(boardGridContainer)

            for (let i = 0; i < this.board.length; i++) { // place square in position
                let singleSquare = document.createElement("div")
                singleSquare.className = "singleSquareOne"
                singleSquare.id = `square${this.board[i][0]}${this.board[i][1]}`
                // singleSquare.innerHTML = this.board[i]
                singleSquare.style.gridRow = this.board[i][1]
                boardGridContainer.appendChild(singleSquare)
            }

        } else { // make playerTwo's board
            
            let playerTwoBoard = document.createElement("div") // house the board
            playerTwoBoard.id = "playerTwoBoard"
            playerTwoBoard.className = "playerBoard"
            findGameWrapper.appendChild(playerTwoBoard)
          
            let columnLabels = document.createElement("div") // show the label of each column
            columnLabels.className = "columnLabels"
            playerTwoBoard.appendChild(columnLabels)

            let rowLabels = document.createElement("div") //show the label of each row
            rowLabels.className = "rowLabels"
            playerTwoBoard.appendChild(rowLabels)

            for (let i = 0; i < 10; i++) { // each column label
                let eachColumn = document.createElement("div")
                eachColumn.className = "eachColumn"
                let columnFinder = 10 * i
                eachColumn.innerHTML = this.board[columnFinder][0]
                columnLabels.appendChild(eachColumn)
            }

            for (let j = 0; j < 10; j++) {
                let eachRow = document.createElement("div")
                eachRow.className = "eachRow"
                eachRow.innerHTML = this.board[j][1]
                rowLabels.appendChild(eachRow)
            }

            let boardGridContainer = document.createElement("div")
            boardGridContainer.className = "boardGridContainer"
            playerTwoBoard.appendChild(boardGridContainer)

            for (let i = 0; i < this.board.length; i++) { // place square in position
                let singleSquare = document.createElement("div")
                singleSquare.className = "singleSquareTwo"
                singleSquare.id = `${this.board[i][0]}${this.board[i][1]}`
                singleSquare.style.gridRow = this.board[i][1]
                boardGridContainer.appendChild(singleSquare)
            }
        }




    }

    getBoatPosition(shipInput) {
        let canPlace = false
        let fullPos = []
        let shipSize;

        for (let [name, data] of Object.entries(this.ships)) { // find length of ship via the name
            if (name === shipInput) {
                shipSize = data.status.length
                break;
            }
        }

        function getRandomNum(max) {
            return Math.floor(Math.random() * max)
        }

        loop1: while (canPlace == false) {
            let horizontalCheck;
            let horizontalCheckAdd; // true = added, false = sutracted

            let verticalCheck;
            let verticalCheckAdd;// true = added, false = sutracted
            
            let randomPos = getRandomNum(99)// use random num to call a random coordinate
            let randomDirection = getRandomNum(2)

            let xAxisPos = this.board[randomPos] // if randomPos = 50, will be the 6th row because 0 is the 1st, returns 6
            let yAxisPos = this.board[randomPos] // if randomPos = 50, will be the 6th column because 0 is the 1st, returns F


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

                if (horizontalCheck && (horizontalCheckAdd === true)) { // fits horizontally and by adding
                    let totalEmptySpaces = 0
                    if (this.currentlyPlaced.length > 0) { // check that there are actual ships to check with
                        for (let i = 0; i < shipSize; i++) {
                            let next = 10 * i; 
                            if (this.currentlyPlaced.includes(this.board[randomPos + next])) {
                                continue loop1; // exit to the if loop that fits horizontally and by adding
                                
                            } else if (!this.currentlyPlaced.includes(this.board[randomPos + next])) {
                                totalEmptySpaces++
                                // continue with this code
                            }
                        } 
                    } else {
                        totalEmptySpaces = shipSize
                    }
                    

                    if (totalEmptySpaces == shipSize) {// all spaces are empty
                        canPlace = true
                        for (let i = 0; i < shipSize; i++) {
                            let next = 10 * i
                            fullPos.push(this.board[randomPos + next]) // place the ships
                            this.currentlyPlaced.push(this.board[randomPos + next]) // record where they are and use this to check other ships are not being placed on top of this ship
                        totalEmptySpaces = 0

                    } 
                    }
                    

                } else if (horizontalCheck && horizontalCheckAdd === false) { //fit horizontally and by subtracting

                    let totalEmptySpaces = 0

                    if (this.currentlyPlaced.length > 0) {
                         for (let i = 0; i < shipSize; i++) {
                        let next = 10 * i

                        if (this.currentlyPlaced.includes(this.board[randomPos - next])) {
                            continue loop1;

                        } else if (!this.currentlyPlaced.includes(this.board[randomPos - next])) {
                            totalEmptySpaces++
                        }
                    }
                    } else {
                        totalEmptySpaces = shipSize
                    }
                   

                        if (totalEmptySpaces == shipSize) {
                            canPlace = true

                            for (let i = 0; i < shipSize; i++) {
                                let next = 10 * i
                                fullPos.push(this.board[randomPos - next])
                                this.currentlyPlaced.push(this.board[randomPos - next])
                                totalEmptySpaces = 0

                            }
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

                if (verticalCheck && verticalCheckAdd === true) { // fits vertically by adding
                    let totalEmptySpaces = 0;

                    if (this.currentlyPlaced.length > 0) {
                        for (let i = 0; i < shipSize; i++) {
                            if (this.currentlyPlaced.includes(this.board[randomPos + i])) {
                                continue loop1;

                            } else if (!this.currentlyPlaced.includes(this.board[randomPos + i])) {
                                totalEmptySpaces++
                            }
                        }
                    } else {
                        totalEmptySpaces = shipSize
                    }
                    

                    if (totalEmptySpaces == shipSize) {
                        canPlace = true
                        for (let i = 0; i < shipSize; i++) {
                            fullPos.push(this.board[randomPos + i])
                            this.currentlyPlaced.push(this.board[randomPos + i])
                        }
                        totalEmptySpaces = 0

                    } 
                    
                } else if (verticalCheck && verticalCheckAdd === false) { // fits vertically by subtracting
                    let totalEmptySpaces = 0

                    if (this.currentlyPlaced.length > 0) {
                        for (let i = 0; i < shipSize; i++) {
                            if (this.currentlyPlaced.includes(this.board[randomPos - i])) {
                                continue loop1
    
                            } else if (!this.currentlyPlaced.includes(this.board[randomPos - i])) {
                                totalEmptySpaces++
                            }
                        }
                    } else {
                        totalEmptySpaces = shipSize
                    }

                    if (totalEmptySpaces == shipSize) {
                        canPlace = true
                        for (let i = 0; i < shipSize; i++) {
                            fullPos.push(this.board[randomPos - i])
                            this.currentlyPlaced.push(this.board[randomPos - i])
                        }
                        totalEmptySpaces = 0
                    }

                    
                }
            }
        }
        console.log(fullPos)
        return fullPos
    }

    receiveAttack(inputCoordinates) {
        let successHit = false;

        for (let [name, data] of Object.entries(this.ships)) { // go through each ship and its data
            if (data.coordinates[0].length > 0) { // if true, ship is on board, if false, ship is not and has been sunk or not deployed
                 for (let i = 0; i < data.status.length; i++) { // go through each ship's coordinates to see if any was hit
                    if (inputCoordinates[0] === data.coordinates[0][i][0][0] && inputCoordinates[1] === data.coordinates[0][i][1][0]) { // if one of the current ship's coordinates are the ones entered
                        data.status.hit()
                        successHit = true
                        this.boardAttacks.onTarget.coordinates.push(inputCoordinates);
                        return true

                    }
                }
            }
        }
           
        if (successHit === false) { // if no coordinates of any ship were the ones entered, so it was a miss
            this.boardAttacks.missed.coordinates.push(inputCoordinates)
            return false
        }

    }

    deployShips() { // returns undefined since im not actually returning anything inside this function
        this.ships.carrier.coordinates.push(this.getBoatPosition("carrier"))
        this.ships.battleShip.coordinates.push(this.getBoatPosition("battleShip"))
        this.ships.destroyer.coordinates.push(this.getBoatPosition("destroyer"))
        this.ships.submarine.coordinates.push(this.getBoatPosition("submarine"))
        this.ships.patrolBoat.coordinates.push(this.getBoatPosition("patrolBoat"))
        
    }

    endChecker() {
        let sunkShips = 0;

        for (let [name, data] of Object.entries(this.ships)) {
            if (data.status.sunk === true) {
                sunkShips + 1
            }
        }

        if (sunkShips === 5) {
            return `All 5 ships have been sunk, game over.`
        }
    }
}

class Player {
    constructor() {
        this.gameBoard = new GameBoard()
    }
}

// test functions //
// let newShip = () => {return new Ship(5)}
// let newGameBoard = () => {return new GameBoard()}
// let boardMoves = newGameBoard().gameBoardSize
// let carrierBoat = newGameBoard().getBoatPosition("carrier")
// let hitCarrier = newGameBoard().receiveAttack(["F", "1"])
// let missCarrier = newGameBoard().receiveAttack(["A", "1"]);
// let revealPositions = newGameBoard().deployShips()
// let isGameFinsished = () => {return newGameBoard().endChecker()}
// let playerTest = new Player()
// let attackPlayerTest = () => {return playerTest.gameBoard.receiveAttack(["F", "3"])}
// attackPlayerTest()

// exports //
export {
    // to test //
    // newShip, 
    // newGameBoard, 
    // boardMoves, 
    // carrierBoat,
    // hitCarrier,
    // missCarrier,
    // revealPositions,
    // isGameFinsished,
    // playerTest,

    // to drive game //
    Player,
    GameBoard,
    Ship
}