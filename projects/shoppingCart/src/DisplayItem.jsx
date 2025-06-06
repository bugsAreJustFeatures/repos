import { useEffect, useState } from "react"
import styles from "./DisplayItem.module.css"

const DisplayItem = ({updateFromHere}) => {

    const [amount, setAmount] = useState(0)
    const [imageUrl, setImageUrl] = useState("")

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("https://fakestoreapi.com/products/1")

                if (!response.ok) {
                    throw new Error("Could not find resource")
                }

                const data = await response.json()
                setImageUrl(data.image)
            }

            catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [])

    function increaseAmount() {
        return (
            setAmount(a => a + 1)
        )
    }

    function decreaseAmount() {
        if (amount > 0) {
            setAmount(a => a - 1)
        }
    }

    function addToBasket() {
        return (
            updateFromHere(prev => prev + amount)
        )
    }

    return (

        <div className={styles.card}>

            <div className={styles.imageContainer}>
                <img src={imageUrl || "#"} alt="image" />
            </div>

            <div className={styles.amountContainer}>
                <button className={styles.increaseBtn} onClick={decreaseAmount}>-</button>

                <div>{amount}</div>

                <button className={styles.decreaseBtn} onClick={increaseAmount}>+</button>
            </div>

            <div className={styles.addContainer}>
                <button className={styles.addBtn} onClick={addToBasket}>Add To Basket</button>
            </div>

        </div>
    )
}

export default DisplayItem