console.log("Hello");

const reveal = document.getElementsByClassName("reveal");
const hidden = document.getElementsByClassName("hidden");

for (let i = 0; i < reveal.length; i++) {
    reveal[i].addEventListener("mouseover", function() {
        for (let j = 0; j < hidden.length; j++) {
            hidden[j].style.display = "flex";
        }
    });

    
    reveal[i].addEventListener("mouseout", function() {
        for (let j = 0; j < hidden.length; j++) {
            hidden[j].style.display = "none";
        }
    });
}
for (let i = 0; i < hidden.length; i++) {
    hidden[i].style.backgroundColor = ""; 
    hidden[i].style.listStyle = "none";
    hidden[i].style.display = "none"; 
}

for (let i = 0; i < hidden.length; i++) {
    hidden[i].addEventListener("mouseover", function () {
        this.style.display = "flex"
    });
    hidden[i].addEventListener("mouseout",function() {
        this.style.display = "none"
    })
}


// image carousal //
const carousal = document.getElementById("carousal");

const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");

let imageNumber = 1;
image1.style.display = "block";
image2.style.display = "none";
image3.style.display = "none";
carousal.appendChild(image1)

function checkNumber() {
    if (imageNumber == 1) {
        image1.style.display = "block";
        image2.style.display = "none";
        image3.style.display = "none";
        // carousal.innerHTML = "";
        carousal.appendChild(image1)
    }
    if (imageNumber == 2) {
        image1.style.display = "none";
        image2.style.display = "block";
        image3.style.display = "none";
        // carousal.innerHTML = "";
        carousal.appendChild(image2)
    }
    if (imageNumber == 3) {
        image1.style.display = "none";
        image2.style.display = "none";
        image3.style.display = "block";
        // carousal.innerHTML = "";
        carousal.appendChild(image3)
    }
}

//-----events for changing picture number-----//
leftArrow.addEventListener("click", function() {
    if (imageNumber <= 1) {
        imageNumber = 3;
    } else {
        imageNumber--
    };
    checkNumber()
    console.log(imageNumber)
})
rightArrow.addEventListener("click", function() {
    if (imageNumber >= 3) {
        imageNumber = 1
    } else {
        imageNumber++
    };
    checkNumber()

    console.log(imageNumber)
})

console.log(imageNumber)
