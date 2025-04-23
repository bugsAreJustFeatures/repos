function reverseString(string) {

    string = string.split("")
    string = string.reverse()
    return string.join("")
}

module.exports = reverseString