import * as firebase from 'firebase/app';
import 'firebase/database';

export const getUserDiets = async userId => {
    try {
        const data = await firebase.database()
            .ref(`diets/users/${userId}`)
            .once('value');
        return data.exportVal();

     } catch (error) {
         console.error(error);
     }
}

export const getSharedDiets = async () => {

    try {
        const data = await firebase.database()
            .ref(`sharedDiets`)
            .once('value')

        return data.exportVal();

     } catch (error) {
         console.error(error);
     }

}

export const getDietSharedUsers = async (userId, dietId) => {

    const dietList = await getUserDiets(userId);
    const dietName = dietList.length > 1 ? Object.getOwnPropertyNames(await dietList)
     : Object.getOwnPropertyNames(await dietList)[dietId];

    try {
        const data = await firebase.database()
            .ref(`diets/users/${userId}/${dietName}/sharedWith`)
            .once('value');
        return data.exportVal();

     } catch (error) {
         console.error(error);
     }
}

export const userHasEditPermissions = async (userUid, userEmail, dietUserUid, dietId) => {

    try {
        
        const hasPerms = userUid === dietUserUid ? true :
        Object.values( await getDietSharedUsers(dietUserUid, dietId) )
        .includes(userEmail) ? true : false;

        return hasPerms;

    } catch (error) {
        
    }

}

export const getCourseMealImage = async (userUid, dietId, mealKey, courseMealKey) => {

    const imageRef = firebase.storage().ref().child(`coursemeals/${userUid}/${dietId}/${mealKey}/${courseMealKey}`)

    try {
        return imageRef.getDownloadURL();
    } catch (error) {
        console.error(error)
    }

}

export const getCourseMealIngredientLength = async (userUid, dietId, mealKey, courseMealKey) => {

    const dietList = await getUserDiets(userUid);
    const dietName = dietList.length > 1 ? Object.getOwnPropertyNames(await dietList)
     : Object.getOwnPropertyNames(await dietList)[dietId];

    try {
        const data = await firebase.database()
            .ref(`diets/users/${userUid}/${dietName}/mealData/${mealKey}/courseMeals/${courseMealKey}/ingredients`)
            .once('value')

        return data.exportVal();

     } catch (error) {
         console.error(error);
     }

}

export const getCourseMealLength = async (userUid, dietId, mealKey) => {

    const dietList = await getUserDiets(userUid);
    const dietName = dietList.length > 1 ? Object.getOwnPropertyNames(await dietList)
     : Object.getOwnPropertyNames(await dietList)[dietId];

    try {
        const data = await firebase.database()
            .ref(`diets/users/${userUid}/${dietName}/mealData/${mealKey}/courseMeals`)
            .once('value')

        return data.exportVal();

     } catch (error) {
         console.error(error);
     }

}

export const getMealLength = async (userUid, dietId) => {

    const dietList = await getUserDiets(userUid);
    const dietName = dietList.length > 1 ? Object.getOwnPropertyNames(await dietList)
     : Object.getOwnPropertyNames(await dietList)[dietId];

    try {
        const data = await firebase.database()
            .ref(`diets/users/${userUid}/${dietName}/mealData`)
            .once('value')

        return data.exportVal();

     } catch (error) {
         console.error(error);
     }

}