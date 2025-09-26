import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

// CSS Note //
//global css, define by className or id = "myClassOrId", this is from the import of App.css in the App.jsx and is passed down
import styles from "./ChatPage.module.css"; // module css, define with jsx object syntax classNmae or id = {styles.myClassOrId}

export default function ChatPage() {

    // state variables
    const [currentUserMessages, setCurrentUserMessages] = useState([]) // holds all messages of the current user
    const [otherUserMessages, setOtherUserMessages] = useState([])// holds all messages from the other users
    const [messages, setMessages] = useState([]); // holds the final messages after sorting

    // ref variables
    const chatsRef = useRef(null); // lets me hold a reference of all the chats to know when to automatically put user onto the latest message (bottom of div)

    // global variables
    const params = useParams(); // get the chat name from react route param in react router url

    // useEffect for things that should happen on mount (only fetching messages)
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
            } catch (err) {
                console.error("Unexpected Error: ", err);
            };
        };

        

        fetchMessages();
    }, [])

    // useEffect for things that should happen on mount and when certain states change
    useEffect(() => {
        function displayChatMessages() {
            let otherUserIndex = 0; // counter to use for the index of display other user messages
            let currentUserIndex = 0;// counter to use for the index of display current user messages
            let results = []; // holds all the divs that i will then map through and display in jsx

            // while loop through the messages until every one has been displayed
            if (otherUserMessages || currentUserMessages) { // check that messages have been fetched
                while (otherUserIndex < otherUserMessages.length || currentUserIndex < currentUserMessages.length) {
                    
                    // check what message is older    
                    // check if either has reached the end of their messages
                    if (!currentUserMessages[currentUserIndex]) {
                        results.push(
                            <div className={styles.otherUserMessage}>
                                <div className={styles.messageCreationTime}>
                                    {otherUserMessages[otherUserIndex].creation}
                                </div>

                                <div className={styles.messageUsername}>
                                    {otherUserMessages[otherUserIndex].username}

                                </div>

                                <div className={styles.messageContent}>
                                    {otherUserMessages[otherUserIndex].message}

                                </div>
                            </div>
                        );
                        otherUserIndex++;
    
                    } else if (!otherUserMessages[otherUserIndex]) {
                        results.push(
                            <div className={styles.currentUserMessage}>
                                <div className={styles.messageCreationTime}>
                                    {currentUserMessages[currentUserIndex].creation}
                                </div>

                                <div className={styles.messageUsername}>
                                    You
                                </div>

                                <div className={styles.messageContent}>
                                    {currentUserMessages[currentUserIndex].message}

                                </div>
                            </div>
                        );
                        currentUserIndex++;
    
                    } else if (otherUserMessages[otherUserIndex].creation < currentUserMessages[currentUserIndex].creation) {// they both have messages left so check what ones are oldest
                        results.push(
                            <div className={styles.otherUserMessage}>
                                <div className={styles.messageCreationTime}>
                                    {otherUserMessages[otherUserIndex].creation}
                                </div>

                                <div className={styles.messageUsername}>
                                    {otherUserMessages[otherUserIndex].username}

                                </div>

                                <div className={styles.messageContent}>
                                    {otherUserMessages[otherUserIndex].message}

                                </div>
                            </div>
                        );
                        otherUserIndex++;
    
                    } else if (otherUserMessages[otherUserIndex].creation > currentUserMessages[currentUserIndex].creation) { // either currentUser's message is older or no other user has sent anymore messages
                        results.push(
                            <div className={styles.currentUserMessage}>
                                <div className={styles.messageCreationTime}>
                                    {currentUserMessages[currentUserIndex].creation}
                                </div>

                                <div className={styles.messageUsername}>
                                    You

                                </div>

                                <div className={styles.messageContent}>
                                    {currentUserMessages[currentUserIndex].message}

                                </div>
                            </div>
                        );
                        currentUserIndex++;
                    };
                };

                setMessages(results);
            };
        };

        displayChatMessages();
    }, [otherUserMessages, currentUserMessages])

    // useEffect that scrolls chat to latest message
    useEffect(() => {
        function goToLatestChat() {
            const chats = chatsRef.current; // set it to the DOM element

            // check if there is a DOM element, basically just checks if there are any chats
            if (chats) {
                chats.scrollTop = chats.scrollHeight;
            };
        };

        goToLatestChat();
    }, [messages])

    async function handleSendMessage(e) {
        // prevent default form 
        e.preventDefault();
        const message = e.target.sendMessageInput.value; // get message that user wants to send

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
        <div className="pageWrapper">

            <div id={styles.chatWrapper}>
                <div id={styles.chatMessagesWrapper} ref={chatsRef}>
                    {messages && messages.map((msg, index) => (
                        <div className={styles.chatMessages} key={index}>
                            {msg}
                        </div>
                    ))}
                </div>

                <div id={styles.sendMessageFormWrapper}>
                    <form onSubmit={(e) => {handleSendMessage(e)}} id={styles.sendMessageForm}>
                        <input type="text" name="sendMessageInput" id={styles.sendMessageInput} placeholder="Send Message" required />

                        <button type="submit" id={styles.sendMessageButton}><p>&#10148;</p></button>
                    </form>
                </div>
            </div>

        </div>
    )
};