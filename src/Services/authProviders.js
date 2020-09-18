import * as firebase from 'firebase/app';
import firebaseConfig from '../firebase';
import 'firebase/auth';

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const providers = {
    google: new firebase.auth.GoogleAuthProvider()
}

export {
    auth,
    providers
}