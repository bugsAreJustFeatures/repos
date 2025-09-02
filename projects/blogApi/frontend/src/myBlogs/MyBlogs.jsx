import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styles from "./MyBlogs.module.css";

export default function MyBlogs() {

    // state variables
    const [blogs, setBlogs] = useState(null); // holds blogs and their data after fetching
    const [authError, setAuthError] = useState(false); // is used to show a message if an error has occured

    // use to navigate to edit blog page
    const navigate = useNavigate();

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
                // console.error("Unexpected error: ", err);
            };
        };
    
        // call the function and actually fetch the blogs
        fetchBlogs();
    }, []);

    function handleClick(blogName) {

        // console.log(blogName)
        navigate(`/edit-blog/${blogName}`);
    };

    // fetch has not completed 
    if (authError) {
        return <p> Please login or sign up to view blogs </p>;
    } else if (!blogs) {
        return <p>Loading...</p>
    } else if (blogs.length < 1) { // fetch was successful but returned no blogs, user has no blogs
        return (
            <div id={styles.noBlogsContainer}>
                <h3>You have no blogs.</h3>
                <p>Start creating today!</p>
            </div>
        );
    };

    return (
        <div id={styles.wrapper}>
        {/* loop through blogs */}
            {blogs.map((blog, index) => (
                <div key={index} className={styles.blogs}>
                    {/* give each one a link that sends them to the page to view the blog and show whether or not it is published */}
                    <Link to={`/view-blogs/${blog.blog_title}`}>
                    <div className={styles.blog}>
                        {blog.blog_title} - {blog.is_published ? "Published" : "Not published" }
                        {!blog.is_published && (
                            <button onClick={() => {handleClick(blog.blog_title)}}>Edit Blog</button>
                        )}
                    </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

