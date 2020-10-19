import React, { useState } from 'react';
import styles from './MealOption.module.css';
import Ingredient from '../Ingredient';
import DietModal from '../DietModal';
import IngredientForm from '../CreateDiet/IngredientForm';
import { deleteDietCourseMeal } from '../../Database/deleteDietInfo';
import { sendNewIngredient } from '../CreateDiet/addDietFunctions';
import { editCourseMealName, editMealInfo } from './mealOptionEditFunctions';

const MealOption = props => {

    const { mealList, courseMeal, display, mealKey, courseKey, courseIndex, userUid, dietId,
        hasPerms, updateCourseMeal, setDataShown } = props;
    const { comments, ingredients, name, properties, recipe, hasImage } = courseMeal;
    const [ingredientList, setIngredientList] = useState(ingredients);
    const [modalShown, setModalShown] = useState(false);

    const selectMealInfo = (event, infoType) => {

        const mealElement = document.querySelectorAll(`[course-meal-list=meal${mealKey}] .${styles['options-box']}`);
        const selectedElement = mealElement[courseIndex].querySelector(`[coursemeal-info=${infoType}]`);

        const selectedElementIndex = Array.from(mealElement[courseIndex].querySelectorAll(`[coursemeal-info]`)).findIndex(
            element => element.attributes[0].value === infoType
        );

        mealElement[courseIndex].querySelectorAll(`[coursemeal-info]`).forEach((element, index) => {
            switch (index) {
                case selectedElementIndex:
                    selectedElement.classList.contains(styles['shown-info'])
                        ? element.classList.remove(styles['shown-info'])
                        : element.classList.add(styles['shown-info']);
                    break;
                default:
                    element.classList.remove(styles['shown-info']);
            }
        });

        if (event.target.classList.contains(styles['coursemeal-tab-selected'])) {
            event.target.classList.remove(styles['coursemeal-tab-selected']);
        }
        else {
            mealElement[courseIndex].querySelectorAll(`.${styles['coursemeal-tab']}`).forEach(element => {
                element.classList.remove(styles['coursemeal-tab-selected']);
            });
            event.target.classList.add(styles['coursemeal-tab-selected']);
        }

    }

    const updateIngredients = newIngredientList => setIngredientList(newIngredientList);

    const showForm = () => setModalShown(true);

    const removeCourseMeal = async () => {
        const courseMealImage = document.getElementById(`image-${mealKey}-${courseKey}`).parentElement;
        if (window.confirm('¿Quieres borrar este plato?')) {
            await deleteDietCourseMeal(userUid, dietId, mealKey, courseKey, hasImage);
            delete mealList[mealKey].courseMeals[courseKey];
            updateCourseMeal(mealList);
            courseMealImage.click();
        }
    }

    const includeText = (property, text) => {
        if (document.querySelector(`[course-meal-list=meal${mealKey}] [course-meal=course${courseKey}] [coursemeal-info=${property}] p`))
            document.querySelector(`[course-meal-list=meal${mealKey}] [course-meal=course${courseKey}] [coursemeal-info=${property}] p`).innerHTML = text.replace(/\n/g, '<br>');
    }

    const getImageShown = () => {
        const image = document.getElementById(`image-${mealKey}-${courseKey}`).parentElement.style.backgroundImage;
        const imageUrl = image !== '' ? image.replace('url("', "").replace(")", "") : undefined;

        if (imageUrl)
            setDataShown({image : imageUrl, name, shown : true});
    }

    return (
        <div course-meal={`course${courseKey}`}>
            <DietModal shown={modalShown} closeFn={setModalShown} sendModal={() => sendNewIngredient(userUid, dietId, mealKey, courseKey, ingredientList, setIngredientList)}>
                <IngredientForm canRemove={false} initNumber={1}></IngredientForm>
            </DietModal>
            <div className={
                !display ? styles.courseMealName : courseIndex === 0 ? styles.courseMealName + " " + styles['courseMealName-displayed']
                    : styles.courseMealName + " " + styles['courseMealName-displayed'] + " " + styles['courseMealName-displayed-top']
            }><div><span className={styles['coursemeal-image-button']} onClick={() => getImageShown()}>{name}</span>

                    {!hasPerms ? undefined : <div className={styles['meal-name-buttons-div']}>
                        <i onClick={event => editCourseMealName(event, userUid, dietId, mealKey, courseKey)} className={`fa fa-pencil ${styles['coursemeal-name-edit']}`} aria-hidden="true"></i>
                        <i onClick={removeCourseMeal} className={`fa fa-trash ${styles.removeCourse}`} aria-hidden="true"></i>
                    </div>}
                </div>
            </div>
            <div className={
                !display ? styles['options-box'] : styles['options-box'] + " " + styles.displayed
            }>

                <div className={styles['meal-box']}>

                    <div className={styles['coursemeal-tab-list']}>
                        {!properties && !hasPerms ? undefined : <div className={styles['coursemeal-tab']} onClick={event => selectMealInfo(event, 'properties')}>Propiedades</div>}
                        {!ingredients && !hasPerms ? undefined : <div className={styles['coursemeal-tab']} onClick={event => selectMealInfo(event, 'ingredients')}>Ingredientes</div>}
                        {!recipe && !hasPerms ? undefined : <div className={styles['coursemeal-tab']} onClick={event => selectMealInfo(event, 'recipe')}>Preparación</div>}
                        {!comments && !hasPerms ? undefined : <div className={styles['coursemeal-tab']} onClick={event => selectMealInfo(event, 'comments')}>Comentarios</div>}
                    </div>

                    <div className={styles['meal-info']}>


                        <div coursemeal-info="properties" className={styles.courseMealInfo}>
                            {hasPerms ? <div className={styles['edit-box']}>
                                <i onClick={event => editMealInfo(event, userUid, dietId, mealKey, courseKey)} className={`fa fa-pencil`} aria-hidden="true"></i>
                            </div>
                                : undefined}
                            <p> {properties ? includeText('properties', properties) : undefined} </p>
                        </div>


                        <div coursemeal-info="ingredients" className={styles['ingredient-list']}>

                            {!hasPerms ? undefined : <div onClick={showForm} className={styles['add-ingredient']}>Añadir ingrediente</div>}

                            {ingredientList ?
                                Object.values(ingredientList).map(({ name, quantity, brand, location, info }, index) => {
                                    const ingredientKey = Object.keys(ingredientList)[index];
                                    return (
                                        <React.Fragment key={index}>
                                            <Ingredient
                                                updateIngredients={updateIngredients}
                                                ingredientList={ingredientList}
                                                userId={userUid}
                                                dietId={dietId}
                                                mealKey={mealKey}
                                                courseKey={courseKey}
                                                ingredientKey={ingredientKey}
                                                ingredientName={name}
                                                quantity={quantity}
                                                brand={brand}
                                                location={location}
                                                info={info}
                                                hasPerms={hasPerms}
                                            />
                                        </React.Fragment>
                                    )
                                })
                                : undefined}

                        </div>


                        <div coursemeal-info="recipe" className={styles.courseMealInfo}>
                            {hasPerms ? <div className={styles['edit-box']}>
                                <i onClick={event => editMealInfo(event, userUid, dietId, mealKey, courseKey)} className={`fa fa-pencil`} aria-hidden="true"></i>
                            </div>
                                : undefined}
                            <p> {recipe ? includeText('recipe', recipe) : undefined} </p>
                        </div>

                        <div coursemeal-info="comments" className={styles.courseMealInfo}>
                            {hasPerms ? <div className={styles['edit-box']}>
                                <i onClick={event => editMealInfo(event, userUid, dietId, mealKey, courseKey)} className={`fa fa-pencil`} aria-hidden="true"></i>
                            </div>
                                : undefined}
                            <p> {comments ? includeText('comments', comments) : undefined} </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MealOption;