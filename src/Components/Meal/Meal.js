import React, { useState, useEffect, useContext, useRef } from 'react';
import styles from './Meal.module.css';
import MealOption from '../MealOption';
import { UserContext } from '../../Context/userContext';
import { modifyCouseMealImageInfo, uploadNewCourseMealImage } from '../../Database/writeDietInfo';
import { deleteCourseMealImage, deleteDietMeal } from '../../Database/deleteDietInfo';
import { getCourseMealImage } from '../../Database/readDietInfo';
import { userHasEditPermissions } from '../../Database/readDietInfo';
import DietModal from '../DietModal';
import CourseMealForm from '../CreateDiet/CourseMealForm';
import MealForm from '../CreateDiet/MealForm';
import Skeleton from 'react-loading-skeleton';
import { sendNewMeal, sendNewCourseMeal } from '../CreateDiet/addDietFunctions';
import Compressor from 'compressorjs';

const Meal = props => {

    const permissionRef = useRef();
    const { dietObject, dietId, userUid, notLoggedIn } = props;
    const { mealData, dietName } = dietObject;
    const [mealDisplayed, setMealDisplayed] = useState({meal: undefined, meals: {}});
    const [courseMealImages, setcourseMealImages] = useState(undefined);
    const [permissionGiven, setPermissionGiven] = useState(false);
    const [modalMealShown, setModalMealShown] = useState(false);
    const [modalCourseShown, setModalCourseShown] = useState(false);
    const userContext = useContext(UserContext);

    useEffect(() => {
        permissionRef.current = false;
        if (!!document.getElementById('back-button'))
            document.getElementById('back-button').classList.add(styles.goback);
        getCourseMealImageList();
        userHasEditPermissions(userContext.uid, userContext.email, userUid, dietId).then(res => {permissionRef.current = res; setPermissionGiven(true)});
    }, []);

    const optionClick = (event, mealKey, courseKey, courseIndex) => {

        setMealDisplayed(
            {
                meal: mealData[mealKey].courseMeals[courseKey],
                meals:
                 {
                    ...mealDisplayed.meals,
                    [mealKey]: mealDisplayed.meals[mealKey] === courseKey ? undefined : courseKey      
                     
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

    const renderCourse = (mealKey, courseKey) => {
        return (
            mealDisplayed.meals[mealKey] !== undefined
            && mealDisplayed.meals[mealKey] === courseKey
        )
    }

    const getCourseMealImageList = async () => {

        const courseMealImageInfo = [];
        let mealIndex = 0;

        for (const [mealKey, { courseMeals }] of Object.entries(mealData)) {

            courseMealImageInfo.push({mealOptions: []});

            for (const [courseKey, mealOption] of Object.entries(courseMeals)) {

                courseMealImageInfo[mealIndex].mealOptions.push({
                    courseKey,
                    imageUrl: mealOption.hasImage ? await getCourseMealImage(userUid, dietId, mealKey, courseKey) : {}
                })            
            }

            ++mealIndex;

        }

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
        if (!!input.nextElementSibling)
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

    const showMealForm = () => setModalMealShown(true);

    const showCourseForm = () => setModalCourseShown(true);

    const closeMealForm = () => {
        if (window.confirm('¿Quieres cancelar esta acción?')) {
            setModalMealShown(false);
        }
    }

    const closeCourseForm = () => {
        if (window.confirm('¿Quieres cancelar esta acción?')) {
            setModalCourseShown(false);
        }
    }

    const removeMeal = async (event, mealIndex) => {
        const mealNameEl = event.target.parentElement;
        const mealListEl = mealNameEl.nextElementSibling;
        const mealCourseListEl = mealListEl.nextElementSibling;
        if (window.confirm('¿Quieres borrar esta comida?')) {
            await deleteDietMeal(userUid, dietId, mealIndex);
            mealCourseListEl.remove();
            mealListEl.remove();
            mealNameEl.remove();
        }
    }

    return (
    <div ref={permissionRef}>
        <DietModal shown={modalMealShown} sendModal={() => sendNewMeal(userUid, dietId)} closeModal={closeMealForm}>
            <MealForm initNumber={1}></MealForm>
        </DietModal>
        <h1 className={styles['diet-name']}>{dietName}</h1>

        {!permissionRef.current ? undefined : <div onClick={showMealForm} className={styles['add-meal']}>Añadir</div> }

        <div className={styles['diet-list']}>

            <div className={styles['meal-box']}>

                {
                    Object.values(mealData).map((meal, mealIndex) => {
                        const mealKey = Object.keys(mealData)[mealIndex];
                        return (
                            <React.Fragment key={mealKey}>
                                { mealKey <= 0 ?
                                <DietModal shown={modalCourseShown} sendModal={() => sendNewCourseMeal(userUid, dietId, mealKey)} closeModal={closeCourseForm}>
                                    <CourseMealForm initNumber={1}></CourseMealForm>
                                </DietModal> : '' }
                                <h2 className={styles['meal-name']}>{meal.name}
                                    {!permissionRef.current ? undefined : <i onClick={event => removeMeal(event, mealKey)} className={`fa fa-trash ${styles.removeMeal}`} aria-hidden="true"></i> }
                                </h2>

                                    <div className={permissionRef.current ? styles['meal-list-padding'] : styles['meal-list']}>

                                    {!permissionRef.current ? undefined : <div onClick={showCourseForm} className={styles['add-coursemeal']}>Añadir</div> }
                                    
                                    {
                    
                                        Object.values(meal.courseMeals).map((course, courseIndex) => {
                                            const courseKey = Object.keys(meal.courseMeals)[courseIndex];
                                            return (

                                                !courseMealImages ? <Skeleton key={courseKey} height={100} width={100} duration={.3} circle={true} />  :
                                                
                                                <div key={courseKey}
                                                onClick={(event) => optionClick(event, mealKey, courseKey, courseIndex)} 
                                                className={styles['meal-option']}
                                                style={{backgroundImage: `url(${courseMealImages[mealIndex]?.mealOptions[courseIndex]?.imageUrl})`}}
                                                >
                                                    { !notLoggedIn && permissionRef.current? 
                                                    
                                                        <i
                                                        onClick={(event) => selectCourseMealImage(event, mealKey, courseKey)}
                                                        className="fa fa-camera"
                                                        aria-hidden="true"></i>
                                                        
                                                     : undefined }

                                                        <input id={`image-${mealKey}-${courseKey}`}
                                                        onClick={(event) => event.stopPropagation()}
                                                        type="file" />

                                                    { !notLoggedIn && permissionRef.current ? 

                                                        <i
                                                        onClick={(event) => removeCourseImage(event, mealKey, courseKey)}
                                                        className={`fa fa-times ${styles['input-clean-image']} ${
                                                                typeof courseMealImages[mealIndex]?.mealOptions[courseIndex]?.imageUrl === 'object' ? styles.hide : ''
                                                            }` 
                                                        }

                                                        aria-hidden="true"></i>    

                                                    : undefined}

                                                </div> 
                                            )
                                        })

                                    }

                                </div>
                                
                                <div course-meal-list={`meal${mealKey}`}>
                                    {
                                        Object.values(meal.courseMeals).map((course, courseIndex) => {
                                            const courseKey = Object.keys(meal.courseMeals)[courseIndex];
                                            return (
                                                <React.Fragment key={courseKey}>
                                                    <MealOption
                                                        courseMeals={course}
                                                        mealKey={mealKey}
                                                        courseKey={courseKey}
                                                        courseIndex={courseIndex}
                                                        hasPerms={permissionRef.current}
                                                        userUid={userUid}
                                                        dietId={dietId}
                                                        display={renderCourse(mealKey, courseKey)}
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
    </div>
    )
}

export default Meal;