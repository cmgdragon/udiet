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

    const dietList = await getUserDiets(userId);
    const dietName = dietList.length > 1 ? Object.getOwnPropertyNames(await dietList)
     : Object.getOwnPropertyNames(await dietList)[dietId];

    try {

       await firebase.database()
        .ref(`diets/users/${userId}/${dietName}/mealData/${mealKey}/courseMeals/${courseMealKey}/ingredients/${ingredientKey}`)
        .remove();
        
    } catch (error) {
        console.error(error);
    }

}

export const deleteUserDiet = async (userId, dietId) => {

    const dietList = await getUserDiets(userId);
    const dietName = dietList.length > 1 ? Object.getOwnPropertyNames(await dietList)
     : Object.getOwnPropertyNames(await dietList)[dietId];

     try {

        await firebase.database()
        .ref(`diets/users/${userId}/${dietName}`)
        .remove();

        const {prefixes} = await firebase.storage()
        .ref(`coursemeals/${userId}/${dietId}`)
        .listAll()

        prefixes.forEach(async folder => {
            const {items} = await folder.listAll();
            items.forEach(async item => {
                await firebase.storage()
                .ref(item.fullPath)
                .delete();
            });
        });

     } catch (error) {
         console.error(error);
     }

}

export const deleteDietMeal = async (userId, dietId, mealKey) => {

    const dietList = await getUserDiets(userId);
    const dietName = dietList.length > 1 ? Object.getOwnPropertyNames(await dietList)
     : Object.getOwnPropertyNames(await dietList)[dietId];

     try {

        await firebase.database()
        .ref(`diets/users/${userId}/${dietName}/mealData/${mealKey}`)
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

export const deleteDietCourseMeal = async (userId, dietId, mealKey, courseMealKey) => {

    const dietList = await getUserDiets(userId);
    const dietName = dietList.length > 1 ? Object.getOwnPropertyNames(await dietList)
     : Object.getOwnPropertyNames(await dietList)[dietId];

     try {

        await firebase.database()
        .ref(`diets/users/${userId}/${dietName}/mealData/${mealKey}/courseMeals/${courseMealKey}`)
        .remove();

        deleteCourseMealImage(userId, dietId, mealKey, courseMealKey);

     } catch (error) {
         console.error(error);
     }

}