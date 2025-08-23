import { useNavigate } from "react-router-dom";

export default function signUpPage() {

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
                console.log("response was not ok: ", data);
                return;
            };

            // console.log(data)

            navigate("/login")
        } catch (err) {
            console.log("Unexepected error: ", err);
        };
    }   

    return (
        <>
            <form onSubmit={handleForm}>
                <label htmlFor="username">Enter a Username: </label>
                <input type="text" name="username" id="username" required defaultValue={"1234"}/>
                <br />
                <label htmlFor="password">Enter a Password: </label>
                <input type="password" name="password" id="password" required defaultValue={"1234"}/>
                <br />
                <label htmlFor="passwordConfirm">Confirm Password: </label>
                <input type="password" name="passwordConfirm" id="passwordConfirm" required defaultValue={"1234"}/>
                <br />
                <button type="submit">Sign Up</button>
            </form>
        </>
    )
};