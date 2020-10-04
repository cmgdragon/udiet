import React, { useState } from 'react';
import styles from './CreateDiet.module.css';
import IngredientForm from './ingredientForm';
import { activateCheck } from './CreateDiet';

const CourseMealForm = () => {

    const [ingredientNumber, setIngredientNumber] = useState(0);
    const [properties, setProperties] = useState(false);
    const [recipe, setRecipe] = useState(false);
    const [comments, setComments] = useState(false);  

    const updateProperties = () => setProperties(!properties)
    const updateRecipe = () => setRecipe(!recipe)
    const updateComments = () => setComments(!comments)

    const removeCourseMeal = event => {
        event.target.parentElement.remove();
    }

    const addIngredient = () => {

        setIngredientNumber(
            ingredientNumber + 1
        );

    }

    const renderIngredients = () => {

        let renderIngredients = [];

        for (let i = 0; i < ingredientNumber; i++) {
            renderIngredients.push(
                <React.Fragment key={i}>
                    <IngredientForm />
                </React.Fragment>
            );
        }

        return renderIngredients;

    }

    return(
        <div className={styles['course-meal']} coursemeal-object="" >
            <i onClick={removeCourseMeal} className="fa fa-minus-square" aria-hidden="true" />

            <div className={styles.name}><label>Nombre del plato</label>
                <input coursemeal-input="name" placeholder="Arroz con tomate" type="text" required/>
            </div>

            <div className={styles['ingredient-button']}>
                <div onClick={addIngredient}>Añadir ingrediente</div>
            </div>

            <div className={styles['ingredient-box']}>

                {
                    renderIngredients()
                }

            </div>

            <div className={styles.checkboxes}><input onChange={updateProperties} type="checkbox"/><label onClick={activateCheck}>Añadir propiedades</label></div>
            { properties ? <>
            <div className={styles['coursemeal-input']}>
            <textarea coursemeal-input="properties" placeholder="Vitaminas, beneficions..." type="text"></textarea></div>
            </> : undefined}

            <div className={styles.checkboxes}><input onChange={updateRecipe} type="checkbox"/><label onClick={activateCheck}>Añadir receta</label></div>
            { recipe ? <>
            <div className={styles['coursemeal-input']}>
            <textarea coursemeal-input="recipe" placeholder="¿Cómo se prepara?" type="text"></textarea></div>
            </> : undefined}

            <div className={styles.checkboxes}><input onChange={updateComments} type="checkbox"/><label onClick={activateCheck}>Añadir comentarios</label></div>
            { comments ? <>
            <div className={styles['coursemeal-input']}>
            <textarea coursemeal-input="comments" placeholder="Comentarios adicionales" type="text"></textarea></div>
            </> : undefined}

        </div>   
    )

}

export default CourseMealForm;