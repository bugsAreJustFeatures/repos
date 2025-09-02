import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom";

import styles from "./Navbar.module.css";

export default function Navbar() {
    return (
        <>
            <div id={styles.wrapper}>

                <div className={styles.linkContainer} id={styles.homeLink}>
                    <Link to={"/"} className={styles.link}> Home </Link>
                </div>
                
                <div className={styles.linkContainer} id={styles.signUpLink}>
                    <Link to={"/sign-up"} className={styles.link}> Sign Up </Link>
                </div>
                
                <div className={styles.linkContainer} id={styles.loginLink}>
                    <Link to={"/login"} className={styles.link}> Login </Link>
                </div>
                
                <div className={styles.linkContainer} id={styles.myBlogsLink}>
                    <Link to={"/my-blogs"} className={styles.link}> My Blogs </Link>
                </div>
                
                <div className={styles.linkContainer} id={styles.createBlogLink}>
                    <Link to={"/createBlog"} className={styles.link}> Create blog </Link>
                </div>
                
                <div className={styles.linkContainer} id={styles.settingsLink}>
                    <Link to={"/settings"} className={styles.link}> Settings </Link>
                </div>
                
                <div className={styles.linkContainer} id="signOutLink">
                    <Link to={"/sign-out"} className={styles.link}> Sign Out </Link>
                </div>
            </div>
        <Outlet />
        </>
    );
};