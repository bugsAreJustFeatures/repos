import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState(null);

    async function handleForm(e) {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;
    
        try {

            console.log(username + " " + password)
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
            if (!response.ok) {
                if (data.inputErr) {
                    setErrorMessage(data.inputErr);
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

        <>
            {errorMessage && (
                <div>
                    {errorMessage}
                </div>
            )}

            <form onSubmit={(e) => {handleForm(e)}}>
                <label htmlFor="username">Username: </label>
                <input type="text" name="username" id="username" defaultValue={"yyharryboy"}/>
                <br />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" defaultValue={"123456"} />
                <br />
                <button type="submit">login</button>
            </form>
        </>
    )
};