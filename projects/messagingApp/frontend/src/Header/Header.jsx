import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";

import styles from "./Header.module.css";

export default function Header() {

    // state variables 
    const [loggedIn, setLoggedIn] = useState(false); // to know what links to show 

    useEffect(() => {
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

                // user is logged in
                if (response.status == 200) {
                    setLoggedIn(true);

                } else if (response.status == 401 || response.status == 403) { // user is not logged in
                    setLoggedIn(false);
                } else { // an error occured
                    setLoggedIn(false);
                    console.error("Something went wrong whilst checking user credentials.");
                };
            } catch (err) {
                throw new Error("Unexpected error occured: ", err);
            };
        };

        checkAuth();
    }, []);

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
                    <div> 
                        <Link to={"/logout"}>Logout</Link>
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