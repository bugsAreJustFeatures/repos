import { useState } from "react";
import styles from "./HomePage.module.css";

export default function HomePage() {

    // state variables
    const [signedIn, setSignedin] = useState(false); // whether user is signed in or not
    const [showLoginForm, setShowLoginForm] = useState(false); // show form to allow user to login or the register form (if this is false), if user is not signed in already


    async function handleLoginForm(e) {
        // prevent default form behaviour
        e.preventDefault();

        const username = e.target.loginUsername.value;
        const password = e.target.loginPassword.value;

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            // check response was ok 
            if (!response.ok) {
                console.error("Response from server was not ok - Could not log user in!")
            };


        } catch (err) {
            console.error("Unknown error occured when trying to log user in: ", err);

        };
    };

    async function handleRegisterForm(e) {
        // prevent default form behaviour
        e.preventDefault();

        const username = e.target.registerUsername.value;
        const password = e.target.registerPassword.value;
        const confirmPassword = e.target.registerConfirmPassword.value;

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify({
                    username,
                    password,
                    confirmPassword,
                }),
            });

            console.log(response)

            if (!response.ok) {
                console.error("Could not register user, issue with API!");
            };

        } catch (err) {
            console.error("Unknown error when registering new user: ", err);
        };
    };

    return (
        <div id={styles.wrapper}>
            
            {signedIn ? (
                <div id={styles.signedinWrapper}> 
                    <p>You're Signed In</p>
                </div>
            ) : (<div id={styles.notSignedInWrapper}>

                    {showLoginForm ? (
                        <div id={styles.loginFormWrapper}>
                            <form onSubmit={(e) => handleLoginForm(e)}>
                                <label htmlFor="loginUsername">Username:</label>
                                <input type="text" name="loginUsername" id={styles.loginUsername} required/>

                                <label htmlFor="loginPassword">Password:</label>
                                <input type="password" name="loginPassword" id={styles.loginPassword} required/>

                                <button type="submit">Login</button>
                            </form>
                        </div>
                    ) : (
                        <div id={styles.registerFormWrapper}>
                            <form onSubmit={(e) => handleRegisterForm(e)}>
                                <label htmlFor="registerUsername">Username:</label>
                                <input type="text" name="registerUsername" id={styles.registerUsername} required placeholder="required" defaultValue={"abc"}/>

                                <label htmlFor="registerPassword">Enter A Password:</label>
                                <input type="password" name="registerPassword" id={styles.registerPassword} required placeholder="required" defaultValue={"abc"}/>

                                <label htmlFor="registerConfirmPassword">Confirm Password:</label>
                                <input type="password" name="registerConfirmPassword" id={styles.registerConfirmPassword} required placeholder="required" defaultValue={"abc"}/>

                                <button type="submit">Create Account</button>
                            </form>
                        </div>
                    ) }
                    
                </div> 
            )}
        </div>

        
    )
};