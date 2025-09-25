import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "./ChatPage.module.css";

export default function ChatPage() {

    // state variables
    const [currentUserMessages, setCurrentUserMessages] = useState([]) // holds all messages of the current user
    const [otherUserMessages, setOtherUserMessages] = useState([])// holds all messages from the other users
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

                // response was good so check who user made the message and update the relevant states
               
            } catch (err) {
                console.error("Unexpected Error: ", err);
            };
        };

        fetchMessages();
    }, [])

    async function handleSendMessage(e) {
        // prevent default form 
        e.preventDefault();

        const message = e.target.sendMessageInput.value;
        console.log(message)

        // try to send message
        try {
            const response = await fetch("/api/sendMessage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("main")}`,
                },
                body: JSON.stringify({
                    message,
                    chatName: params.chatName,
                }),
            });

            // read and check response
            console.log(response);
            const data = await response.json();
            console.log(data);

        } catch (err) {
            console.error("Unexpected error while sending message: ", err);
        };


    };

    return (

        <div id={styles.wrapper}>
            This is the page for {params.chatName}

            <div id={styles.otherUserMessages}>

                Other user messages: <br />


            </div>

            <div id={styles.userMessages}>

                Your messages: <br />

            
            </div>

            <div>
                <form onSubmit={(e) => {handleSendMessage(e)}}>
                    <label htmlFor="sendMessageInput">Send Message:</label>
                    <input type="text" name="sendMessageInput" id={styles.sendMessageInput} defaultValue={"Hello World"} required />

                    <button type="submit">Send Message</button>
                </form>
            </div>
        </div>
    )
};