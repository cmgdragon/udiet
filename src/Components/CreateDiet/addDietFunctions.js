import { uploadNewCourseMeal, uploadNewMeal, uploadNewCourseMealIngredient } from '../../Database/writeDietInfo';

export const sendNewMeal = (userUid, dietId, mealList, setMealList, getCourseMealImageList) => {
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
        console.log(mealList);
        const maxKeyList = mealList ? Math.max(...Object.keys(mealList)) : 0;
        const mealData = {...mealList, [maxKeyList]: newMeal};

        console.log(newMeal);
        await uploadNewMeal(userUid, dietId, mealData);
        
        setMealList(mealData);

    });
}

export const sendNewCourseMeal = async (userUid, dietId, mealKey, mealList, setMealList) => {
    console.log("WAYT", mealKey)
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
        console.log(mealKey, courseMeals)
        await uploadNewCourseMeal(userUid, dietId, mealKey, courseMeals);
        setMealList(mealList);
        //window.location.reload();
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

    const ingredientListLength = Object.values(ingredientList).length;
    const ingredients = {
        ...ingredientList,
        [ingredientListLength]: currentIngredient
    }

    await uploadNewCourseMealIngredient(userUid, dietId, mealIndex, courseIndex, ingredients);
    setIngredientList(ingredients);
}