const sum = require('./sum')

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

// Capitalise test //

const capitalise = require("./capitalise")

test("returns capitalised string", () => {
  expect(capitalise("harry")).toBe("HARRY")
});

// Reverse string test //

const reverseString = require("./reverseString")

test("reverse a string", () => {
  expect(reverseString("harry")).toBe("yrrah")
})

// calculator test //

const calc = require("./calc")

test ("add", () => {
  expect(calc.add(1,2)).toBe(3)
})
test ("subtract", () => {
  expect(calc.subtract(3,2)).toBe(1)
})
test ("divide", () => {
  expect(calc.divide(10,5)).toBe(2)
})
test ("multiply", () => {
  expect(calc.multiply(5,5)).toBe(25)
})


// caesar cipher test //

const cipher = require("./caesarCipher")

test("can use the caesar cipher", () => {
  expect(cipher("Hello, World!", 3)).toBe("Khoor, Zruog!")
})

// analyse array test //

const analyse = require("./analyseArray") 

test("analyse an array", () => {
  expect(analyse([1,8,3,4,2,6])).toStrictEqual([4,1,8,6])
})