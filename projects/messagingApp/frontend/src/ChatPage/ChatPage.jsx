import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "./ChatPage.module.css";

export default function ChatPage() {

    // state variables
    const [currentUserMessages, setCurrentUserMessages] = useState([]) // holds all messages of the current user
    const [otherUserMessages, setOtherUserMessages] = useState([])// holds all messages from the other users
    const [fetchedMessages, setFetchedMessages] = useState(false); // use to know if messags have been fetched
    const [messages, setMessages] = useState([]); // holds the final messages after sorting

    const params = useParams(); // get the chat name from react route param in react router url

    useEffect(() => {

        async function fetchMessages() {

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
                const data = await response.json();

                // check if response was ok
                if (!response.ok) {
                    console.error("Response from API was not ok")
                };

                // response was good so check who user made the message and update the relevant states
                setCurrentUserMessages(data.currentUserMessages);
                setOtherUserMessages(data.otherUserMessages);
                setFetchedMessages(true);
            } catch (err) {
                console.error("Unexpected Error: ", err);
            };
        };

        
        fetchMessages();
    }, [])

    useEffect(() => {

        function displayChatMessages() {
            let otherUserIndex = 0; // counter to use for the index of display other user messages
            let currentUserIndex = 0;// counter to use for the index of display current user messages
            let results = [];

            console.log("otherUserlength: ", otherUserMessages)
            // while loop through the messages until every one ahs been displayed

            if (otherUserMessages || currentUserMessages) { // check that messages have been fetched
                while (otherUserIndex < otherUserMessages.length || currentUserIndex < currentUserMessages.length) {
                    console.log("results:", results)
                    console.log("currentUserIndex: ", currentUserMessages[currentUserIndex])
                    console.log("otherUserIndex: ", otherUserMessages[otherUserIndex])
    
                    // check what message is older
    
                    // check if either has reached the end of their messages
                    if (!currentUserMessages[currentUserIndex]) {
                        results.push(
                            <div className={styles.otherUserMessage}>
                                {otherUserMessages[otherUserIndex].username}:
                                {otherUserMessages[otherUserIndex].message}
                            </div>
                        );
    
                        otherUserIndex++;
    
                    } else if (!otherUserMessages[otherUserIndex]) {
                        results.push(
                            <div className={styles.currentUserMessage}>
                                {currentUserMessages[currentUserIndex].username}: 
                                {currentUserMessages[currentUserIndex].message}
                            </div>
                        );
    
                        currentUserIndex++;
    
                    } else if (otherUserMessages[otherUserIndex].creation < currentUserMessages[currentUserIndex].creation) {// they both have messages left so check what ones are oldest
                        results.push(
                            <div className={styles.otherUserMessage}>
                                {otherUserMessages[otherUserIndex].username}:
                                {otherUserMessages[otherUserIndex].message}
                            </div>
                        );
    
                        otherUserIndex++;
    
                    } else if (otherUserMessages[otherUserIndex].creation > currentUserMessages[currentUserIndex].creation) { // either currentUser's message is older or no other user has sent anymore messages
                        results.push(
                            <div className={styles.currentUserMessage}>
                                {currentUserMessages[currentUserIndex].username}: 
                                {currentUserMessages[currentUserIndex].message}
                            </div>
                        );
    
                        currentUserIndex++;
    
                    };
                };

                setMessages(results);
            } else {

            }
        };

        displayChatMessages();
    }, [fetchedMessages])

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
            if (!response.ok) {
                console.error("Unexpected Error whilst sending Message")
            };
        } catch (err) {
            console.error("Unexpected error while sending message: ", err);
        };
    };

    return (

        <div id={styles.wrapper}>
            <div id={styles.messageWrapper}>
                {messages && messages.map((msg) => (
                    <>
                        {msg}
                    </>
                ))}
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