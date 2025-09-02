import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./SignUp.module.css";

export default function SignUpPage() {

    const [validationErrors, setValidationErrors] = useState(null);
    const [usernameError, setUsernameError] = useState(null);

    const navigate = useNavigate();

    async function handleForm(e) {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;
        const passwordConfirm = e.target.passwordConfirm.value;

        try {
            const response = await fetch("/api/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                    passwordConfirm,
                }),
            });

            const data = await response.json();
            
            if (!response.ok) {

                if (data.validationErrors) {
                    setValidationErrors(data.validationErrors);

                } else if (data.msg) {
                    setUsernameError(data.msg);

                } else {
                    console.log("good request", data)
                    return;
                }
            } else {
                setValidationErrors(null);
                setUsernameError(null);

                navigate("/login");
            };

        } catch (err) {
            console.log("Unexepected error: ", err);
        };
    };   

    return (
        <div id={styles.wrapper}>

            <div id={styles.errorWrapper}>
                {validationErrors && (
                        validationErrors.map((err, index) => (
                            <div id={styles.errorMsgWrapper}>
                                <div key={index} className={styles.errorMsg}>
                                    {err.msg}
                                </div>
                                <br /><br />
                            </div>
                        ))
                    )}

                {usernameError && (
                    <div id={styles.usernameError}>
                        {usernameError}
                    </div>
                )}
            </div>

            <form onSubmit={handleForm} id={styles.signUpForm}>
                <label htmlFor="username" id={styles.usernameLabel}>Enter a Username: </label>
                <input type="text" name="username" id={styles.usernameField} required defaultValue={"harryboy"}/>
                <br />
                <label htmlFor="password" id={styles.passwordLabel}>Enter a Password: </label>
                <input type="password" name="password" id={styles.passwordField} required defaultValue={"123456"}/>
                <br />
                <label htmlFor="passwordConfirm" id={styles.passwordConfirmLabel}>Confirm Password: </label>
                <input type="password" name="passwordConfirm" id={styles.passwordConfirmField} required defaultValue={"123456"}/>
                <br />
                <button type="submit" id={styles.submitBtn}>Sign Up</button>
            </form>
        </div>
    )
};