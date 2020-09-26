import React, { useState } from 'react';
import styles from './Meal.module.css';
import MealOption from '../MealOption';
import * as firebase from 'firebase/app';
import 'firebase/storage';

const Meal = props => {
console.log(props)
    const { dietObject, dietId, userUid } = props;
    const { mealData, dietName } = dietObject;
    const [mealDisplayed, setMealDisplayed] = useState({meal: undefined, meals: {}});
    const [courseMealImage, setcourseMealImage] = useState(undefined);

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

    const getCourseMealImage = async imageRefs => {

        const imageRef = firebase.storage().ref().child(`coursemeals/${userUid}-${dietId}-${imageRefs}`)

        try {
            const url = await imageRef.getDownloadURL();
            setcourseMealImage(url);
            console.log(url)
            return url;
        } catch (error) {
            console.error(error)
        }

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

                                           if (course.hasImage) getCourseMealImage(`${mealIndex}-${courseIndex}`)
                                           
                                            return (
                                                <div key={courseIndex} 
                                                onClick={() => optionClick(mealIndex, courseIndex)} 
                                                className={styles['meal-option']}
                                                style={course.hasImage ? {backgroundImage: `url(${courseMealImage})`} : {}}
                                                >
                                                </div>
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