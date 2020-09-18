import * as firebase from 'firebase/app';
import 'firebase/database';

/*export const writeNewUserDiet = async (userId, dietObject) => {

    try {
        firebase.database().ref(`diets/users/${userId}`).set({dietObject});
    } catch (error) {
        console.error(error);
    }

}*/

export const addNewUserDiet = async (userId, dietObject) => {

    try {
        firebase.database().ref(`diets/users/${userId}`).push(dietObject);
    } catch (error) {
        console.error(error);
    }

}