import styles from "./ShopPage.module.css"

import DisplayItem from "./DisplayItem"

const ShopPage = ({updateReciever}) => {
    
    return (

        <div className={styles.shopContent}>

            <DisplayItem updateFromHere={updateReciever}/>
            <DisplayItem updateFromHere={updateReciever}/>
            <DisplayItem updateFromHere={updateReciever}/>
            <DisplayItem updateFromHere={updateReciever}/>
            <DisplayItem updateFromHere={updateReciever}/>
            <DisplayItem updateFromHere={updateReciever}/>


        </div>
            
        

    )
}

export default ShopPage