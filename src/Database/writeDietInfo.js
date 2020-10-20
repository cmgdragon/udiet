import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

export const addNewUserDiet = async (userId, updatedDiets) => {

    try {
        firebase.database()
            .ref(`diets/users/${userId}`)
            .set(updatedDiets);
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

    try {
       await firebase.database()
        .ref(`diets/users/${userId}/${dietId}/mealData/${mealKey}/courseMeals/${courseMealKey}`)
        .update({hasImage: action});
        
    } catch (error) {
        console.error(error);
    }

}

export const modifyCourseMealInfo = async (userId, dietId, mealKey, courseMealKey, property, newInfo) => {

    try {
       await firebase.database()
        .ref(`diets/users/${userId}/${dietId}/mealData/${mealKey}/courseMeals/${courseMealKey}`)
        .update({[property]: newInfo});
        
    } catch (error) {
        console.error(error);
    }

}

export const modifyIngredientInfo = async (userId, dietId, mealKey, courseMealKey, ingredientKey, newObject) => {

    try {

       await firebase.database()
        .ref(`diets/users/${userId}/${dietId}/mealData/${mealKey}/courseMeals/${courseMealKey}/ingredients/${ingredientKey}`)
        .update(newObject);
        
    } catch (error) {
        console.error(error);
    }

}

export const uploadNewCourseMealIngredient = async (userId, dietId, mealKey, courseMealKey, ingredientObject) => {

    try {

       await firebase.database()
        .ref(`diets/users/${userId}/${dietId}/mealData/${mealKey}/courseMeals/${courseMealKey}/ingredients`)
        .set(ingredientObject)
        
    } catch (error) {
        console.error(error);
    }

}

export const uploadNewCourseMeal = async (userId, dietId, mealKey, courseMealObject) => {

    try {

       await firebase.database()
        .ref(`diets/users/${userId}/${dietId}/mealData/${mealKey}/courseMeals`)
        .set(courseMealObject)
        
    } catch (error) {
        console.error(error);
    }

}

export const uploadNewMeal = async (userId, dietId, mealObject) => {

    try {

       await firebase.database()
        .ref(`diets/users/${userId}/${dietId}/mealData`)
        .set(mealObject)
        
    } catch (error) {
        console.error(error);
    }

}

export const modifyDietUserSharedList = async (userId, dietId, sharedUsersDietList) => {

    try {

       await firebase.database()
        .ref(`diets/users/${userId}/${dietId}/sharedWith`)
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

    try {

       await firebase.database()
        .ref(`diets/users/${userId}/${dietId}/dietName`)
        .set(newName);
        
    } catch (error) {
        console.error(error);
    }

}

export const changeMealName = async (userId, dietId, mealKey, newName) => {

    try {

       await firebase.database()
        .ref(`diets/users/${userId}/${dietId}/mealData/${mealKey}/name`)
        .set(newName)
        
    } catch (error) {
        console.error(error);
    }

}

export const changeCourseMealName = async (userId, dietId, mealKey, courseKey, newName) => {

    try {

       await firebase.database()
        .ref(`diets/users/${userId}/${dietId}/mealData/${mealKey}/courseMeals/${courseKey}/name`)
        .set(newName)
        
    } catch (error) {
        console.error(error);
    }

}

export const setDietPrivateness = async (userId, dietId, isPrivate) => {

    try {
       await firebase.database()
        .ref(`diets/users/${userId}/${dietId}/isPrivate/`)
        .set(isPrivate);
        
    } catch (error) {
        console.error(error);
    }

}

export const updateMealOrder = async (userId, dietId, newOrder) => {

    try {
       await firebase.database()
        .ref(`diets/users/${userId}/${dietId}/mealOrder/`)
        .set(newOrder);
        
    } catch (error) {
        console.error(error);
    }

}