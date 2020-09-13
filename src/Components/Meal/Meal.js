import React from 'react';
import styles from './Meal.module.css';
console.log(styles)
const Meal = (props) => {

    const optionHover = (e) => {
        console.log(e)

    }

    return (
        <div className={styles['meal-box']}>
        
            <h2 className={styles['meal-name']}>Merienda</h2>

            <div className={styles['meal-list']}>
                <div onMouseOver={optionHover} className={styles['meal-option']}></div>
                <div className={styles['meal-option']}></div>
            </div>


        </div>
    )
}

export default Meal;