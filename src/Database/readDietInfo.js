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

    try {
        const data = await firebase.database()
            .ref(`diets/users/${userId}/${dietId}/sharedWith`)
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

export const getMealOrder = async (userUid, dietId) => {

    try {

        const data = await firebase.database()
            .ref(`diets/users/${userUid}/${dietId}/mealOrder`)
            .once('value');
        return data.exportVal();

    } catch (error) {
        console.error(error)
    }

}