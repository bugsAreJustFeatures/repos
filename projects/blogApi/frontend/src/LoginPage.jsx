import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    const navigate = useNavigate();

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    async function handleForm(e) {
        e.preventDefault();

        setUsername(e.target.username.value);
        setPassword(e.target.password.value);

        if (!username || !password) {
            return;
        }
    
        console.log(username)
        console.log(password)

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

            // console.log("slfjdslk: ", response)

            if (!response.ok) {
                throw new Error("API problem");
            };

            const data = await response.json();
            localStorage.setItem("token", data.token);
            navigate("/my-blogs");
        } catch (err) {
            console.error("Unexpected Error occured: ", err);
        };
            
    };

    return (
        <form onSubmit={handleForm}>
            <label htmlFor="username">Username: </label>
            <input type="text" name="username" id="username" defaultValue={"123"}/>
            <br />
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" defaultValue={"123"}/>
            <br />
            <button type="submit">login</button>
        </form>
    )
};