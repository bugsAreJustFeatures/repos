import styles from "./HomePage.module.css"
import image from "../assets/waldo1.jpg"
import { useState } from "react";

export default function HomePage() {

    // state variables
    const [isThereBox, setIsThereBox] = useState(false);

    // function that handles the click on image, displays box where user clicked
    function handleImageClick(e) {

        // --NOTE-- //
        // if the page is resized after the image has been clicked then the box will move since
        // im placing it on the page and using the page coords to place it but dont 
        // worry since there will only be one box showing at a time and i will have 
        // already have recorded where the user has clicked on the image which is all
        // i really need, also user can just re-click where they want to if they 
        // resize page 

        // amount of margin (offset) being appied to image itself
        const offsetTop = e.target.offsetTop; 
        const offsetLeft = e.target.offsetLeft;
        
        // click coords on user's page
        const pageX = e.clientX; 
        const pageY = e.clientY;

        // click coords on image (what i want to record in db)
        const clickOnImageX = pageX - offsetLeft; 
        const clickOnImageY = pageY - offsetTop; 

        // get rid of old box when new one is placed
        if (isThereBox) {
            const oldBox = document.getElementById(styles.selectCharacterBox);
            e.target.parentElement.removeChild(oldBox);
        };

        // box that is placed where user has clicked to display menu to select character
        const selectCharacterBox = document.createElement("div"); // define element
        selectCharacterBox.id = styles.selectCharacterBox; // give css module id
        selectCharacterBox.style.left = `${pageX}px`; // uses the px's from the left side that the user clicked, as the margin
        selectCharacterBox.style.top = `${pageY}px`; // same above but from the top
        e.target.parentElement.appendChild(selectCharacterBox); // add element into DOM and as a child to the parent (waldoImageContainer)

        // create form that has an event listener and select options
        const selectCharacterForm = document.createElement("form");
        selectCharacterForm.id = styles.selectCharacterForm;
        selectCharacterForm.addEventListener("submit", (e) => {handleForm(e)});

        // select field that houses the options (drop down menu)
        const selectField = document.createElement("select");
        selectField.id = styles.selectField;

        // submit button that is used to submit the form
        const sumbitBtn = document.createElement("button");
        sumbitBtn.id = styles.submitBtn;
        sumbitBtn.type = "sumbit";
        sumbitBtn.innerHTML = "Confirm Character";

        // add an option for each character into the select field via looping
        const characters = ["waldo", "wally"];
        characters.forEach((character, key) => {
            // new Option(text, value, defaultSelected, selected)
            const option = new Option(character, character, false, false);
            option.id = styles[`${character}Option`]; // give unique name from character such as styles.waldoOption
            selectField.appendChild(option);
        });

        // adding to DOM in the correct order
        selectCharacterForm.appendChild(selectField);
        selectCharacterForm.appendChild(sumbitBtn)
        selectCharacterBox.appendChild(selectCharacterForm);

        // debugging 

        // console.logs
        // console.log("x-axis on image: ", clickOnImageX)
        // console.log("y-axis on image: ", clickOnImageY)
        // console.log("pageX: ", pageX)
        // console.log("pageY: ", pageY)
        // console.log(e)

        // update state
        setIsThereBox(true);
    };

    // form that handles sumbitting character selection form
    function handleForm(e) {
        e.preventDefault();

        console.log(e.target)
    }


    return (
        <div id={styles.wrapper}>
            <div id={styles.waldoImageContainer}>
                <img onClick={handleImageClick} src={image} alt="a where's waldo image" id={styles.waldoImage} />
            </div>
        </div>  
    )
};