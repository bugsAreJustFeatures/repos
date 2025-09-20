import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutPage() {

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("main");

        setTimeout(() => {
            navigate("/");
        }, 750);
    }, []);

    return (
        <h1>Logging you out...</h1>
    )
};