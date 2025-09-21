import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

import styles from "./Header.module.css";

export default function Header() {

    // state variables 
    const [loggedIn, setLoggedIn] = useState(false); // to know what links to show 
    const [username, setUsername] = useState(null); // holds the users database to show when theyre logged in

    // global component variables
    const location = useLocation();

    useEffect(() => {
        console.log(location)
        async function checkAuth() {
            try {
                const response = await fetch("/api/checkAuth", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("main")}`,
                    },
                });

                // check response

                console.log(response)
                const data = await response.json();
                console.log(data)
                // user is logged in
                if (response.status == 200) {
                    console.log(200)

                    setUsername(data.user); // update state with username
                    setLoggedIn(true);

                } else if (response.status == 401 || response.status == 403) { // user is not logged in
                    console.log(401 + " or " + 403)
                    setLoggedIn(false);

                } else { // an error occured
                    console.log(error)
                    setLoggedIn(false);
                    console.error("Something went wrong whilst checking user credentials.");

                };
            } catch (err) {
                throw new Error("Unexpected error occured: ", err);
            };
        };

        checkAuth();
    }, [location]);

    return (
        <>
            <div id={styles.wrapper}>

                <div id={styles.logoImageContainer}>
                    <img alt="brand logo"/>
                </div>
                <div id={styles.logoNameContainer}>
                    <p>uMessage</p>
                </div>

                {loggedIn ? (
                    <div id={styles.loggedInLinksWrapper}> 
                        <Link to={"/logout"}>Logout</Link>
                        |
                        <Link to={`/users/${username}`}>{username}</Link>
                    </div>
                ) : (
                    <div id={styles.notLoggedInLinksWrapper}>
                        <Link to={"/login"}>Login</Link> 
                        <Link to={"/register"}>Register</Link> 
                    </div>

                )}

            </div>

            <Outlet/>

        </>
        
    );
};