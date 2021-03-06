import * as firebase from 'firebase/app';
import 'firebase/database';
import { getUserDiets } from './readDietInfo';
import 'firebase/storage';

export const deleteCourseMealImage = async (userUid, dietId, mealKey, courseMealKey) => {
    try {
        await firebase.storage().ref()
            .child(`coursemeals/${userUid}/${dietId}/${mealKey}/${courseMealKey}`)
            .delete();

    } catch (error) {
        console.error("Error deleting the image: " + error)
    }
}

export const deleteCourseMealIngredient = async (userId, dietId, mealKey, courseMealKey, ingredientKey) => {

    try {

       await firebase.database()
        .ref(`diets/users/${userId}/${dietId}/mealData/${mealKey}/courseMeals/${courseMealKey}/ingredients/${ingredientKey}`)
        .remove();
        
    } catch (error) {
        console.error(error);
    }

}

export const deleteUserDiet = async (userId, dietId) => {

     try {

        await firebase.database()
        .ref(`diets/users/${userId}/${dietId}`)
        .remove();

        const {prefixes} = await firebase.storage()
        .ref(`coursemeals/${userId}/${dietId}`)
        .listAll()

        for (const folder of prefixes) {
            const {items} = await folder.listAll();
            for (const item of items) {
                await firebase.storage()
                .ref(item.fullPath)
                .delete();  
            }
        }

     } catch (error) {
         console.error(error);
     }

}

export const deleteDietMeal = async (userId, dietId, mealKey) => {

     try {

        await firebase.database()
        .ref(`diets/users/${userId}/${dietId}/mealData/${mealKey}`)
        .remove();

        const { items } = await firebase.storage()
        .ref(`coursemeals/${userId}/${dietId}/${mealKey}`)
        .listAll()

        items.forEach(async item => {
            await firebase.storage()
            .ref(item.fullPath)
            .delete();
        });

     } catch (error) {
         console.error(error);
     }

}

export const deleteDietCourseMeal = async (userId, dietId, mealKey, courseMealKey, hasImage) => {

     try {

        await firebase.database()
        .ref(`diets/users/${userId}/${dietId}/mealData/${mealKey}/courseMeals/${courseMealKey}`)
        .remove();

        if (hasImage) deleteCourseMealImage(userId, dietId, mealKey, courseMealKey);

     } catch (error) {
         console.error(error);
     }

}