import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewBlog() {

    // state variables
    const [blog, setBlog] = useState(null); // holding the blog data after i fetch it
    const [comments, setComments] = useState(null); // holding comments data after fetching
    const [updateComments, setUpdateComments] = useState(false); // boolean variable to reset comments after a new one has been made
    const [displayCommentForm, setDisplayCommentForm] = useState(false); // boolean variable that is used to display the comment form if user clicks the "create comment" button
    const [errorMessage, setErrorMessage] = useState(null); // change to boolean and do it like i did in the home page

    // get blog name from param in url in react router
    const { blogName } = useParams();
    
    // useEffect for getting blog data, only used on mount
    useEffect(() => {
        async function getBlog() {
            try {
                // fetch blog data
                const response = await fetch(`/api/view-blogs/${blogName}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                // if fetch was not ok
                if (!response.ok) {
                    throw new Error("Response from server was bad");
                };

                
                // make data readable by browser and update the state with it
                const data = await response.json()
                setBlog(data.blog);
            } catch (err) {
                // server side error occured
                console.error("Unexpected error: ", err);

            };
        };

        // call the function
        getBlog();
    }, []);

    // useEffect used for fetching blog comments, used on mount and state change of comments (when a new comment is added)
    useEffect(() => {
        async function getBlogComments() {
            try {
                // fetch comments for blog
                const response = await fetch(`/api/view-blogs/${blogName}/comments`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                

                console.log("fetch blog comments: ", response)

                // check fetch was ok
                if (!response.ok) {
                    throw new Error("Error whilst getting comments");
                };

                // update state with new comments
                const data = await response.json();
                setComments(data.comments);
            } catch (err) {
                // console.error("Unexpected error: ", err);

                // display error message in html so that its not just "Loading..."
                setErrorMessage(<h1>An error occured</h1>);
            };
        };

        // call function
        getBlogComments();
    }, [updateComments])

    // function for handling the form that creates a comment on blog
    async function handleCommentForm(e) {
        // stop form from resetting page before data is sent
        e.preventDefault(); 

        // get values from form
        const commentTitle = e.target.commentTitle.value;
        const commentContent = e.target.commentContent.value;

        try {
            // fetch the url to add comment
            const response = await fetch("/api/createComment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                // add comment details in body so thats its accessable in api
                body: JSON.stringify({
                    blogName: blogName,
                    commentTitle: commentTitle,
                    commentContent: commentContent,
                }),
            });


            // check adding comment went well
            if (!response.ok) {
                throw new Error("API Error");
            };

            // update state so that it resets comments and refetches them (it then includes the newly made comment) and then hides the create comment form
            setUpdateComments(true);
            setDisplayCommentForm(false);
        } catch (err) {
            // server side error occured
            // console.error("Unexpected error: ", err);

            // display error message on page
            setErrorMessage(<h1>An error occured</h1>)
        };
    };

    // check i dont just load empty page and then check i have both the blog AND the comments
    if (!blog || !comments) {
        return <h1>Loading...</h1>
    };

    // main return statement if blog fetch, comment fetch, comments are more than 0, then this will show
    return (
        // blog details
        <>
            {blog.post_title}

            <br />

            {blog.post_content}

            <br /><br /><br /><br /><br />

        {/* comment section  */}
            <h2>Comments</h2>

            <button onClick={() => {setDisplayCommentForm(true)}}>Create comment</button>

            {displayCommentForm && (
                <form onSubmit={handleCommentForm}> 
                    <label htmlFor="commentTitle">Comment Title: </label>
                    <input type="text" name="commentTitle" id="commentTitle" placeholder="(optional)" defaultValue={"my comment title"}/>
                    <br />
                    <label htmlFor="commentContent">Your Comment: </label>
                    <textarea name="commentContent" id="commentContent" required defaultValue={"my comment"}/>
                    <br />
                    <button type="submit">Add comment</button>
                </form>
            )}

            {/* check if there are any comments, if there is then loop through and display otherwise just show a h3 tag message */}
            {comments.length > 0 ? comments.map((comment, index) => (
                <div key={index}>
                    User: {comment.users.username} <br />
                    Comment Title: {comment.comment_title} <br />
                    {/* ---This is just to remind myself how to access the title later on-- */}
                    Comment: {comment.comment_content}
                    <br />
                    <br />

                </div>
                
            )) : <h3>Be the first to add a comment on this blog!</h3>}
        </>
    );
};