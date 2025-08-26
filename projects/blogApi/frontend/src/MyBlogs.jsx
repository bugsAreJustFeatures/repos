import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MyBlogs() {

    // state of the fetched blogs
    const [blogs, setBlogs] = useState(null);
    
    // error if user is not authorised
    const [authError, setAuthError] = useState(false);

    // useEffect to fetch blogs
    useEffect(() => {
        async function fetchBlogs() {
    
            try {
                const response = await fetch("/api/my-blogs", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });
    
                // user is not signed in 
                if (response.status == 401) {
                    setAuthError(true);
                    return;

                //  user is signed in but an error occured
                } else if (!response.ok) {
                    throw new Error("API Error");
                };

                // allow browser to read it
                const data = await response.json();

                // update state to include the array of blogs only
                setBlogs(data.blogs);

            } catch (err) { // something went wrong that was not with the api
                console.error("Unexpected error: ", err);
            };
        };
    
        // call the function and actually fetch the blogs
        fetchBlogs();
    }, []);

    // fetch has not completed 
    if (authError) {
        return <p> Please login or sign up to view blogs </p>;
    } else if (!blogs) {
        return <p>Loading...</p>
    } else if (blogs.length < 1) { // fetch was successful but returned no blogs, user has no blogs
        return (
            <>
                <h3>You have no blogs.</h3>
                <p>Start creating today!</p>
            </>
        );
    };

    return (
        <>
            {blogs.map((blog, index) => (
                <div key={index}>
                    <Link to={`/my-blogs/${blog.post_title}`}> {blog.post_title} - {blog.is_posted ? "Posted" : "Not Posted"} </Link>
                </div>
            ))}
        </>
    );
};

