function caesarCipher(string, n) {

    let result = ""

    for (let i = 0; i < string.length; i++) {

        let letter = string[i] //takes single character 
        let isLowerCase = "a" <= letter && letter <= "z"; // uses their index in the unicode values. a = 97, z = 122, so in this range are lower case letters
        let isUpperCase = "A" <= letter && letter <= "Z"; // same thing as before but A = 65, Z = 90, so anything in this range is upper case.
        let isLetter = isLowerCase || isUpperCase; // returns true if either are in the range, therefore is a letter, otherwise returns false and is not a letter

        if (!isLetter) { //not a letter
            result += letter
            
        } else {
            letter = letter.charCodeAt(0) // assign the unicode to the letter - "a" returns 97 

            if (isLowerCase) { // letter is lower case
                letter += n //shift the unicode using given shift pattern - "a" returns 100
    
                if (letter > 122) {//gone past z and need to loop back from a
                    let diff = letter - 122
                    letter = 96 + diff
                }
    
                if (letter < 97) {//gone before a and need to loop back from z
                    let diff = 97 - letter
                    letter = 123 - diff
                }
            }
    
            if (isUpperCase) {// letter is uppercase
                letter += n //shift the unicode using given shift pattern - "a" returns 100
    
                if (letter > 90) {//gone past Z and need to loop back from A
                    let diff = letter - 90
                    letter = 90 + diff    
                }
            }
    
            if (letter < 65) {//gone before A and need to loop back from Z
                let diff = 65 - letter
                letter = 91 - diff
            }

            let char = String.fromCodePoint(letter)
    
            result += char
        }
    }
    return result
}

module.exports = caesarCipher