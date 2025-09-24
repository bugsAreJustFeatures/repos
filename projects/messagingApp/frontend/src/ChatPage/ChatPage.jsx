import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "./ChatPage.module.css";

export default function ChatPage() {

    // state variables
    const [chatMessages, setChatMessages] = useState([]) // holds all the messages in this chat

    const params = useParams(); // get the chat name from react route param in react router url
    
    useEffect(() => {

        async function fetchMessages() {

            console.log(params.chatName)
            // try to fetch all messages in this chat   
            try {
                const response = await fetch(`/api/fetchMessages/${params.chatName}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("main")}`,
                    },
                });

                // read response
                console.log(response)
                const data = await response.json();
                console.log(data)

                // check if response was ok
                if (!response.ok) {
                    console.error("Response from API was not ok")
                };

                // response was good so update state
                setChatMessages(data.chatMessages);
            } catch (err) {
                console.error("Unexpected Error: ", err);
            };
        };

        fetchMessages();
    }, [])

    return (

        <div id={styles.wrapper}>
            This is the page for {params.chatName}

            <div id={styles.otherUserMessages}>

                Other user messages: <br />


            </div>

            <div id={styles.userMessages}>

                Your messages: <br />

                {chatMessages && (
                    chatMessages.map((msg) => (
                        <p>{msg.message_content}</p>
                    ))
                )}
            </div>
        </div>
    )
};