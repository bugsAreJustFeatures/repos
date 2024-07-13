// functions for making the grid

// function for creating each div
function createRow(num) {
    for (let i = (num - 1); i < num; i++) {
        let newRow = document.createElement("div");
        newRow.className = "column";
        newRow.addEventListener("mouseover", changeColour);
        document.getElementsByClassName("row")[0].appendChild(newRow);
    }
};
// function that creates the whole grid
    function createGrid(n) {
        for (let i = 0; i < n; i++) {
            createRow(n);
        }
    }

    // function for creating a new grid with the userInput
    function newGrid() {
        let userInput = prompt("Please enter a number between 0 and 100. ");

        if ((userInput < 1) || (userInput > 99) || (isNaN(userInput))) {
            alert("Please check you entered a number between 0 and 100. ")
        } else {
            createGrid(userInput)
        }
    };

// function for squares to change colour
function changeColour() {
    // Check if the clicked div is in the inner area (not on the sides)
    if (!this.classList.contains("column-side")) {
        this.style.backgroundColor = "white"; // Change background color of the clicked div
    }
}
// function for resetting colour of divs when square is renewed
function resetColour() {
    let elements = document.querySelectorAll(".column");
    elements.forEach(function(element) {
        element.style.backgroundColor = "black";
    });
}


// button

// reset button
const resetButton = document.getElementById("resetBtn");

// event for reseting colour to default
resetButton.addEventListener("click", resetColour);

// event for creating a new grid to the user's discretion
resetButton.addEventListener("click", newGrid);


// // function that creates the basic 16x16 grid
// createGrid(16)
