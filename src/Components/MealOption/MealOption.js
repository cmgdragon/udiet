import React from 'react';
import styles from './MealOption.module.css';
import Ingredient from '../Ingredient';

const MealOption = props => {
  
    const { courseMeals, display, mealIndex, courseIndex } = props;
    const {comments, ingredients, name, properties, recipe} = courseMeals;

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

    return (
    <>
        <div className={
                !display ? styles.courseMealName : courseIndex === 0 ? styles.courseMealName + " " + styles['courseMealName-displayed']
                : styles.courseMealName + " " + styles['courseMealName-displayed'] + " " + styles['courseMealName-displayed-top']
            }>{name}</div>
        <div  className={
        !display ? styles['options-box'] : styles['options-box'] + " " + styles.displayed
        }>

            <div className={styles['meal-box']}>

                <div className={styles['coursemeal-tab-list']}>
                    { properties ? <div className={styles['coursemeal-tab']} onClick={(event) => selectMealInfo(event, 'properties')}>Propiedades</div>  : undefined}
                        <div className={styles['coursemeal-tab']} onClick={(event) => selectMealInfo(event, 'ingredients')}>Ingredientes</div>
                    { recipe ? <div className={styles['coursemeal-tab']} onClick={(event) => selectMealInfo(event, 'recipe')}>Preparación</div> : undefined}
                    { comments ? <div className={styles['coursemeal-tab']} onClick={(event) => selectMealInfo(event, 'comments')}>Comentarios</div> : undefined}
                </div>

                <div className={styles['meal-info']}>

                    <div coursemeal-info="properties" className={styles.courseMealInfo}>{properties}</div>
                        
                    <div coursemeal-info="ingredients" className={styles['ingredient-list']}>
                        
                    {
                        Object.values(ingredients).map(({name, quantity, brand, location, info}, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <Ingredient
                                        ingredientName={name}
                                        quantity={quantity}
                                        brand={brand}
                                        location={location}
                                        info={info}
                                    />
                                </React.Fragment>
                            )
                        })
                    }

                    </div>
                        
                    <div coursemeal-info="recipe" className={styles.courseMealInfo}>{recipe}</div>
                    <div coursemeal-info="comments" className={styles.courseMealInfo}>{comments}</div>

                </div>
            </div>
        </div>
    </>
    )
}

export default MealOption;