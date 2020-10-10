import React, { useState } from 'react';
import styles from './MealOption.module.css';
import Ingredient from '../Ingredient';
import DietModal from '../DietModal';
import IngredientForm from '../CreateDiet/IngredientForm';
import { modifyCourseMealInfo, uploadNewCourseMealIngredient } from '../../Database/writeDietInfo';

const MealOption = props => {
  
    const { courseMeals, display, mealIndex, courseIndex, userUid, dietId, hasPerms } = props;
    const {comments, ingredients, name, properties, recipe} = courseMeals;
    const [modalShown, setModalShown] = useState(false);

    const selectMealInfo = (event, infoType) => {

        const mealElement = document.querySelectorAll(`[course-meal-list=meal${mealIndex}] > .${styles['options-box']}`);
        const selectedElement = mealElement[courseIndex].querySelector(`[coursemeal-info=${infoType}]`);

        const selectedElementIndex = Array.from(mealElement[courseIndex].querySelectorAll(`[coursemeal-info]`)).findIndex(
            element => element.attributes[0].value === infoType
        );

        mealElement[courseIndex].querySelectorAll(`[coursemeal-info]`).forEach((element, index) => {
           switch(index) {
                case selectedElementIndex:
                    selectedElement.classList.contains(styles['shown-info'])
                     ? element.classList.remove(styles['shown-info'])
                     : element.classList.add(styles['shown-info']);
                    break;
                default:
                    element.classList.remove(styles['shown-info']);    
            }
        });

        if (event.target.classList.contains(styles['coursemeal-tab-selected'])){
            event.target.classList.remove(styles['coursemeal-tab-selected']);
        }
        else {
            mealElement[courseIndex].querySelectorAll(`.${styles['coursemeal-tab']}`).forEach(element => {
                element.classList.remove(styles['coursemeal-tab-selected']);
            });
            event.target.classList.add(styles['coursemeal-tab-selected']);
        }

    }

    const cancelEditOperation = (contentEl, newTextarea, editBox, checkButton, cancelButton, content) => {
        newTextarea.remove();
        contentEl.classList.remove(styles.hiddenEl);
        editBox.classList.remove(styles.visibleEl);
        editBox.style.bottom = "";
        editBox.style.left = "92%";
        contentEl.lastChild.textContent = content;
        checkButton.remove();
        cancelButton.remove();
        editBox.querySelector('i').classList.remove(styles.undisplay);
    }

    const editMealInfo = event => {
        const newTextarea = document.createElement('textarea');
        const contentEl = event.target.parentElement.parentElement;
        const editBox = event.target.parentElement;
        const oldText = contentEl.lastChild.textContent;
        newTextarea.value = oldText;
        contentEl.lastChild.textContent = "";

        contentEl.appendChild(newTextarea);
        newTextarea.select();
        contentEl.classList.add(styles.hiddenEl);
        editBox.classList.add(styles.visibleEl);

        newTextarea.classList.add(styles.visibleEl);
        editBox.style.bottom = "4rem";
        editBox.style.left = "85%";

        const checkButton = document.createElement('i');
        const cancelButton = document.createElement('i');
        checkButton.classList = [`fa fa-check ${styles.green}`]
        checkButton.addEventListener('click', event => sendNewMealInfo(event,
            contentEl, newTextarea, editBox, checkButton, cancelButton, newTextarea.value));

        cancelButton.classList = [`fa fa-ban ${styles.red}`]
        cancelButton.addEventListener('click', () => cancelEditOperation(contentEl,
            newTextarea, editBox, checkButton, cancelButton, oldText));

        event.target.classList.add(styles.undisplay);
        editBox.prepend(checkButton);
        editBox.appendChild(cancelButton);
    }

    const sendNewMealInfo = async (event, contentEl, newTextarea, editBox, checkButton, cancelButton, content) => {
        const property = Array.from(event.target.parentElement.parentElement.attributes)
            .find(a => a.name === "coursemeal-info").value;
        const newContent = event.target.parentElement.nextElementSibling.value;
        await modifyCourseMealInfo(userUid, dietId, mealIndex, courseIndex, property, newContent);
        cancelEditOperation(contentEl, newTextarea, editBox, checkButton, cancelButton, content);
    }

    const showForm = () => setModalShown(true);

    const closeForm = () => {
        if (window.confirm('¿Quieres cancelar esta acción?')) {
            setModalShown(false);
        }
    }

    const getNewIngredientObject = () => {

        const ingredient = document.querySelector('[diet-modal]')
                                .querySelector('[ingredient-object]');

        const currentIngredient = {};
        const ingredientInputList = ingredient.querySelectorAll('[ingredient-input]');

        ingredientInputList.forEach(ingredientInput => {
            const key = Array.from(ingredientInput.attributes).find(a => a.name === 'ingredient-input').value;
            currentIngredient[key] = ingredientInput.value;
        });

        return currentIngredient;
    }

    const sendNewIngredient = async event => {
        event.preventDefault();
        await uploadNewCourseMealIngredient(userUid, dietId, mealIndex, courseIndex, getNewIngredientObject());
        window.location.reload();
        
    }

    return (
    <>
        <DietModal shown={modalShown} closeModal={closeForm} sendModal={event => sendNewIngredient(event)}>
            <IngredientForm initNumber={1}></IngredientForm>
        </DietModal>
        <div className={
                !display ? styles.courseMealName : courseIndex === 0 ? styles.courseMealName + " " + styles['courseMealName-displayed']
                : styles.courseMealName + " " + styles['courseMealName-displayed'] + " " + styles['courseMealName-displayed-top']
            }>{name}</div>
        <div  className={
        !display ? styles['options-box'] : styles['options-box'] + " " + styles.displayed
        }>

            <div className={styles['meal-box']}>

                <div className={styles['coursemeal-tab-list']}>
                    { !properties && !hasPerms ? undefined : <div className={styles['coursemeal-tab']} onClick={(event) => selectMealInfo(event, 'properties')}>Propiedades</div> }
                    { !ingredients && !hasPerms ? undefined : <div className={styles['coursemeal-tab']} onClick={(event) => selectMealInfo(event, 'ingredients')}>Ingredientes</div> }
                    { !recipe && !hasPerms ? undefined : <div className={styles['coursemeal-tab']} onClick={(event) => selectMealInfo(event, 'recipe')}>Preparación</div> }
                    { !comments && !hasPerms ? undefined : <div className={styles['coursemeal-tab']} onClick={(event) => selectMealInfo(event, 'comments')}>Comentarios</div> }
                </div>

                <div className={styles['meal-info']}>

              
                    <div coursemeal-info="properties" className={styles.courseMealInfo}>
                    { hasPerms ? <div className={styles['edit-box']}>
                            <i onClick={editMealInfo} className={`fa fa-pencil`} aria-hidden="true"></i>
                        </div>
                    : undefined}
                     { properties ? properties : undefined}
                    </div>
            

                    <div coursemeal-info="ingredients" className={styles['ingredient-list']}>
                        
                    { !comments && !hasPerms ? undefined : <div onClick={showForm} className={styles['add-ingredient']}>Añadir</div> }

                    { ingredients ?
                        Object.values(ingredients).map(({name, quantity, brand, location, info}, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <Ingredient
                                        userId={userUid}
                                        dietId={dietId}
                                        mealIndex={mealIndex}
                                        courseIndex={courseIndex}
                                        ingredientIndex={index}
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
                { hasPerms ? <div className={styles['edit-box']}>
                            <i onClick={editMealInfo} className={`fa fa-pencil`} aria-hidden="true"></i>
                        </div>
                    : undefined}
                { recipe ? recipe : undefined}
                </div>
                
                <div coursemeal-info="comments" className={styles.courseMealInfo}>
                { hasPerms ? <div className={styles['edit-box']}>
                            <i onClick={editMealInfo} className={`fa fa-pencil`} aria-hidden="true"></i>
                        </div>
                    : undefined}
                { comments ? comments : undefined}
                </div>
                 
                </div>
            </div>
        </div>
    </>
    )
}

export default MealOption;