import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import styles from "./MyChatsPage.module.css";

export default function MyChatsPage() {

    // state variables
    const [loggedIn, setLoggedin] = useState(false); // whether user is signed in or not
    const [chats, setChats] = useState([]); // holds the user's chats

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

        async function fetchChats() {
            try {
                const response = await fetch("/api/fetchChats", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("main")}`,
                    },
                });

                // read response
                const data = await response.json();
                
                if (!response.ok) {
                    console.error("Could not fetch chats")
                };
                //update state with fetched chats
                setChats(data.chats);
            } catch (err) {
                // console.error("API Error", err);
            };
        };

        checkAuth();
        fetchChats();
    }, []);

    async function handleCreateChat(e) {
            // prevent default form
            e.preventDefault();
    
            const username = e.target.addUserInput.value; // get the username that the user wants to create a chat with
    
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
    
                // check response was ok
                if (!response.ok) {
                    console.error("Something went wrong with API response")
                };
    
                // chat was made so take user to it
                navigate(`/my-chats/${data.chatName}`);
            } catch (err) {
                // console.error("Unexpected error occured: ", err);
            };
        };

    return (
        <div id={styles.wrapper}>
            {loggedIn && (
                <div id={styles.loggedInWrapper}>

                    <div id={styles.createChatWrapper}>
                        <form onSubmit={(e) => {handleCreateChat(e)}}>
                            <label htmlFor="addUserInput">Start chat with user:</label>
                            <input type="text" name="addUserInput" id={styles.addUserInput} defaultValue={"123"} placeholder="To add someone, enter their username here"/>

                            <button type="submit">Start chatting</button>
                        </form>
                    </div>

                    {chats && (
                        <div id={styles.chatListWrapper}>
                            {chats.map((chat, index) => (
                                <div key={index} id={`styles.chat${index}Wrapper`}> 
                                    <Link to={`/my-chats/${chat.name}`}>
                                        {chat.name}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            )}
        </div>
    )
};