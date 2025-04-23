function analyseArray(array) {

    let total = 0;
    let max = array[0]
    let min = array[0]

    for (let i = 0; i < array.length; i++) { // loop for finding total, to then divided by length and find average after
        let num = array[i]

        if (num > max) {//biggest number so far
            max = num    
        }
        if (num < min) {//smallest number so far
            min = num    
        }

        total += num // find total

    }

    let average = Math.fround(total / array.length)// find average
    let length = array.length // find length

    let newArray = [average,min,max,length]

return newArray
}



module.exports = analyseArray
