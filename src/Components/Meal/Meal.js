import React, { useState } from 'react';
import styles from './Meal.module.css';
import MealOption from '../MealOption';

const Meal = props => {

    const { dietObject } = props;
    const { mealData, dietName, isPrivate } = dietObject;
    const [mealDisplayed, setMealDisplayed] = useState({meal: undefined, meals: {}});

    const optionClick = (mealIndex, courseIndex) => {
        setMealDisplayed(
            {
                meal: mealData[mealIndex].courseMeals[courseIndex],
                meals:
                 {
                    ...mealDisplayed.meals,
                    [mealIndex]: mealDisplayed.meals[mealIndex] === courseIndex ? undefined : courseIndex      
                     
                 }
            }
        );
    }

    const renderCourse = (mealIndex, courseIndex) => {
        return (
            mealDisplayed.meals[mealIndex] !== undefined
            && mealDisplayed.meals[mealIndex] === courseIndex
        )
    }

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
                                                <div key={courseIndex} onClick={() => optionClick(mealIndex, courseIndex)} className={styles['meal-option']}></div>
                                            )
                                        })

                                    }

                                </div>
                                
                                {

                                    Object.values(meal.courseMeals).map((course, courseIndex) => {
                                        return (
                                            <React.Fragment key={courseIndex}>
                                                <MealOption
                                                    courseMeals={course}
                                                    display={renderCourse(mealIndex, courseIndex)}
                                                />
                                            </React.Fragment>
                                        )
                                    })

                                }

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