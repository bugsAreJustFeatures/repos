// import packages
import { useEffect, useState,  } from "react";
import { useNavigate } from "react-router-dom";

// import styling from css module
import styles from "./HomePage.module.css";

export default function HomePage() {

    // state variables
    const [loggedIn, setLoggedin] = useState(false); // whether user is signed in or not
    const [showLoginForm, setShowLoginForm] = useState(false); // show form to allow user to login or the register form (if this is false), if user is not signed in already
    const [validationErrors, setValidationErrors] = useState([]); // holds the errors from the register form after checking in the backend

    // global component variables
    const navigate = useNavigate();

    // use effect that checks to see the status of the user on mount
    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await fetch("/api/checkAuth", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("main")}`
                    },
                });

                if (!response.ok) {
                    // user has a jwt that is valid so they are already logged in
                    if (response.status == 200) {
                        setLoggedin(true);
                        setShowLoginForm(false);
                        return;
    
                    } else if (response.status == 403) { // invalid jwt
                        // setShowLoginForm(true); -- undo
                        setLoggedin(false);
                        return;
    
                    } else if (response.status == 401) {// no jwt
                        setShowLoginForm(true);
                        setLoggedin(false);
                        return;
                    } else {
                        console.error("Unknown error occured");
                    };
                };


            } catch (err) {
                throw new Error("Something went wrong: ", err);
            };
        };

        checkAuth();
    }, []);

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

            // read response and get jwt to store in local storage
            const data = await response.json();
            localStorage.setItem("main", data.accessToken);

            // all went well so update state
            setLoggedin(true);
            setShowLoginForm(false);

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

            // something went wrong
            if (!response.ok) {
                // read response
                const data = await response.json();
                // the form was not filled out correctly
                if (data.validationErrors) {
                    console.log(data)
                    setValidationErrors(data.validationErrors);
                    return;
                } else {
                    // unknown error internally
                    console.error("Could not register user, issue with API!");
                };
            };

            // all went well 
            setShowLoginForm(true);


        } catch (err) {
            console.error("Unknown error when registering new user: ", err);
        };
    };

    return (
        <div id={styles.wrapper}>
            
            {loggedIn ? (
                <div id={styles.loggedInWrapper}> 
                    <p>You're Logged In</p>
                </div>
            ) : ( <div id={styles.notLoggedInWrapper}>

                    {showLoginForm ? (
                        <div id={styles.loginFormWrapper}>

                            <form onSubmit={(e) => handleLoginForm(e)}>

                                <label htmlFor="loginUsername">Username:</label>
                                <input type="text" name="loginUsername" id={styles.loginUsername} required defaultValue={"abc"}/>

                                <label htmlFor="loginPassword">Password:</label>
                                <input type="password" name="loginPassword" id={styles.loginPassword} required defaultValue={"abc"}/>

                                <button type="submit">Login</button>
                            </form>
                        </div>
                    ) : (

                        <div id={styles.registerContentWrapper}>

                            {validationErrors && (

                                <div id={styles.validationErrorWrapper}>

                                    <ul id={styles.validationErrorListWrapper}>

                                        {validationErrors.map((err, index) => (

                                            <li key={index} id={styles.validationMessageWrapper}>

                                                <p>{err.msg}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            

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
                        </div>
                    )}
                </div> 
            )}
        </div>

        
    )
};