    import styles from "./BeachClub.module.css"
    import image from "../assets/waldo1.jpg"
    import { useEffect, useState } from "react";
    import { useNavigate } from "react-router-dom";

    export default function BeachClub() {

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
        const [isGameFinished, setIsGameFinished] = useState(false); // use to send request to check timer when all character have been found
        const [finishTime, setFinishTime] = useState(null); // use to keep track of when the user found all characters
        const [timeToComplete, setTimeToComplete] = useState(null); // will be set to how long it took user to game

        const navigate = useNavigate(); // used to send user back to home page after completing game
        const characterList = ["Wally"]; // list of characters
        

        useEffect(() => {

            async function startTimer() {
                try {
                    const response = await fetch("/api/start-timer", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                    });

                    // console.log(startTimer);
                    const data = await response.json();
                    console.log(data);

                    // went wrong
                    if (!response.ok) {
                        console.error("request to start timer was bad, cannot time you");
                        return;
                    };
                } catch (err) {
                    console.error("error with timer backend: ", err);
                };
            };

            startTimer();
        }, []);

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
        async function handleSelectCharacterForm(e) {
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
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                    body: JSON.stringify({
                        resultX: imageClickX,
                        resultY: imageClickY,
                        character,
                    }),
                });

                // if response was not ok
                if (!response.ok) {
                    // do some error state that displays an error message
                    console.error("Error whilst contacting API");
                };

                // read json to know the message
                const data = await response.json();

                // response was good and now handle whether user was correct or not
                if (data.msg == "success") {
                    notFoundCharacter ? setNotFoundCharacter(false) : ""; // if the last click has a result of "not found" then reset it so it shows correct message
                    alreadyKnown ? setAlreadyKnown(false) : ""; // if the last click has a result of "already found" then reset it so it shows correct message
                    setFoundCharacter(true); // update to show correct message of user finding someone
                    setKnownCharacter([...knownCharacters, data.foundCharacter]); // add newly found character to array state
                    setLatestFind(data.foundCharacter); // use this to show latest find in message

                    // check if all characters have been found and if so game is complete
                    if ((knownCharacters.length + 1 ) == characterList.length) {
                        setFinishTime(Date.now());
                        setIsGameFinished(true);
                    };
                    
                } else {
                    foundCharacter ? setFoundCharacter(false) : ""; // if the last click has a result of "found" then reset it so it shows correct message
                    alreadyKnown ? setAlreadyKnown(false) : ""; // if the last click has a result of "already found" then reset it so it shows correct message
                    setNotFoundCharacter(true); // show correct message that allows user to know they didnt find anyone
                };

            } catch (err) { // internal error for dev
                throw new Error("Something went wrong: ", err);
            };
        };

        async function handleSumbitUsernameForm(e) {
            // stop form resetting page
            e.preventDefault();

            const username = e.target.usernameInput.value; // username that user inputted
                
            try {
                const finishGame = await fetch("/api/finish-game", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                    body: JSON.stringify({
                        username,
                        finishTime,
                    }),
                });
                // if the request was not ok
                if (!finishGame.ok) {
                    console.log(await finishGame.json())
                    console.error("Could not finish game");
                };

                navigate("/"); // navigate back to home page after submitting username
            } catch (err) {
                console.error("Error happened in finishGame: ", err);
            };
        };

        return (
            <div id={styles.wrapper}>

                <h1 id={styles.sceneName}>Beach Club</h1>

                <div id={styles.announcementBanner}>

                    {foundCharacter && (
                        <div id={styles.foundCharacterMessageWrapper}>
                                <p>You Found {latestFind}!</p> 
                        </div>
                    )}

                    {notFoundCharacter && (
                        <div id={styles.notFoundCharacterMessageWrapper}>
                                <p>Unlucky, but no one is there sadly. Have another go!</p>
                        </div>
                    )}

                    {alreadyKnown && (
                        <div id={styles.notFoundCharacterMessageWrapper}>
                                <p>You found {alreadyKnownCharacter} here already!</p>
                        </div>
                    )}

                    
                </div>

                {isGameFinished ? (
                    <div id={styles.finishedGameWrapper}>
                        <div id={styles.timeAndFormWrapper}>
                            <div id={styles.timeWrapper}>
                                <p>Your Time: {timeToComplete} </p>
                            </div>

                            <div id={styles.formWrapper}>
                                <form onSubmit={(e) => {handleSumbitUsernameForm(e)}} id={styles.timeForm}>
                                    <label htmlFor="usernameInput" id={styles.usernameInputLabel}>Username:</label>
                                    <input type="text" name="usernameInput" id={styles.usernameInput} required placeholder="Required" />

                                    <button type="submit" id={styles.usernameSubmitBtn}>Sumbit Time</button>
                                </form>
                            </div>
                        </div>
                        <p>&#x1F389;CONGRATULATIONS! YOU FOUND EVERYONE!&#x1F389;</p>
                    </div>

                ) : <div id={styles.waldoImageContainer}>
                        <img onClick={(e) => {handleImageClick(e)}} src={image} alt="a where's wally image" className={styles.scene} />
            
                            {isThereBox && (
                                <div id={styles.selectCharacterBox} style={{left: `${pageClickX}px`, top: `${pageclickY}px`}}>
                                    <form id={styles.selectCharacterForm} onSubmit={(e) => {handleSelectCharacterForm(e)}}>
                                        <select name="selectField" id={styles.selectField}>
                                            <option value="Wally" id={styles.wallyOption}> Wally </option>
                                        </select>
                            
                                        <button type="submit">Confirm Character</button>
                                    </form>
                                </div>
                            )}
                    </div>
                }
            </div>  
        )
    };