import * as firebase from 'firebase/app';
import 'firebase/database';
import { getUserDiets, getCourseMealIngredientLength, getCourseMealLength, getMealLength } from './readDietInfo';
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

export const uploadNewCourseMealImage = async (userUid, dietId, mealIndex, courseMealIndex, file) => {

    try {

        await firebase.storage().ref()
            .child(`coursemeals/${userUid}/${dietId}/${mealIndex}/${courseMealIndex}`)
            .put(file)

    } catch (error) {
        console.error("Error uploading the image: " + error)
    }
}

export const deleteCourseMealImage = async (userUid, dietId, mealIndex, courseMealIndex) => {
    try {
        await firebase.storage().ref()
            .child(`coursemeals/${userUid}/${dietId}/${mealIndex}/${courseMealIndex}`)
            .delete();

    } catch (error) {
        console.error("Error deleting the image: " + error)
    }
}


export const modifyCouseMealImageInfo = async (userId, dietId, mealIndex, courseMealIndex, action) => {

    const dietList = await getUserDiets(userId);
    const dietName = dietList.length > 1 ? Object.getOwnPropertyNames(await dietList)
     : Object.getOwnPropertyNames(await dietList)[dietId];

    try {
       await firebase.database()
        .ref(`diets/users/${userId}/${dietName}/mealData/${mealIndex}/courseMeals/${courseMealIndex}`)
        .update({hasImage: action});
        
    } catch (error) {
        console.error(error);
    }

}

export const modifyCourseMealInfo = async (userId, dietId, mealIndex, courseMealIndex, property, newInfo) => {

    const dietList = await getUserDiets(userId);
    const dietName = dietList.length > 1 ? Object.getOwnPropertyNames(await dietList)
     : Object.getOwnPropertyNames(await dietList)[dietId];

    try {
       await firebase.database()
        .ref(`diets/users/${userId}/${dietName}/mealData/${mealIndex}/courseMeals/${courseMealIndex}`)
        .update({[property]: newInfo});
        
    } catch (error) {
        console.error(error);
    }

}

export const modifyIngredientInfo = async (userId, dietId, mealIndex, courseMealIndex, ingredientIndex, newObject) => {

    const dietList = await getUserDiets(userId);
    console.log(userId, dietList);
    const dietName = dietList.length > 1 ? Object.getOwnPropertyNames(await dietList)
     : Object.getOwnPropertyNames(await dietList)[dietId];

    try {

       await firebase.database()
        .ref(`diets/users/${userId}/${dietName}/mealData/${mealIndex}/courseMeals/${courseMealIndex}/ingredients/${ingredientIndex}`)
        .update(newObject);
        
    } catch (error) {
        console.error(error);
    }

}

export const deleteCourseMealIngredient = async (userId, dietId, mealIndex, courseMealIndex, ingredientIndex) => {

    const dietList = await getUserDiets(userId);
    console.log(userId, dietList);
    const dietName = dietList.length > 1 ? Object.getOwnPropertyNames(await dietList)
     : Object.getOwnPropertyNames(await dietList)[dietId];

    try {

       await firebase.database()
        .ref(`diets/users/${userId}/${dietName}/mealData/${mealIndex}/courseMeals/${courseMealIndex}/ingredients/${ingredientIndex}`)
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

export const uploadNewCourseMealIngredient = async (userId, dietId, mealIndex, courseMealIndex, ingredientObject) => {

    const dietList = await getUserDiets(userId);
    console.log(userId, dietList);
    const dietName = dietList.length > 1 ? Object.getOwnPropertyNames(await dietList)
     : Object.getOwnPropertyNames(await dietList)[dietId];

    
    const ingredientIndex =  Object.values(await getCourseMealIngredientLength(userId, dietId, mealIndex, courseMealIndex)).length;
    const ingredients = {
        [ingredientIndex]: ingredientObject
    }

    try {

       await firebase.database()
        .ref(`diets/users/${userId}/${dietName}/mealData/${mealIndex}/courseMeals/${courseMealIndex}/ingredients`)
        .update(ingredients)
        
    } catch (error) {
        console.error(error);
    }

}

export const uploadNewCourseMeal = async (userId, dietId, mealIndex, courseMealObject) => {

    const dietList = await getUserDiets(userId);
    console.log(userId, dietList);
    const dietName = dietList.length > 1 ? Object.getOwnPropertyNames(await dietList)
     : Object.getOwnPropertyNames(await dietList)[dietId];

    
    const courseMealIndex =  Object.values(await getCourseMealLength(userId, dietId, mealIndex)).length;
    const courseMeals = {
        [courseMealIndex]: courseMealObject
    }

    try {

       await firebase.database()
        .ref(`diets/users/${userId}/${dietName}/mealData/${mealIndex}/courseMeals`)
        .update(courseMeals)
        
    } catch (error) {
        console.error(error);
    }

}

export const uploadNewMeal = async (userId, dietId, mealObject) => {

    const dietList = await getUserDiets(userId);
    console.log(userId, dietList);
    const dietName = dietList.length > 1 ? Object.getOwnPropertyNames(await dietList)
     : Object.getOwnPropertyNames(await dietList)[dietId];

    
    const mealIndex =  Object.values(await getMealLength(userId, dietId)).length;
    const mealData = {
        [mealIndex]: mealObject
    }

    try {

       await firebase.database()
        .ref(`diets/users/${userId}/${dietName}/mealData`)
        .update(mealData)
        
    } catch (error) {
        console.error(error);
    }

}

export const deleteDietMeal = async (userId, dietId, mealIndex) => {

    const dietList = await getUserDiets(userId);
    const dietName = dietList.length > 1 ? Object.getOwnPropertyNames(await dietList)
     : Object.getOwnPropertyNames(await dietList)[dietId];

     try {

        await firebase.database()
        .ref(`diets/users/${userId}/${dietName}/mealData/${mealIndex}`)
        .remove();

        const {prefixes} = await firebase.storage()
        .ref(`coursemeals/${userId}/${dietId}/${mealIndex}`)
        .listAll()

        prefixes.forEach(async item => {
            await firebase.storage()
            .ref(item.fullPath)
            .delete();
        });

     } catch (error) {
         console.error(error);
     }

}

export const deleteDietCourseMeal = async (userId, dietId, mealIndex, courseMealIndex) => {

    const dietList = await getUserDiets(userId);
    const dietName = dietList.length > 1 ? Object.getOwnPropertyNames(await dietList)
     : Object.getOwnPropertyNames(await dietList)[dietId];

     try {

        await firebase.database()
        .ref(`diets/users/${userId}/${dietName}/mealData/${mealIndex}/couseMeals/${courseMealIndex}`)
        .remove();

        await firebase.storage()
        .ref(`coursemeals/${userId}/${dietId}/${mealIndex}/${courseMealIndex}`)
        .delete();

     } catch (error) {
         console.error(error);
     }

}