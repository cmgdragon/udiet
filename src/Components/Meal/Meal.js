import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Meal.module.css';
import MealOption from '../MealOption';
import { modifyCouseMealImageInfo, uploadNewCourseMealImage, deleteCourseMealImage } from '../../Database/writeDietInfo';
import { getCourseMealImage } from '../../Database/readDietInfo';
import Compressor from 'compressorjs';

const Meal = props => {

    const { dietObject, dietId, userUid, notLoggedIn } = props;
    const { mealData, dietName } = dietObject;
    const [mealDisplayed, setMealDisplayed] = useState({meal: undefined, meals: {}});
    const [courseMealImages, setcourseMealImages] = useState(undefined);

    useEffect(() => {
        document.getElementById('back-button').classList.add(styles.goback);
        getCourseMealImageList();
    }, []);

    const optionClick = (event, mealIndex, courseIndex) => {

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

        event.target.parentElement.querySelectorAll(`.${styles['meal-option']}`).forEach((element, index) => {
            switch(index) {
                case courseIndex:
                    event.target.classList.contains(styles['selected-option'])
                     ? element.classList.remove(styles['selected-option'])
                     : element.classList.add(styles['selected-option']);
                    break;
                default:
                    element.classList.remove(styles['selected-option']);    
            }          
        });

    }

    const renderCourse = (mealIndex, courseIndex) => {
        return (
            mealDisplayed.meals[mealIndex] !== undefined
            && mealDisplayed.meals[mealIndex] === courseIndex
        )
    }

    const getCourseMealImageList = async() => {

        const courseMeals = Object.values(mealData).map(courseMeal => courseMeal);
        const courseMealImageInfo = [];

        courseMeals.forEach(async(courseMeal, courseIndex) => {

            const courseMealList = courseMeal.courseMeals;
            courseMealImageInfo.push({mealOptions: []});

            Object.values(courseMealList).forEach(async(mealOption, optionIndex) => {

                courseMealImageInfo[courseIndex].mealOptions.push({
                    optionIndex,
                    imageUrl: mealOption.hasImage ? getCourseMealImage(userUid, dietId, courseIndex, optionIndex) : {}
                })

            });

        });

        setcourseMealImages(courseMealImageInfo);

    }

    const uploadCourseMealImage = async (mealIndex, courseMealIndex) => {

        const imageInput = document.getElementById(`image-${mealIndex}-${courseMealIndex}`);
        const courseMealImg = imageInput.files[0];
        const imageIcon = imageInput.previousElementSibling;

        imageIcon.classList = ["fas fa-spinner fa-pulse"];

        new Compressor(courseMealImg, {
            quality: 0.5,
            async success(result) {

                await uploadNewCourseMealImage(userUid, dietId, mealIndex, courseMealIndex, result);

                modifyCouseMealImageInfo(userUid, dietId, mealIndex, courseMealIndex, true);
                imageIcon.classList = ["fa fa fa-camera"];
                imageIcon.style.backgroundColor = "#16b8f3";
                const newUrl = await getCourseMealImage(userUid, dietId, mealIndex, courseMealIndex);
                changeBackgroundImage(mealIndex, courseMealIndex, newUrl);
        
                imageInput.value = "";
                imageInput.nextElementSibling.classList = [`fa fa-times ${styles['input-clean-image']}`];

            },
            error(error) {
              console.log("Error compressing the image: " + error);
            },
        });

    }

    const cleanCourseMealImage = (mealIndex, courseMealIndex) => {
        const input = document.getElementById(`image-${mealIndex}-${courseMealIndex}`);
        input.value = "";
        input.previousElementSibling.classList = ["fa fa fa-camera"];
        input.previousElementSibling.style.backgroundColor = "#16b8f3";
        input.removeEventListener("change", changeUploadImageIcon);
        if (!!input.nextElementSibling)
            input.nextElementSibling.classList = [`fa fa-times ${styles['input-clean-image']}`];
    } 

    const removeCourseImage = async (event, mealIndex, courseMealIndex) => {
        event.stopPropagation()
        const deleteIcon = event.target;
        if (window.confirm('¿Quieres borrar esta imagen?')) {
            event.target.classList = [`fas fa-spinner fa-pulse ${styles['input-clean-image']}`];
            modifyCouseMealImageInfo(userUid, dietId, mealIndex, courseMealIndex, false);
            await deleteCourseMealImage(userUid, dietId, mealIndex, courseMealIndex);
            deleteIcon.parentElement.style = "";
            deleteIcon.classList = [styles.hide];
        } 
    }

    const changeBackgroundImage = (mealIndex, courseMealIndex, imageUrl) => {
        const input = document.getElementById(`image-${mealIndex}-${courseMealIndex}`);
        input.parentElement.style.backgroundImage = `url(${imageUrl})`;
        input.nextElementSibling.classList = [`fa fa-times ${styles['input-clean-image']}`];

    }

    const changeUploadImageIcon = event => {

        if (event.target.files[0] !== undefined) {
            event.target.previousElementSibling.classList = ["fa fa-upload"];
            event.target.previousElementSibling.style.backgroundColor = "green";
            if (!!event.target.nextElementSibling)
                 event.target.nextElementSibling.classList = [styles.hide];
        }

    }

    const selectCourseMealImage = (event, mealIndex, courseMealIndex) => {
        event.stopPropagation();
        const input = document.getElementById(`image-${mealIndex}-${courseMealIndex}`);

        if (input.files[0] !== undefined) {
            if (window.confirm('¿Quieres subir esta foto?')) {
                uploadCourseMealImage(mealIndex, courseMealIndex);
            } else {
                document.getElementById(`image-${mealIndex}-${courseMealIndex}`).value = "";
                cleanCourseMealImage(mealIndex, courseMealIndex);
            }
        } else {
            const input = document.getElementById(`image-${mealIndex}-${courseMealIndex}`);
            input.click();
            input.addEventListener("change", changeUploadImageIcon);
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

                                                if (courseMealImages) {
                                                    const image = courseMealImages ? courseMealImages[mealIndex].mealOptions[courseIndex].imageUrl : undefined;
                                                    if (image.toString().includes("Promise")) image.then(url => {
                                                        changeBackgroundImage(mealIndex, courseIndex, url);
                                                    })
                                                    
                                                } 

                                            return (
                                                <div key={courseIndex} 
                                                onClick={(event) => optionClick(event, mealIndex, courseIndex)} 
                                                className={styles['meal-option']}>

                                                    { !notLoggedIn ? 
                                                        
                                                        <>
                                                    
                                                        <i
                                                        onClick={(event) => selectCourseMealImage(event, mealIndex, courseIndex)}
                                                        className="fa fa-camera"
                                                        aria-hidden="true"></i>

                                                        <input id={`image-${mealIndex}-${courseIndex}`}
                                                        onClick={(event) => event.stopPropagation()}
                                                        type="file" />    

                                                        <i
                                                        onClick={(event) => removeCourseImage(event, mealIndex, courseIndex)}
                                                        className={styles.hide}
                                                        aria-hidden="true"></i>

                                                        </>

                                                    : undefined}

                                                </div>
                                            )
                                        })

                                    }

                                </div>
                                
                                <div course-meal-list={`meal${mealIndex}`}>
                                    {

                                        Object.values(meal.courseMeals).map((course, courseIndex) => {
                                            return (
                                                <React.Fragment key={courseIndex}>
                                                    <MealOption
                                                        courseMeals={course}
                                                        mealIndex={mealIndex}
                                                        courseIndex={courseIndex}
                                                        display={renderCourse(mealIndex, courseIndex)}
                                                    />
                                                </React.Fragment>
                                            )
                                        })

                                    }
                                </div>
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