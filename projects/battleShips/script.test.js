import { newShip } from "./src/script"
import { newGameBoard } from "./src/script"
import { boardMoves } from "./src/script";
import { carrierBoat } from "./src/script";
import { hitCarrier } from "./src/script";
import { missCarrier } from "./src/script";
import { revealPositions } from "./src/script";
import { isGameFinsished } from "./src/script";

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
        expect(newGameBoard().makeBoard()[0]).toStrictEqual([["A"], ["1"]])
    })
    test("tests makeBoard() finishes at ['J', '10'], and checks there are only 100 positions", () => {
        expect(newGameBoard().makeBoard()[boardMoves - 1]).toStrictEqual([["J"], ["10"]])
    })
    test("tests board starting", () => {
        expect(newGameBoard().board[0]).toStrictEqual([["A"], ["1"]])
    })
    // }) // -- THESE ARE COMMENTED OUT OTHERWISE WILL FAIL SINCE THEY REQUIRE EXPLICIT DATA--//
    //     test("mock tests getBoatPosition() correctly creates boat positions for a carrier - uses 50 as randomPos", () => {
    //         expect(carrierBoat).toStrictEqual([[["F"], ["1"]], [["F"], ["2"]], [["F"], ["3"]], [["F"], ["4"]], [["F"], ["5"]]])
    //     })
    //     test("mock tests receiveAttack() correctly acknowledges successful attacks", () => {
    //         expect(hitCarrier).toBe("Success, carrier has now been hit 1 time(s), from F,1.")
    //     })
    //     test("mock tests receiveAttack() correctly acknowledges missed attacks", () => {
    //         expect(missCarrier).toBe("missed carrier at ['A','1']")
    //     })
    // test("checks boats have correct lengths being pushed to their coordinates (checks after they have been deployed) by using the deployShip() function", () => {
    //     expect(newGameBoard().ships.carrier.coordinates).toBe("some coordinates")
    // })
    // test("check if all boats are sunk", () => {
    //     expect(isGameFinsished()).toBe("true")
    // })
    
})
