import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function EditBlog() {
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState(false);

    const { blogName } = useParams();

    useEffect(() => {
        async function getBlog() {
            try {
                const response = await fetch(`/api/view-blogs/${blogName}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("API error");
                };

                const data = await response.json();
                setBlog(data.blog)
            } catch (err) {
                console.error("Server side error: ", err);
            };
        };

        getBlog();
    }, []);

    async function handleFormSubmit(e) {
        e.preventDefault();

        const newBlogTitle = e.target.blogTitle.value;
        const newBlogContent = e.target.blogContent.value;

        try {
            const response = await fetch(`/api/update-blog/${blogName}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    newBlogTitle,
                    newBlogContent,
                }),
            });

            console.log(await response.json())

            if (!response.ok) {
                throw new Error("API Error");
            };

        } catch (err) {
            console.error("Server side error: ", err);
            setError(true);
            return;
        };
    }

    if (!blog) {
        return <h3>Loading...</h3>
    };

    return (
        <>
            <form onSubmit={(e) => {handleFormSubmit(e)}}>
                <label htmlFor="blogTitle">Title: </label>
                <input type="text" name="blogTitle" id="blogTitle" defaultValue={blog.blog_title} />
                <br />
                <label htmlFor="blogContent">Your Blog: </label>
                <textarea name="blogContent" id="blogContent" defaultValue={blog.blog_content}></textarea>
                <br />
                <button type="submit">Update Blog</button>
            </form>
        </>

    )
};