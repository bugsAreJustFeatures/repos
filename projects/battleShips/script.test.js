import {newShip} from "./src/script"
import {newGameBoard} from "./src/script"
import {boardSize} from "./src/script";

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
    test("tests makeBoard() finishes at ['J', '10']", () => {
        expect(newGameBoard().makeBoard()[boardSize]).toStrictEqual(["J", "10"])
    })
})
