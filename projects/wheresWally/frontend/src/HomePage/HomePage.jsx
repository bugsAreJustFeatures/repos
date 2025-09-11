import { Link } from "react-router-dom";

import styles from "./HomePage.module.css";

export default function HomePage () {

    return (
        <div id={styles.wrapper}>
            <button id={styles.beachClubBtn}>
                <Link to={"/beach-club"}>Beach Club</Link>
            </button>
        </div>
    )
};