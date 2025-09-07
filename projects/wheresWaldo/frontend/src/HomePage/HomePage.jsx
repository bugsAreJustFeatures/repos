    import styles from "./HomePage.module.css"
    import image from "../assets/waldo1.jpg"
    import { useState } from "react";

    export default function HomePage() {

        // state variables
        const [isThereBox, setIsThereBox] = useState(false);
        const [pageClickX, setPageClickX] = useState(null);
        const [pageclickY, setPageClickY] = useState(null);
        const [imageClickX, setImageClickX] = useState(null);
        const [imageClickY, setImageClickY] = useState(null);

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
            const clickOnPageX = e.clientX; 
            const clickOnPageY = e.clientY;

            // click coords on image (what i want to record in db)
            const clickOnImageX = clickOnPageX - offsetLeft; 
            const clickOnImageY = clickOnPageY - offsetTop; 

            // state updates
            setPageClickX(clickOnPageX);
            setPageClickY(clickOnPageY);
            setImageClickX(clickOnImageX);
            setImageClickY(clickOnImageY);
            setIsThereBox(true);
        };

        // form that handles sumbitting character selection form
        function handleForm(e) {
            e.preventDefault(); 

            console.log(`B - X: ${imageClickX}, Y: ${imageClickY}`);
            console.log(e.target)
        }


        return (
            <div id={styles.wrapper}>
                <div id={styles.waldoImageContainer}>
                    <img onClick={handleImageClick} src={image} alt="a where's waldo image" id={styles.waldoImage} />

                    {isThereBox && (
                        <div id={styles.selectCharacterBox} style={{left: `${pageClickX}px`, top: `${pageclickY}px`}}>
                            <form id={styles.selectCharacterForm} onSubmit={(e) => {handleForm(e)}}>
                                <select name="selectField" id={styles.selectField}>
                                    <option value="waldo" id={styles.waldoOption}> Waldo </option>
                                    <option value="wally" id={styles.wallyOption}> Wally </option>
                                </select>

                                <button type="submit">Confirm Character</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>  
        )
    };