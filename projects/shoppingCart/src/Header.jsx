import { Link } from "react-router-dom"

import styles from "./Header.module.css"

const Header = ( {count} ) => {
    return (
        <div className={styles.header}>
            <div className={styles.upperHeader}>
                <div className={styles.logoContainer}>
                    <Link to={"/"}>
                        <img src="/public/logo.png" alt="Logo" />
                    </Link>
                    
                </div>

                <div className={styles.basketContainer}>
                    <Link to={"/404"}>
                        <img src="/public/basket.png" alt="Basket icon" />
                    </Link>
                    <p>{count}</p>
                </div>
            </div>

            <div className={styles.lowerHeader}>
                <div className={styles.homeBtn}>
                    <Link to={"/"}>Home</Link>
                </div>

                <div className={styles.shopBtn}>
                    <Link to={"/shop"}>Shop</Link>
                </div>

            </div>

        </div>
    )
}

export default Header