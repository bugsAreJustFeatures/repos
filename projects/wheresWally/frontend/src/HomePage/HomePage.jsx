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
        const [foundCharacter, setFoundCharacter] = useState(false); // use to know what message to display after user attempts to find character
        const [notFoundCharacter, setNotFoundCharacter] = useState(false); // use to know what message to display after user attempts to find character
        const [knownCharacters, setKnownCharacter] = useState([]); // used to store and display the characters that have been found
        const [latestFind, setLatestFind] = useState(null); // use to show who the user found and notify them they found them
        const [alreadyKnown, setAlreadyKnown] = useState(false); // use to show that the user has already searched there and found someone instead of searching db again
        const [alreadyKnownCharacter, setAlreadyKnownCharacter] = useState(null); // use to show that the user has already searched there and found someone instead of searching db again - but this has the character name 

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
        async function handleForm(e) {
            // stop resetting page 
            e.preventDefault(); 

            // get character and sceneNumber to pass to api
            const character = e.target.selectField.value
            const sceneNumber = 1;

            // user already found who they're looking for 
            if (knownCharacters.includes(character)) {
                setAlreadyKnown(true);
                setAlreadyKnownCharacter(character);
                setFoundCharacter(false);
                setNotFoundCharacter(false);
                return;
            };

            try {
                const response = await fetch(`/api/check/${sceneNumber}`, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        resultX: imageClickX,
                        resultY: imageClickY,
                        character
                    }),
                });

                // if response was not ok
                if (!response.ok) {
                    // do some error state that displays an error message
                    console.error("Error whilst contacting API");
                };

                // show the json response from api - remove in prod
                const data = await response.json();
                console.log(data)

                // response was good and now handle whether user was correct or not
                if (data.msg == "success") {
                    notFoundCharacter ? setNotFoundCharacter(false) : ""; // if the last click has a result of "not found" then reset it so it shows correct message
                    alreadyKnown ? setAlreadyKnown(false) : ""; // if the last click has a result of "already found" then reset it so it shows correct message
                    setFoundCharacter(true); // update to show correct message of user finding someone
                    setKnownCharacter([...knownCharacters, data.foundCharacter]); // add newly found character to array state
                    setLatestFind(data.foundCharacter); // use this to show latest find in message

                } else {
                    foundCharacter ? setFoundCharacter(false) : ""; // if the last click has a result of "found" then reset it so it shows correct message
                    alreadyKnown ? setAlreadyKnown(false) : ""; // if the last click has a result of "already found" then reset it so it shows correct message
                    setNotFoundCharacter(true); // show correct message that allows user to know they didnt find anyone
                };

            } catch (err) { // internal error for dev
                throw new Error("Something went wrong: ", err);
            };
        };

        return (
            <div id={styles.wrapper}>
                <div id={styles.announcementBanner}>

                    {foundCharacter && (
                        <div id={styles.foundCharacterMessageWrapper}>
                                <p>Congratulations! You Found {latestFind}!</p> 
                        </div>
                    )}

                    {notFoundCharacter && (
                        <div id={styles.notFoundCharacterMessageWrapper}>
                                <p>Unlucky, but no one is there sadly. Have another go!</p>
                        </div>
                    )}

                    {alreadyKnown && (
                        <div id={styles.notFoundCharacterMessageWrapper}>
                                <p>You found {alreadyKnownCharacter} here already!&#128517;</p>
                        </div>
                    )}
                </div>

                <div id={styles.waldoImageContainer}>
                    <img onClick={(e) => {handleImageClick(e)}} src={image} alt="a where's wally image" className={styles.scene} />

                {/* only display box if user has clicked on image and stops multiple displaying */}
                    {isThereBox && (
                        <div id={styles.selectCharacterBox} style={{left: `${pageClickX}px`, top: `${pageclickY}px`}}>
                            <form id={styles.selectCharacterForm} onSubmit={(e) => {handleForm(e)}}>
                                <select name="selectField" id={styles.selectField}>
                                    <option value="wally" id={styles.wallyOption}> Wally </option>
                                    <option value="harry" id={styles.wallyOption}> harry </option>
                                </select>

                                <button type="submit">Confirm Character</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>  
        )
    };