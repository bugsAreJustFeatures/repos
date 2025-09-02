import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./HomePage.module.css";

import placeHolderImage from "../assets/free-nature-images.jpg";

export default function HomePage() {
    
    const [blogs, setBlogs] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getPublishedBlogs() {

            try {

                if (!localStorage.getItem("token")) {
                    return;
                } else {
                    const response = await fetch("/api/getPublishedBlogs", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        },
                    });
        
                    if (!response.ok) {
                        // throw new Error("API Error");
                        setError(true)
                        return;
                    } else {
                        const data = await response.json();
                        setBlogs(data.blogs); // returns array of each blog as an object [blog1, blog2] where each entry is an object
                    }
                }
    

            } catch(err) {
                console.error("Unexpected Error: ", err);
                setError(true);
            };
        };

        getPublishedBlogs();
    }, []);

    if (!blogs && !localStorage.getItem("token")) {
        return <div className={styles.msgWrapper}><p className={styles.msg}>Login to see blogs</p></div>
    };

    if (error) {
        return <div className={styles.msgWrapper}><p className={styles.msg}>Error has occured</p></div>
    }

    return (
        <div id={styles.blogWrapper}>

            {blogs && blogs.map((blog, index) => (

                <div key={index} className={styles.blogs}>
                    <Link to={`/view-blogs/${blog.blog_title}`} className={styles.link}>
                        <div className={styles.blog}>
                            <div className={styles.authorAndDate}>
                                <div className={styles.author}>
                                    Author: {blog.users.username} 
                                </div>

                                <div className={styles.date}>
                                    {new Date(blog.creation_time).toDateString()}
                                </div>
                            </div>

                            <div className={styles.tags}>
                                Tags will go here, tag1, tag2, tag3, tag4, tag5
                            </div>

                            <div className={styles.previewImageWrapper}>
                                <img src={placeHolderImage} className={styles.previewImage} />
                            </div>

                            <div className={styles.titleAndSummary}>
                                <div className={styles.titleWrapper}>
                                    <p className={styles.title}>
                                        {blog.blog_title}
                                    </p>
                                </div>

                                <div className={styles.summary}>
                                    <p className={styles.summary}>
                                        {blog.summary || "This is where summary goes" } Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat similique laboriosam provident blanditiis molestias dolorum? Libero voluptas, natus nulla possimus et non perferendis id corporis nihil! Facilis in consequuntur laborum odit, aperiam unde itaque enim doloremque similique corporis esse suscipit quis nostrum eveniet neque illum perspiciatis dolores doloribus eligendi. Culpa.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </Link>
                </div>
            ))}
        </div>
    )
};