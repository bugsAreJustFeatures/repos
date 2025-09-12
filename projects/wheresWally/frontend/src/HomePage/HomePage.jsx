import { Link } from "react-router-dom";

import styles from "./HomePage.module.css";
import { useEffect } from "react";

export default function HomePage () {

    useEffect(() => {
        async function createTempUser() {
            try {
                // create temp user on backend 
                const response = await fetch("/api/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                // watch response
                console.log(response);
                const data = await response.json();
                console.log(data);

                // response was not ok
                if (!response.ok) {
                    console.error("Something went wrong")
                };

                // add jwt to localstorage
                localStorage.setItem("accessToken", data.accessToken);
            } catch(err) {
                console.error(err);
            };
        };

        createTempUser();
    }, [])

    return (
        <div id={styles.wrapper}>
            <button id={styles.beachClubBtn}>
                <Link to={"/beach-club"}>Beach Club</Link>
            </button>
        </div>
    )
};