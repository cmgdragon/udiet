import * as firebase from 'firebase/app';
import 'firebase/database';
import { getUserDiets } from './readDietInfo';
import 'firebase/storage';

export const addNewUserDiet = async (userId, dietObject) => {

    try {
        firebase.database()
            .ref(`diets/users/${userId}`)
            .push(dietObject);
    } catch (error) {
        console.error(error);
    }

}

export const uploadNewCourseMealImage = async (userUid, dietId, mealKey, courseMealKey, file) => {

    try {

        await firebase.storage().ref()
            .child(`coursemeals/${userUid}/${dietId}/${mealKey}/${courseMealKey}`)
            .put(file)

    } catch (error) {
        console.error("Error uploading the image: " + error)
    }
}

export const modifyCouseMealImageInfo = async (userId, dietId, mealKey, courseMealKey, action) => {

    const dietList = await getUserDiets(userId);
    const dietName = dietList.length > 1 ? Object.getOwnPropertyNames(await dietList)
     : Object.getOwnPropertyNames(await dietList)[dietId];

    try {
       await firebase.database()
        .ref(`diets/users/${userId}/${dietName}/mealData/${mealKey}/courseMeals/${courseMealKey}`)
        .update({hasImage: action});
        
    } catch (error) {
        console.error(error);
    }

}

export const modifyCourseMealInfo = async (userId, dietId, mealKey, courseMealKey, property, newInfo) => {

    const dietList = await getUserDiets(userId);
    const dietName = dietList.length > 1 ? Object.getOwnPropertyNames(await dietList)
     : Object.getOwnPropertyNames(await dietList)[dietId];

    try {
       await firebase.database()
        .ref(`diets/users/${userId}/${dietName}/mealData/${mealKey}/courseMeals/${courseMealKey}`)
        .update({[property]: newInfo});
        
    } catch (error) {
        console.error(error);
    }

}

export const modifyIngredientInfo = async (userId, dietId, mealKey, courseMealKey, ingredientKey, newObject) => {

    const dietList = await getUserDiets(userId);
    const dietName = dietList.length > 1 ? Object.getOwnPropertyNames(await dietList)
     : Object.getOwnPropertyNames(await dietList)[dietId];

    try {

       await firebase.database()
        .ref(`diets/users/${userId}/${dietName}/mealData/${mealKey}/courseMeals/${courseMealKey}/ingredients/${ingredientKey}`)
        .update(newObject);
        
    } catch (error) {
        console.error(error);
    }

}

export const uploadNewCourseMealIngredient = async (userId, dietId, mealKey, courseMealKey, ingredientObject) => {

    const dietList = await getUserDiets(userId);
    const dietName = dietList.length > 1 ? Object.getOwnPropertyNames(await dietList)
     : Object.getOwnPropertyNames(await dietList)[dietId];

    try {

       await firebase.database()
        .ref(`diets/users/${userId}/${dietName}/mealData/${mealKey}/courseMeals/${courseMealKey}/ingredients`)
        .set(ingredientObject)
        
    } catch (error) {
        console.error(error);
    }

}

export const uploadNewCourseMeal = async (userId, dietId, mealKey, courseMealObject) => {

    const dietList = await getUserDiets(userId);
    const dietName = dietList.length > 1 ? Object.getOwnPropertyNames(await dietList)
     : Object.getOwnPropertyNames(await dietList)[dietId];

    try {

       await firebase.database()
        .ref(`diets/users/${userId}/${dietName}/mealData/${mealKey}/courseMeals`)
        .set(courseMealObject)
        
    } catch (error) {
        console.error(error);
    }

}

export const uploadNewMeal = async (userId, dietId, mealObject) => {

    const dietList = await getUserDiets(userId);
    const dietName = dietList.length > 1 ? Object.getOwnPropertyNames(await dietList)
     : Object.getOwnPropertyNames(await dietList)[dietId];

    try {

       await firebase.database()
        .ref(`diets/users/${userId}/${dietName}/mealData`)
        .set(mealObject)
        
    } catch (error) {
        console.error(error);
    }

}

export const modifyDietUserSharedList = async (userId, dietId, sharedUsersDietList) => {

    const dietList = await getUserDiets(userId);
    const dietName = dietList.length > 1 ? Object.getOwnPropertyNames(await dietList)
     : Object.getOwnPropertyNames(await dietList)[dietId];

    try {

       await firebase.database()
        .ref(`diets/users/${userId}/${dietName}/sharedWith`)
        .set(sharedUsersDietList);
        
    } catch (error) {
        console.error(error);
    }

}

export const modifyDietSharedUsers = async sharedDiets => {

    try {

       await firebase.database()
        .ref(`sharedDiets`)
        .set(sharedDiets);
        
    } catch (error) {
        console.error(error);
    }

}

export const changeDietName = async (userId, dietId, newName) => {

    const dietList = await getUserDiets(userId);
    const dietName = dietList.length > 1 ? Object.getOwnPropertyNames(await dietList)
     : Object.getOwnPropertyNames(await dietList)[dietId];

    try {

       await firebase.database()
        .ref(`diets/users/${userId}/${dietName}/dietName`)
        .set(newName)
        
    } catch (error) {
        console.error(error);
    }

}

export const changeMealName = async (userId, dietId, mealKey, newName) => {

    const dietList = await getUserDiets(userId);
    const dietName = dietList.length > 1 ? Object.getOwnPropertyNames(await dietList)
     : Object.getOwnPropertyNames(await dietList)[dietId];

    try {

       await firebase.database()
        .ref(`diets/users/${userId}/${dietName}/mealData/${mealKey}/name`)
        .set(newName)
        
    } catch (error) {
        console.error(error);
    }

}

export const changeCourseMealName = async (userId, dietId, mealKey, courseKey, newName) => {

    const dietList = await getUserDiets(userId);
    const dietName = dietList.length > 1 ? Object.getOwnPropertyNames(await dietList)
     : Object.getOwnPropertyNames(await dietList)[dietId];

    try {

       await firebase.database()
        .ref(`diets/users/${userId}/${dietName}/mealData/${mealKey}/courseMeals/${courseKey}/name`)
        .set(newName)
        
    } catch (error) {
        console.error(error);
    }

}

export const setDietPrivateness = async (userId, dietId, isPrivate) => {

    const dietList = await getUserDiets(userId);
    const dietName = dietList.length > 1 ? Object.getOwnPropertyNames(await dietList)
     : Object.getOwnPropertyNames(await dietList)[dietId];

    try {
       await firebase.database()
        .ref(`diets/users/${userId}/${dietName}/isPrivate/`)
        .set(isPrivate);
        
    } catch (error) {
        console.error(error);
    }

}