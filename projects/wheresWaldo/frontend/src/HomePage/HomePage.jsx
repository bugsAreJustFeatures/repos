import styles from "./HomePage.module.css"
import image from "../assets/waldo1.jpg"

export default function HomePage() {

    function handleImageClick(e) {

        // --NOTE-- //
        // if the page is resized after being clicked then the box will move since
        // im placing it on the page and using the page coords to place it but dont 
        // worry since there will only be one box showing at a time and i will have 
        // already have recorded where the user has clicked on the image which is all
        // i really need, also user can just re-click where they want to if they 
        // resize page 

        // amount of margin (offset) being appied to image itself
        const offsetTop = e.target.offsetTop; 
        const offsetLeft = e.target.offsetLeft;
        
        // click coords on user's page
        const pageX = e.clientX; // where user clicked on x axis of page
        const pageY = e.clientY; // where user clicked on y axis of page

        // click coords on image (what i want to record)
        const clickOnImageX = pageX - offsetLeft; 
        const clickOnImageY = pageY - offsetTop; 

        // box that is placed where user has clicked to display menu to select character
        const selectCharacterBox = document.createElement("div");
        selectCharacterBox.id = styles.selectCharacterBox;
        selectCharacterBox.style.left = `${pageX}px`;
        selectCharacterBox.style.top = `${pageY}px`;
        e.target.offsetParent.appendChild(selectCharacterBox);

        // debugging 
        // console.logs
        console.log("x-axis on image: ", clickOnImageX)
        console.log("y-axis on image: ", clickOnImageY)
        console.log("pageX: ", pageX)
        console.log("pageY: ", pageY)
        console.log(e)
    };


    return (
        <div id={styles.wrapper}>
            <div id={styles.waldoImageContainer}>
                <img onClick={handleImageClick} src={image} alt="a where's waldo image" id={styles.waldoImage} />
            </div>
        </div>  
    )
};