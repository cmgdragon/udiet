import React, { useState, useEffect, useContext } from 'react';
import styles from './CreateDiet.module.css';
import MealForm from './MealForm';
import { addNewUserDiet } from '../../Database/writeDietInfo';
import { getUserDiets } from '../../Database/readDietInfo';
import { UserContext } from '../../Context/userContext';
import { signOut } from '../../Services/authProviders';
import Header from '../Header';

const CreateDiet = () => {

    const [mealNumber, setMealNumber] = useState(1);
    const user = useContext(UserContext);

    useEffect(() => {
        document.getElementById('back-button').classList.add(styles.goback);
    }, []);

    const sendDiet = async event => {
        event.preventDefault()

        const dietObject = {
            dietName: document.getElementById('diet-name').value,
            isPrivate: document.getElementById('isprivate').checked,
            mealData: [],
            mealOrder: []
        }

        const meals = document.querySelectorAll('[meal-object]');

        meals.forEach((meal, index) => {

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

            dietObject.mealOrder.push(index.toString());

        });

        if (window.confirm('¿Crear dieta?')) {
            const userDiets = await getUserDiets(user.uid) || {};

            const userDietList = Object.entries(userDiets);
            const newKey = userDietList.length === 0 ? 0 : Math.max(...Object.keys(userDiets)) + 1;
            const updatedDiets = {...userDiets, [newKey]: dietObject};

            await addNewUserDiet(user.uid, updatedDiets);
            window.location = window.location.origin;
        }

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
                    <MealForm initNumber={0} canRemove={i === 0 ? false : true} />
                </React.Fragment>
            );
        }

        return renderMeals

    }

    return (
        <>
            <Header user={user} signOut={signOut} />
            <form onSubmit={sendDiet}>

                <div className={styles['diet-name']}>
                    <input type="text" id="diet-name" className={styles['diet-name']} placeholder="Nombre de la dieta" required />
                </div>

                <div className={`${styles.checkboxes} ${styles['is-private']}`}>
                    <input id="isprivate" type="checkbox" />
                    <label onClick={activateCheck}>Es privada</label>
                </div>

                <div onClick={addMeal} className={styles['meal-button']}>
                    Añadir Comida
            </div>

                <div id="mealBox" className={styles['meal-box']}>

                    {
                        renderMeals()
                    }

                </div>

                <input className={styles.submit} type="submit" value="Crear dieta" />
            </form>
        </>
    )
}



export default CreateDiet;
export const activateCheck = event => event.target.previousElementSibling.click();