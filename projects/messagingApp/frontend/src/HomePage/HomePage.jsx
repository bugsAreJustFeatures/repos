// import packages
import { useEffect, useState,  } from "react";
import { useNavigate } from "react-router-dom";

// import styling from css module
import styles from "./HomePage.module.css";

export default function HomePage() {

    // state variables
    const [loggedIn, setLoggedin] = useState(false); // whether user is signed in or not

    // global component variables
    const navigate = useNavigate();

    // use effect that checks to see the status of the user on mount
    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await fetch("/api/checkAuth", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("main")}`
                    },
                });

                // user has a jwt that is valid so they are already logged in
                if (response.status == 200) {
                    setLoggedin(true);
                };
                
                if (!response.ok) {
                   if (response.status == 403) { // invalid jwt so send to login since they have logged in before
                        navigate("/login")
    
                    } else if (response.status == 401) {// no jwt so send to register page since they dont have a jwt and likely havent made an account yet
                        navigate("/register")

                    } else {
                        console.error("Unknown error occured");
                    };
                };

            } catch (err) {
                throw new Error("Something went wrong: ", err);
            };
        };

        checkAuth();
    }, []);

    return (
        <div id={styles.wrapper}>
            {loggedIn ? <p>Youre logged in</p> : <p>Youre not logged in</p>}
        </div>
    )
};