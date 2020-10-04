import React, { useState, useEffect, useContext } from 'react';
import styles from './CreateDiet.module.css';
import MealForm from './mealForm';
import { addNewUserDiet } from '../../Database/writeDietInfo';
import { UserContext } from '../../Context/userContext';

const CreateDiet = () => {
    
    const [mealNumber, setMealNumber] = useState(0);
    const user = useContext(UserContext);

    useEffect(() => {
        document.getElementById('back-button').classList.add(styles.goback);
    }, []);

    const sendDiet = async e => {
        e.preventDefault()
        
        const dietObject = {
            dietName:  document.getElementById('diet-name').value,
            isPrivate: document.getElementById('isprivate').checked,
            mealData: []
        }

        const meals = document.querySelectorAll('[meal-object]');

        meals.forEach(meal => {

            const courseMeals = [];
            const courseMealList = meal.querySelectorAll('[coursemeal-object]');

            courseMealList.forEach(courseMeal => {

                const courseMealInputList = meal.querySelectorAll('[coursemeal-input]');
                const currentCourseMeal = {};
                                
                courseMealInputList.forEach(courseMealInput => {

                    const key = Array.from(courseMealInput.attributes).find(a => a.name === 'coursemeal-input').value;
                    currentCourseMeal[key] = courseMealInput.value;
    
                });

                currentCourseMeal['hasImage'] = false;

                const ingredientList = courseMeal.querySelectorAll('[ingredient-object]');
                const courseMealIngredients = [];

                ingredientList.forEach(ingredient => {

                    const currentIngredient = {};

                    const ingredientInputList = ingredient.querySelectorAll('[ingredient-input]');

                    ingredientInputList.forEach(ingredientInput => {

                        const key = Array.from(ingredientInput.attributes).find(a => a.name === 'ingredient-input').value;
                        currentIngredient[key] = ingredientInput.value;

                    });

                    courseMealIngredients.push(currentIngredient);

                });

                currentCourseMeal['ingredients'] = courseMealIngredients;
                courseMeals.push(currentCourseMeal);

            });

            dietObject.mealData.push({
                name: meal.querySelector('[meal-name]').value,
                courseMeals
            });

        });

        console.log(dietObject);
        await addNewUserDiet(user.uid, dietObject);
        window.location = window.location.origin;

    }

    const addMeal = () => {

        setMealNumber(
            mealNumber + 1
        );

    }

    const renderMeals = () => {

        let renderMeals = [];

        for (let i = 0; i < mealNumber; i++) {
            renderMeals.push(
                <React.Fragment key={i}>
                    <MealForm />
                </React.Fragment>
            );
        }

        return renderMeals

    }

    return ( 
        <form onSubmit={sendDiet}>

            <div className={styles['diet-name']}>
                <input type="text" id="diet-name" className={styles['diet-name']} placeholder="Nombre de la dieta" required/>
            </div>

            <div className={styles.checkboxes}><input id="isprivate" type="checkbox"/><label onClick={activateCheck}>Hacer privada</label></div>

            <div className={styles['meal-button']}>
                <div onClick={addMeal}>Añadir Comida</div>
            </div>

            <div id="mealBox" className={styles['meal-box']}>

                {
                    renderMeals()
                }

            </div>

            <input className={styles.submit} type="submit" value="Crear dieta" />
        </form> 

    )
}



export default CreateDiet;
export const activateCheck = event => event.target.previousElementSibling.click();