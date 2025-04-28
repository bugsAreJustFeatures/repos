import {newShip} from "./src/script"
import {newGameBoard} from "./src/script"
import {boardMoves} from "./src/script";
import {carrierBoat} from "./src/script";

describe("makes a ship object and ", () => {
    test("adds a length", () => {
        expect(newShip().length).toBe(5)
    });
    test("adds a counter for no. of hits", () => {
        expect(newShip().hitNum).toBe(0)
    });
    test("adds a status, called sunk, shows whether its sunk or not", () => {
        expect(newShip().sunk).toBe(false)
    });
})

describe("tests functions within ship class - not constructor, thats above.", () => {
    test("tests hit()", () => {
        expect(newShip().hit()).toBe(1)
    });
    test("tests isSunk()", () => {
        expect(newShip().isSunk()).toBe(false)
    });
})

describe("tests function in gameBoard class", () => {
    test("tests makeBoard() starts at ['A', '1']", () => {
        expect(newGameBoard().makeBoard()[0]).toStrictEqual(["A", "1"])
    })
    test("tests makeBoard() finishes at ['J', '10'], and checks there are only 100 positions", () => {
        expect(newGameBoard().makeBoard()[boardMoves - 1]).toStrictEqual(["J", "10"])
    })
    test("tests board starting", () => {
        expect(newGameBoard().board[0]).toStrictEqual(["A", "1"])
    })
    test("mock tests getBoatPosition() correctly creates boat positions for a carrier - uses 0 as randomPos", () => {
        expect(carrierBoat).toStrictEqual([["A", "1"], ["A", "2"], ["A", "3"], ["A", "4"], ["A", "5"]])
    })
    

})
