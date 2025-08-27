import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
    
    const [blogs, setBlogs] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getPostedBlogs() {
            try {
                const response = await fetch("/api/getPublishedBlogs", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });
    
                if (!response.ok) {
                    throw new Error("API Error");
                };
    
                const data = await response.json();
                console.log("data: ", data.blogs)
                setBlogs(data.blogs); // returns array of each blog as an object [blog1, blog2] where each entry is an object

            } catch(err) {
                console.error("Unexpected Error: ", err);
                setError(true);
            };
        };

        getPostedBlogs();
    }, []);

    if (error) {
        return <h2>An error occured - see console</h2>
    };

    if (!blogs) {
        return <h2>Loading...</h2>
    };

    return (
        <>
            {blogs.map((blog, index) => (
                <div key={index}>
                    {/* add a link to user profile later on when i make a profile page */}
                    {blog.users.username} 
                    {/* need to make route below */}
                    <Link to={`/view-blogs/${blog.post_title}`}>{blog.post_title}</Link>
                </div>
            ))}
        </>
    )
};