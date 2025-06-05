import { Await } from "react-router-dom";
import styles from "./ShopPage.module.css"

const ShopPage = ({increaseBasketNumber}) => {
    
    return (

        // could have used props but didnt, might come back and change it to make it better
        <div className={styles.shopContent}>

                <div className={styles.item}>
                    <div className={styles.imageContainer}>
                        <img src={null} alt="itemOneImage" />
                    </div>

                    <button className={styles.addBtn} onClick={increaseBasketNumber}>Add to Cart</button>
                </div>

                <div className={styles.item}>
                    <div className={styles.imageContainer}>
                        <img src="null" alt="itemTwoImage" />
                    </div>

                

                    <button className={styles.addBtn} onClick={increaseBasketNumber}>Add to Cart</button>
                </div>

                <div className={styles.item}>
                    <div className={styles.imageContainer}>
                        <img src="null" alt="itemThreeImage" />
                    </div>


                    <button className={styles.addBtn} onClick={increaseBasketNumber}>Add to Cart</button>
                </div>

                <div className={styles.item}>
                    <div className={styles.imageContainer}>
                        <img src="null" alt="itemFourImage" />
                    </div>


                    <button className={styles.addBtn} onClick={increaseBasketNumber}>Add to Cart</button>
                </div>

                <div className={styles.item}>
                    <div className={styles.imageContainer}>
                        <img src="null" alt="itemFiveImage" />
                    </div>

                 

                    <button className={styles.addBtn} onClick={increaseBasketNumber}>Add to Cart</button>
                </div>

                <div className={styles.item}>
                    <div className={styles.imageContainer}>
                        <img src="null" alt="itemSixImage" />
                    </div>


                    <button className={styles.addBtn} onClick={increaseBasketNumber}>Add to Cart</button>
                </div>

        </div>
            
        

    )
}

export default ShopPage