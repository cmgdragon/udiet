import { uploadNewCourseMeal, uploadNewMeal, uploadNewCourseMealIngredient, updateMealOrder } from '../../Database/writeDietInfo';
import { getMealOrder } from '../../Database/readDietInfo';

export const sendNewMeal = (userUid, dietId, mealList, setMealList) => {
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

        const maxKeyList = mealList ? Math.max(...Object.keys(mealList)) : 0;
        const newKey = maxKeyList === 0 ? 1 : maxKeyList + 1;
        const mealData = {...mealList, [newKey]: newMeal};

        const mealOrder = Object.values(await getMealOrder(userUid, dietId));
        mealOrder.push(newKey.toString());

        await uploadNewMeal(userUid, dietId, mealData);
        await updateMealOrder(userUid, dietId, mealOrder);
        setMealList(mealData);

    });
}

export const sendNewCourseMeal = async (userUid, dietId, mealKey, mealList, setMealList) => {
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

        const oldCourseMeal = mealList[mealKey]?.courseMeals;
        const courseMealKey =  oldCourseMeal ? Object.values(mealList[mealKey].courseMeals).length : 0;
        const courseMeals = {
            ...oldCourseMeal,
            [courseMealKey]: currentCourseMeal
        }

        mealList[mealKey].courseMeals = courseMeals;
        await uploadNewCourseMeal(userUid, dietId, mealKey, courseMeals);
        setMealList(mealList);
}

export const sendNewIngredient = async (userUid, dietId, mealIndex, courseIndex, ingredientList, setIngredientList) => {
    const ingredient = document.querySelector('[diet-modal]')
                            .querySelector('[ingredient-object]');

    const currentIngredient = {};
    const ingredientInputList = ingredient.querySelectorAll('[ingredient-input]');

    ingredientInputList.forEach(ingredientInput => {
        const key = Array.from(ingredientInput.attributes).find(a => a.name === 'ingredient-input').value;
        currentIngredient[key] = ingredientInput.value;
    });

    const ingredientListLength = ingredientList ? Object.values(ingredientList).length : 0;
    const ingredients = {
        ...ingredientList,
        [ingredientListLength]: currentIngredient
    }

    await uploadNewCourseMealIngredient(userUid, dietId, mealIndex, courseIndex, ingredients);
    setIngredientList(ingredients);
}