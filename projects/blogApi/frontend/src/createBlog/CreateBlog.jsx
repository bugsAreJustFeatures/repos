import { useState } from "react";

import styles from "./CreateBlog.module.css";

export default function CreateBlog() {

    const [validationErrors, setValidationErrors] = useState(null);

    async function handleForm(e) {
        e.preventDefault();

        let blogOption;

        e.nativeEvent.submitter.name == "publishBtn" ? blogOption = "publishBlog" : blogOption = "saveBlog";

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
        <div id={styles.wrapper}>

            {validationErrors && (
                validationErrors.map((err, index) => (
                    <div key={index}>
                        {err.msg}
                    </div>
                ))
            )}

            <form onSubmit={handleForm} id={styles.createBlogForm}>
                <label htmlFor="blogTitle" id={styles.titleLabel}>Title: </label>
                <input type="text" name="blogTitle" id={styles.titleField} />

                <br /><br />

                <label htmlFor="blogContent" id={styles.contentLabel}>Write your blog: </label>
                <textarea name="blogContent" id={styles.contentField}></textarea>

                <button type="submit" name="publishBtn" id={styles.publishBtn}>Publish Blog</button>
                <button type="submit" name="saveBtn" id={styles.saveBtn}>Save Blog</button>
            </form>
        </div>
    )
};