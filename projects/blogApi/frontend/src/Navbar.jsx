import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom"

export default function Navbar() {
    return (
        <>
            <Link to={"/"}> Home </Link>

            | 

            <Link to={"/signup"}> Sign Up  </Link>

            | 

            <Link to={"/login"}> Login </Link>

            <br />

            <Outlet />
        </>
    )
};