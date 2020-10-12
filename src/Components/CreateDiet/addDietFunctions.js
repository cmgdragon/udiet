import { uploadNewCourseMeal, uploadNewMeal, uploadNewCourseMealIngredient } from '../../Database/writeDietInfo';

export const sendNewMeal = (event, userUid, dietId) => {
    event.preventDefault();
    const meal = document.querySelector('[diet-modal]')
                            .querySelector('[meal-object]');

        const courseMeals = [];
        const courseMealList = meal.querySelectorAll('[coursemeal-object]');

        courseMealList.forEach(async courseMeal => {

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

        const newMeal = {
            name: meal.querySelector('[diet-modal] [meal-name]').value,
            courseMeals
        };
        console.log(newMeal);
        await uploadNewMeal(userUid, dietId, newMeal);
        window.location.reload();

    });
}

export const sendNewCourseMeal = async (event, userUid, dietId, mealIndex) => {
    event.preventDefault();
    const meal = document.querySelector('[diet-modal]')
                            .querySelector('[coursemeal-object]');

        const courseMealInputList = meal.querySelectorAll('[coursemeal-input]');
        const currentCourseMeal = {};
                        
        courseMealInputList.forEach(courseMealInput => {

            const key = Array.from(courseMealInput.attributes).find(a => a.name === 'coursemeal-input').value;
            currentCourseMeal[key] = courseMealInput.value;

        });

        currentCourseMeal['hasImage'] = false;

        const ingredientList = meal.querySelectorAll('[ingredient-object]');
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
        await uploadNewCourseMeal(userUid, dietId, mealIndex, currentCourseMeal);
        window.location.reload();
}

export const sendNewIngredient = async (event, userUid, dietId, mealIndex, courseIndex) => {
    event.preventDefault();
    const ingredient = document.querySelector('[diet-modal]')
                            .querySelector('[ingredient-object]');

    const currentIngredient = {};
    const ingredientInputList = ingredient.querySelectorAll('[ingredient-input]');

    ingredientInputList.forEach(ingredientInput => {
        const key = Array.from(ingredientInput.attributes).find(a => a.name === 'ingredient-input').value;
        currentIngredient[key] = ingredientInput.value;
    });

    await uploadNewCourseMealIngredient(userUid, dietId, mealIndex, courseIndex, currentIngredient);
    window.location.reload();
}