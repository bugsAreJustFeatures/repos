import { useEffect, useState } from "react";

export default function MyBlogs() {

    // state of the fetched blogs
    const [blogs, setBlogs] = useState(null);

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
    
                // something wrong with api call
                if (!response.ok) {
                    throw new Error("API Error")
                };

                // allow browser to read it
                const data = await response.json();

                // update state to include the blogs object only
                setBlogs(data.blogs);

                console.log(data.blogs)
            } catch (err) {
                console.error("Unexpected error: ", err);
            };
        };
    
        fetchBlogs();
    }, []);

    if (!blogs) {
        return <p>Loading...</p>
    } else if (blogs.length < 1) {
        return <p>No blogs could be found.</p>
    };

    return (
        <>
            {blogs.map((blog, index) => (
                <div key={index}>
                    <p>created on: {blog.creation_time} (GMT)</p>
                    <p> {blog.is_posted} </p>
                    <p> {blog.post_title} </p>
                    <p> {blog.post_content} </p>
                </div>
            ))}
        </>
    );
};