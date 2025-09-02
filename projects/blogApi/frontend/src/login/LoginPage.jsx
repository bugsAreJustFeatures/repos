import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./LoginPage.module.css"

export default function LoginPage() {

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState(null);

    async function handleForm(e) {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;
    
        try {

            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            const data = await response.json();
            console.log(data)
            if (!response.ok) {
                if (data.err) {
                    setErrorMessage(data.err);
                    return;
                } else {
                    throw new Error("API problem");
                }
            } else {
                localStorage.setItem("token", data.token);
                navigate("/");
            }

        } catch (err) {
            console.error("Unexpected Error occured: ", err);
        };
            
    };

    return (

        <div id={styles.wrapper}>

            {errorMessage && (
                <div id={styles.errorMessage}>
                    {errorMessage}
                </div>
            )}

            <form onSubmit={(e) => {handleForm(e)}} id={styles.loginForm}>
                <label htmlFor="username" id={styles.usernameLabel}>Username: </label>
                <input type="text" name="username" id={styles.usernameField} defaultValue={"yyharryboy"}/>
                <br />
                <label htmlFor="password" id={styles.passwordLabel}>Password: </label>
                <input type="password" name="password" id={styles.passwordField} defaultValue={"123456"} />
                <br />
                <button type="submit" id={styles.submitBtn}>login</button>
            </form>
        </div>
    )
};