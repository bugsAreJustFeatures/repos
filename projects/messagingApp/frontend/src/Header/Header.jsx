import { Outlet } from "react-router-dom";
import styles from "./Header.module.css"

export default function Header() {

    return (
        <>
            <div id={styles.wrapper}>
                <div id={styles.logoImageContainer}>
                    <img alt="brand logo"/>
                </div>
                <div id={styles.logoNameContainer}>
                    <p>uMessage</p>
                </div>
            </div>

            <Outlet/>

        </>
        
    );
};