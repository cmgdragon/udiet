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

export const getCourseMealImage = async (userUid, dietId, mealIndex, courseMealIndex) => {

    const imageRef = firebase.storage().ref().child(`coursemeals/${userUid}/${dietId}/${mealIndex}/${courseMealIndex}`)

    try {
        return await imageRef.getDownloadURL();
    } catch (error) {
        console.error(error)
    }

}