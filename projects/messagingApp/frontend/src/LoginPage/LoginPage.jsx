import { useNavigate } from "react-router-dom";

import styles from "./LoginPage.module.css"
import { useState } from "react";


export default function LoginPage() {

    // state variables
    const [formError, setFormError] = useState(false); // check user has filled out form correctly

    const navigate = useNavigate();

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
            // user input was not good
            if (response.status == 202) {
                setFormError(true);
            };

            // user input was good 
            if (!response.ok) {
                console.error("Response from server was not ok - Could not log user in!");

            } else {
                // read response and get jwt to store in local storage
                const data = await response.json();
                localStorage.setItem("main", data.accessToken);

                navigate("/");
            };

        } catch (err) {
            console.error("Unknown error occured when trying to log user in: ", err);
        };
    };

    return (

        <div id={styles.registerContentWrapper}>
            {formError && (
                <div id={styles.formErrorWrapper}>
                    <ul>
                        <li>
                            <p>
                                Username or password was incorrect
                            </p>
                        </li>
                    </ul>
                </div>
            )}

            <div id={styles.loginFormWrapper}>
                <h2>Login</h2>
                <form onSubmit={(e) => handleLoginForm(e)}> 
                    <label htmlFor="loginUsername">Username:</label>
                    <input type="text" name="loginUsername" id={styles.loginUsername} required defaultValue={"abc"}/>

                    <label htmlFor="loginPassword">Password:</label>
                    <input type="password" name="loginPassword" id={styles.loginPassword} required defaultValue={"abc"}/>  
                    
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
};