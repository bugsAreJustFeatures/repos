    import styles from "./HomePage.module.css"
    import image from "../assets/waldo1.jpg"
    import { useState } from "react";

    export default function HomePage() {

        // state variables
        const [isThereBox, setIsThereBox] = useState(false); // used to check if there is a box already displayed, if true it turns false and doesnt allow react display it
        const [pageClickX, setPageClickX] = useState(null); // where user clicked on page, used to position box
        const [pageclickY, setPageClickY] = useState(null); // where user clicked on page, used to position box
        const [imageClickX, setImageClickX] = useState(null); // where user clicked on image, used to store in db and work out if they was right
        const [imageClickY, setImageClickY] = useState(null); // where user clicked on image, used to store in db and work out if they was right

        // function that handles the click on image, displays box where user clicked
        function handleImageClick(e) {
            // amount of margin (offset) being appied to image itself - used to work out where the image is on screen
            const offsetTop = e.target.offsetTop; 
            const offsetLeft = e.target.offsetLeft;
            
            // find where user clicked on their screen (in px's)
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
            // stop resetting page 
            e.preventDefault(); 

            console.log(`B - X: ${imageClickX}, Y: ${imageClickY}`);
            console.log(e.target.selectField.value)
            
        }


        return (
            <div id={styles.wrapper}>
                <div id={styles.waldoImageContainer}>
                    <img onClick={(e) => {handleImageClick(e)}} src={image} alt="a where's waldo image" id={styles.waldoImage} />

                {/* only display box if user has clicked on image and stops multiple displaying */}
                    {isThereBox && (
                        <div id={styles.selectCharacterBox} style={{left: `${pageClickX}px`, top: `${pageclickY}px`}}>
                            <form id={styles.selectCharacterForm} onSubmit={(e) => {handleForm(e)}}>
                                <select name="selectField" id={styles.selectField}>
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