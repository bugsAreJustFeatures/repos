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

    async function handleCreateChat(e) {
        // prevent default form
        e.preventDefault();

        const username = e.target.addUserInput.value;

        try {
            const response = await fetch("/api/createChat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("main")}`,
                },
                body: JSON.stringify({
                    username,
                }),
            });

            // check response

            //read response
            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                console.error("Something went wrong with API response")
            };
        } catch (err) {
            console.error("Unexpected error occured: ", err);
        };
    };

    async function handleMessageSubmit(e) {
        // prevent default form 
        e.preventDefault();

        const message = e.target.messageContent.value; // get user message


    };

    return (
        <div id={styles.wrapper}>
            {loggedIn && (
                <div id={styles.loggedInWrapper}>

                    <div id={styles.createChatWrapper}>
                        <form onSubmit={(e) => {handleCreateChat(e)}}>
                            <label htmlFor="addUserInput">Add User:</label>
                            <input type="text" name="addUserInput" id={styles.addUserInput} defaultValue={"123"} placeholder="To add someone, enter their username here"/>

                            <button type="submit">Start chatting</button>
                        </form>
                    </div>

                    <div id={styles.messagesWrapper}>

                    </div>

                    <div id={styles.messageFormWrapper}>
                        <form onSubmit={(e) => {handleMessageSubmit(e)}}>
                            <label htmlFor="messageContent">Send Message:</label>
                            <input type="text" name="messageContent" id={styles.messageContentInput} placeholder="Send a Message" defaultValue={"Hello World!"}/>

                            <button type="submit">&#129130;</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
};