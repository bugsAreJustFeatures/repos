import { useEffect, useState } from "react";

export default function BlogsPage() {

    // use state to store response so that i updates
    const [responseData, setResponseData] = useState("Loading...");

    useEffect(() => {
       async function getPage() {
            let newData;

            try {
                newData = await fetch ("/api/blogs", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "content-type": "application/json",
                    },
                });

                if (!newData.ok) {
                    console.log(responseData)
                    throw new Error("API Fetch failed");
                };

                newData = await newData.json();
                setResponseData(newData);

                console.log("1st: ", newData)

            } catch (err) {
                console.error("Unexpected error occured: ", err);
            };


            // TIME TO DELETE AND START OVER
            // i now understand it, or whwat i need to at least.
            // so have a last look, maybe push to github, but then just delete the whole frontend folder and fresh install react.
            // practice makes perfect
            // iwas going to pretend to do the blogs thing but i cba and im just going to delete and i do know how to do it 



        };
    getPage();
    
    }, []);


    return (
        "hi"
    )
};