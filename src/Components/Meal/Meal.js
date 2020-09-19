import React, {useState, useRef} from 'react';
import styles from './Meal.module.css';
import MealOption from '../MealOption';

const Meal = props => {

    const { dietObject } = props;
    const { mealData, dietName, isPrivate } = dietObject;
    const [mealDisplayed, setMealDisplayed] = useState(undefined);
    const mealOption = useRef();


    console.log(Object.values(mealData))

    const optionClick = (courseIndex, event) => {
        setMealDisplayed(mealData[Object.keys(courseIndex)])
    }
    console.log(mealData[Object.keys(0)])
    return (
    <>
        <h1 className={styles['diet-name']}>{dietName}</h1>
        <div className={styles['diet-list']}>

            <div className={styles['meal-box']}>
            
                {
                    Object.values(mealData).map((meal, mealIndex) => {
                        return (
                            <React.Fragment key={mealIndex}>
                                <h2 className={styles['meal-name']}>{meal.name}</h2>

                                    <div className={styles['meal-list']}>

                                    {

                                        Object.values(meal.courseMeals).map((course, courseIndex) => {
                                            return (
                                                <div key={courseIndex} onClick={() => optionClick(courseIndex)} className={styles['meal-option']}></div>
                                            )
                                        })

                                    }

                                </div>

                            </React.Fragment>
                        )
                    })
                }

                <MealOption
                    courseMeals={mealDisplayed}
                   /* displayed={displayed}*/
                />

            </div>
        </div>
    </>
    )
}

export default Meal;