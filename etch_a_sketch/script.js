const flexContainer = document.createElement('div');
flexContainer.id = "flexContainer";
document.body.appendChild(flexContainer);

// const divs = document.createElement('div');
// divs.id = "divs";
// document.getElementById('flexContainer').appendChild(divs);

const cell = document.createElement('div');
cell.className = "cell";
document.getElementById("flexContainer").appendChild(cell);

function createRow(num) {
    for (let i = 0; i < (num * num); i++) {
        let eachRow = document.createElement('div');
        eachRow.className = "eachRow";
        eachRow.style.border = "thick dotted black";
        eachRow.style.padding = "10px"; 
        eachRow.style.width = "calc(100% / 16)";
        eachRow.style.height = "calc(100% / 16)";
        document.getElementById('flexContainer').appendChild(eachRow);
    }
};


createRow(16);
// createColumn(16);
