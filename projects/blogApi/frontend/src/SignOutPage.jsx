import { useNavigate } from "react-router-dom";

export default function SignOutPage() {

    const navigate = useNavigate();

    setTimeout(() => {
        localStorage.removeItem("token");
        navigate("/")
    }, 2000)

    return (
        <h1>Signing out...</h1>
    )
};