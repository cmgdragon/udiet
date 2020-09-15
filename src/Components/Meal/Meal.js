import React, {useState} from 'react';
import styles from './Meal.module.css';
import MealOption from '../MealOption';

const Meal = (props) => {

    //const {mealData} = props;
    //const [displayed, setDisplayed] = useState(false);

    let currentlyDisplayed;

    const optionClick = (e) => {


        //currentlyDisplayed = e.target;
    }

    return (
        <div className={styles['meal-box']}>
        
            <h2 className={styles['meal-name']}>{/*mealData[0].name*/}</h2>

            <div className={styles['meal-list']}>

                {}

                <div onClick={optionClick} className={styles['meal-option']}></div>
                <div className={styles['meal-option']}></div>
            </div>

            {/*<MealOption 
                mealData={mealData.courseMeals}
                displayed={displayed}
            />*/}


        </div>
    )
}

export default Meal;