import { Link } from "react-router-dom"

import styles from "./HomePage.module.css"

const HomePage = () => {

    return (
        <div className={styles.message}>
            Welcome to our store

            <br /><br />

            Click the button below to be transferred to our store page.

            <Link to={"/shop"}>
                <button className={styles.transferBtn}>Transfer me</button>
            </Link>

        </div>



      
    )
}

export default HomePage