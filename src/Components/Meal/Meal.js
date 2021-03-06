import React, { useState, useEffect, useContext, useRef } from 'react';
import styles from './Meal.module.css';
import MealOption from '../MealOption';
import { UserContext } from '../../Context/userContext';
import { modifyCouseMealImageInfo, uploadNewCourseMealImage, updateMealOrder } from '../../Database/writeDietInfo';
import { deleteCourseMealImage, deleteDietMeal } from '../../Database/deleteDietInfo';
import { getCourseMealImage } from '../../Database/readDietInfo';
import { userHasEditPermissions, getMealOrder } from '../../Database/readDietInfo';
import DietModal, { ImageModal } from '../DietModal';
import CourseMealForm from '../CreateDiet/CourseMealForm';
import MealForm from '../CreateDiet/MealForm';
import Skeleton from 'react-loading-skeleton';
import { sendNewMeal, sendNewCourseMeal } from '../CreateDiet/addDietFunctions';
import { editDietName, editMealName } from './mealEditFunctions';
import { orderMeals, switchDrag } from './mealOrderFunctions';
import Compressor from 'compressorjs';

const Meal = props => {

    const permissionRef = useRef();
    const { dietObject, dietId, userUid, notLoggedIn } = props;
    const { mealData, dietName } = dietObject;
    const [mealList, setMealList] = useState(mealData);
    const [mealDisplayed, setMealDisplayed] = useState({ meal: undefined, meals: {}, mealKey: undefined });
    const [courseMealImages, setcourseMealImages] = useState(undefined);
    const [modalMealShown, setModalMealShown] = useState(false);
    const [modalCourseShown, setModalCourseShown] = useState(false);
    const [modalImageShown, setModalImageShown] = useState({});
    const currentUser = useContext(UserContext);

    useEffect(() => {
        userHasEditPermissions(currentUser.uid, currentUser.email, userUid, dietId).then(res => permissionRef.current = res);
        if (mealList) getCourseMealImageList();
        getMealOrder(userUid, dietId).then(order => orderMeals(order, userUid, dietId, permissionRef.current))
    }, [mealList]);

    const optionClick = (event, mealKey, courseKey, courseIndex) => {

        setMealDisplayed(
            {
                meal: mealList[mealKey].courseMeals[courseKey],
                meals:
                {
                    ...mealDisplayed.meals,
                    [mealKey]: mealDisplayed.meals[mealKey] === courseKey ? undefined : courseKey

                },
                mealKey
            }
        );

        event.target.parentElement.querySelectorAll(`.${styles['meal-option']}`).forEach((element, index) => {
            switch (index) {
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

        for (const [mealKey, { courseMeals }] of Object.entries(mealList)) {

            courseMealImageInfo.push({ mealOptions: [] });

            for (const [courseKey, mealOption] of courseMeals ? Object.entries(courseMeals) : []) {

                courseMealImageInfo[mealIndex].mealOptions.push({
                    courseKey,
                    imageUrl: mealOption.hasImage ? await getCourseMealImage(userUid, dietId, mealKey, courseKey) : undefined
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
            event.target.previousElementSibling.style.backgroundColor = "#89ea89";
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

    const showForm = form => form(true);

    const updateCourseMeal = newMealList => setMealList(newMealList);

    const removeMeal = async mealKey => {
        if (window.confirm('¿Quieres borrar esta comida?')) {
            const mealOrder = Object.values(await getMealOrder(userUid, dietId));
            delete mealOrder[mealOrder.findIndex(o => o === mealKey.toString())];
            await deleteDietMeal(userUid, dietId, mealKey);
            await updateMealOrder(userUid, dietId, mealOrder);
            delete mealList[mealKey];
            setMealList(mealList);
            getCourseMealImageList();
            setMealDisplayed({ meal: undefined, meals: {}, mealKey: undefined })
        }
    }

    return (
        <div ref={permissionRef}>
            <DietModal shown={modalMealShown} sendModal={() => sendNewMeal(userUid, dietId, mealList, setMealList)} closeFn={setModalMealShown}>
                <MealForm canRemove={false} initNumber={1}></MealForm>
            </DietModal>
            <DietModal shown={modalCourseShown} sendModal={() => sendNewCourseMeal(userUid, dietId, mealDisplayed.mealKey, mealList, setMealList)} closeFn={setModalCourseShown}>
                <CourseMealForm canRemove={false} initNumber={1}></CourseMealForm>
            </DietModal>
            <ImageModal dataShown={modalImageShown} closeModal={setModalImageShown}  />

            <h1 className={styles['diet-name']}><span>{dietName}</span>
                {!notLoggedIn && permissionRef.current ?
                    <i onClick={event => editDietName(event, userUid, dietId)} className={`fa fa-pencil ${styles['diet-name-edit']}`} aria-hidden="true"></i>
                    : undefined}
            </h1>

            {!notLoggedIn && permissionRef.current ?
                <div onClick={() => showForm(setModalMealShown)} className={styles['add-meal']}>Añadir comida</div>
                : undefined}

            <div className={styles['diet-list']}>

                <div className={styles['meal-box']}>

                    {mealList ?
                        Object.values(mealList).map((meal, mealIndex) => {
                            const mealKey = Object.keys(mealList)[mealIndex];
                            return (
                                <div meal-order={`o${mealKey}`} key={mealKey}>
                                    <h2 className={styles['meal-name']}><span>{meal.name}</span>
                                        {!notLoggedIn && permissionRef.current ? <>
                                            <i onClick={event => editMealName(event, userUid, dietId, mealKey)} className={`fa fa-pencil ${styles['meal-name-edit']}`} aria-hidden="true"></i>
                                            <i onClick={() => removeMeal(mealKey)} className={`fa fa-trash ${styles.removeMeal}`} aria-hidden="true"></i>
                                            <i onClick={switchDrag} drag-id={`drag${mealKey}`} className={`fa fa-arrows ${styles['drag-switch']}`} aria-hidden="true"></i>
                                        </>
                                        : undefined}
                                    </h2>

                                    <div className={permissionRef.current ? styles['meal-list-padding'] : styles['meal-list']}>

                                        {!notLoggedIn && permissionRef.current ? <div onClick={() => {
                                            mealDisplayed.mealKey = mealKey;
                                            setMealDisplayed(mealDisplayed);
                                            showForm(setModalCourseShown);
                                        }} className={styles['add-coursemeal']}>Añadir plato</div> : undefined}

                                        {meal.courseMeals ?

                                            Object.values(meal.courseMeals).map((course, courseIndex) => {
                                                const courseKey = Object.keys(meal.courseMeals)[courseIndex];
                                                return (

                                                    !courseMealImages ? <Skeleton key={courseKey} height={100} width={100} duration={.3} circle={true} /> :

                                                        <div key={courseKey}
                                                            onClick={(event) => optionClick(event, mealKey, courseKey, courseIndex)}
                                                            className={styles['meal-option']}

                                                            style={courseMealImages[mealIndex]?.mealOptions[courseIndex]?.imageUrl ?
                                                                { backgroundImage: `url(${courseMealImages[mealIndex]?.mealOptions[courseIndex]?.imageUrl})` }
                                                                : {}}


                                                        >
                                                            {!notLoggedIn && permissionRef.current ?

                                                                <i
                                                                    onClick={(event) => selectCourseMealImage(event, mealKey, courseKey)}
                                                                    className="fa fa-camera"
                                                                    aria-hidden="true"></i>

                                                                : undefined}

                                                            <input id={`image-${mealKey}-${courseKey}`}
                                                                onClick={(event) => event.stopPropagation()}
                                                                type="file" />

                                                            {!notLoggedIn && permissionRef.current ?

                                                                <i
                                                                    onClick={(event) => removeCourseImage(event, mealKey, courseKey)}
                                                                    className={`fa fa-times ${styles['input-clean-image']} ${!courseMealImages[mealIndex]?.mealOptions[courseIndex]?.imageUrl ? styles.hide : ''
                                                                        }`
                                                                    }

                                                                    aria-hidden="true"></i>

                                                                : undefined}

                                                        </div>
                                                )
                                            })

                                            : undefined}

                                    </div>

                                    <div course-meal-list={`meal${mealKey}`}>

                                        {meal.courseMeals ?

                                            Object.values(meal.courseMeals).map((courseMeal, courseIndex) => {
                                                const courseKey = Object.keys(meal.courseMeals)[courseIndex];

                                                return (
                                                    <React.Fragment key={courseKey}>
                                                        <MealOption
                                                            updateCourseMeal={updateCourseMeal}
                                                            mealList={mealList}
                                                            mealKey={mealKey}
                                                            courseMeal={courseMeal}
                                                            setDataShown={setModalImageShown}
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

                                            : undefined}
                                    </div>
                                </div>
                            )
                        })
                        : undefined}


                </div>
            </div>
        </div>
    )
}

export default Meal;