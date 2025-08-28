import { useState } from "react";

export default function CreateBlog() {

    const [validationErrors, setValidationErrors] = useState(null);

    async function handleForm(e) {
        e.preventDefault();

        let blogOption;

        e.nativeEvent.submitter.name == "postBtn" ? blogOption = "postBlog" : blogOption = "saveBlog";

        try {
            let response = await fetch(`/api/${blogOption}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    blogTitle: e.target.blogTitle.value,
                    blogContent: e.target.blogContent.value,
                }),
            });

            console.log(localStorage.getItem("token"))

            if (!response.ok) {
                const data = await response.json();
                if(data.validationErrors) {
                    setValidationErrors(data.validationErrors);
                    return
                } else {
                    throw new Error("Error whilst handling blog")
                };
            };
        } catch (err) {
            console.error("Unexpected error occured: ", err);
        };
    };


    return (
        <>

            {validationErrors && (
                validationErrors.map((err, index) => (
                    <div key={index}>
                        {err.msg}
                    </div>
                ))
            )}
            <form onSubmit={handleForm}>
                <label htmlFor="blogTitle">Title: </label>
                <input type="text" name="blogTitle" id="blogTitle" />

                <br /><br />

                <label htmlFor="blogContent">Write your blog: </label>
                <textarea name="blogContent" id="blogContent"></textarea>

                <button type="submit" name="postBtn">Post Blog</button>
                <button type="submit" name="saveBtn">Save Blog</button>
            </form>
        </>
    )
};