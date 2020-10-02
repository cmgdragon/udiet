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