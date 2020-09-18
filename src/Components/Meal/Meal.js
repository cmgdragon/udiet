import React, {useState} from 'react';
import styles from './Meal.module.css';
import MealOption from '../MealOption';

const Meal = (props) => {

    const { dietObject } = props;
    const { mealData, dietName, isPrivate } = dietObject;
    const [displayed, setDisplayed] = useState(undefined);

    console.log(Object.values(mealData))

    const optionClick = (e) => {


        setDisplayed(e.target)
    }

    return (
    <>
        <h1 className={styles['diet-name']}>{dietName}</h1>
        <div className={styles['diet-list']}>

            <div className={styles['meal-box']}>
            
                {
                    Object.values(mealData).map((meal, index) => {
                        return (
                            <React.Fragment key={index}>
                                <h2 className={styles['meal-name']}>{meal.name}</h2>

                                    <div className={styles['meal-list']}>

                                    {

                                        Object.values(meal.courseMeals).map(course => {
                                            return (
                                                <div key={index} onClick={optionClick} className={styles['meal-option']}></div>
                                            )
                                        })

                                    }

                                </div>

                                <MealOption 
                                    courseMeals={meal.courseMeals}
                                    displayed={displayed}
                                />

                            </React.Fragment>
                        )
                    })
                }

            </div>
        </div>
    </>
    )
}

export default Meal;