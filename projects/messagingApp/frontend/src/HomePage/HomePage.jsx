// import packages
import { useEffect, useState,  } from "react";
import { useNavigate } from "react-router-dom";

// import styling from css module
import styles from "./HomePage.module.css";

export default function HomePage() {

    // // state variables
    // const [loggedIn, setLoggedin] = useState(false); // whether user is signed in or not

    // // global component variables
    // const navigate = useNavigate();

    // // use effect that checks to see the status of the user on mount
    // useEffect(() => {
    //     async function checkAuth() {
    //         try {
    //             const response = await fetch("/api/checkAuth", {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": `Bearer ${localStorage.getItem("main")}`
    //                 },
    //             });


    //         } catch (err) {
    //             // throw new Error("Something went wrong: ", err);
    //         };
    //     };

    //     checkAuth();
    // }, []);
    
    return (

        <div className="pageWrapper">
            <div id={styles.homeWrapper}>
                <p>Welcome to ouiMessage.</p>

                <p>A place where oui can all message each other and have a great time.</p>

                <p>No charges. No delays. No worries.</p>

                <p>oui have got everything you would want to keep in touch with friends and family.</p>
            </div>
        </div>
    )
};