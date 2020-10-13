import React, { useContext } from 'react';
import { auth, providers } from '../Services/authProviders';
import { UserContext } from '../Context/userContext';
import styles from '../App.module.css';

const Login = () => {

    const user = useContext(UserContext);
    console.log("uid: "+user.uid);

    const signInGoogle = async () => {

        try {
            const response = await auth.signInWithPopup(providers.google);
            console.log(response.user);        
        } catch (error) {
            console.log(error.message);
        }
    
    }

    return (
        <>
        <div className={styles.bgtitle}></div>
        <div className={styles.title}>uDiet</div>
        <div className={styles.loginbox}>
        <div onClick={signInGoogle} >
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
                <div className={styles['google-btn']}>
                <div className={styles['google-icon-wrapper']}>
                    <img alt="Google login" className={styles['google-icon']} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                </div>
                <p className={styles['btn-text']}><b>Sign in with google</b></p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login;