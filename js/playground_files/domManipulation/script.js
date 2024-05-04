// create a p element paragraph that is red
const newParagraph = document.createElement("p");

newParagraph.textContent = "Hey I'm a red paragraph!";

newParagraph.style.color = "red";

// create a h3 header that is blue
const newHeader = document.createElement("h3");

newHeader.textContent = "I'm a blue h3!";

newHeader.style.color = "blue";

// create a div with black border, pink background with elements inside it

const newDiv = document.createElement("div");

newDiv.style.border = "thick solid black";

newDiv.style.padding = "50px";

newDiv.style.width = "250px";

newDiv.style.backgroundColor = "pink";

const insideDiv = document.createElement("h1")

insideDiv.textContent = "I'm in a div";

const pInDiv = document.createElement("p");

pInDiv.textContent = "ME TOO";

// manipulation appended
document.body.appendChild(newParagraph);

document.body.appendChild(newHeader);

document.body.appendChild(newDiv);

newDiv.appendChild(insideDiv);

newDiv.appendChild(pInDiv)

// events

const btn = document.querySelector("#btn");
btn.onclick = () => alert("Hello World"); 

const btnTwo = document.querySelector("#btnTwo");
btnTwo.addEventListener("click", () => {
    alert("Hello World");
});

btn.addEventListener("click", (e) => {
    console.log(e)
})