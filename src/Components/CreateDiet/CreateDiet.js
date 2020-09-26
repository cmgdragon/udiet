import React, { useState, useContext } from 'react';
import styles from './CreateDiet.module.css';
import MealForm from './mealForm';
import { addNewUserDiet } from '../../Database/writeDietInfo';
import { UserContext } from '../../Context/userContext';
import * as firebase from 'firebase/app';
import 'firebase/storage';

const CreateDiet = () => {
    
    const [mealNumber, setMealNumber] = useState(3);
    const user = useContext(UserContext);

    const sendDiet = async e => {
        e.preventDefault()

        const courseMealImg = document.getElementById('imag').files[0];
        const imgType = courseMealImg.type.substring(
            courseMealImg.type.indexOf('/')+1,
            courseMealImg.type.length
        );

        try {
            await firebase.storage().ref().child(`coursemeals/${user.uid}-0-0-0`).put(
                courseMealImg
            )        
        } catch (error) {
            console.error(error)
        }
        
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
        //addNewUserDiet(user.uid, dietObject);

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

        <input id="imag" type="file" />

            <div className={styles['diet-name']}>
                <label htmlFor="diet-name">Nombre de la dieta:</label>
                <input type="text" id="diet-name" name="diet-name" />
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

            <input type="submit" value="Submit" />
        </form> 

    )
}



export default CreateDiet;
export const activateCheck = event => event.target.previousElementSibling.click();