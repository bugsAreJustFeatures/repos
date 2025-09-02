import { useNavigate } from "react-router-dom";

export default function SignOutPage() {

    const navigate = useNavigate();

    async function logOutUser() {
        try {
            const response = await fetch("/api/log-out", {
                method: "POST",
            });


            if (!response.ok) {
                throw new Error("Could not log user out.");
            };

            console.log(await response.json());

            setTimeout(() => {
                localStorage.removeItem("token");
                navigate("/");
            }, 2000)

            

        } catch (err) {
            console.error("Unexpected error: ", err);
            return;
        };
    };

    logOutUser();

    return <h1>Signing out...</h1>

};