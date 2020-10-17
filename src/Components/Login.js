import React, { useContext } from 'react';
import { auth, providers } from '../Services/authProviders';
import { UserContext } from '../Context/userContext';
import styles from '../App.module.css';
import Addthis from "react-load-script";

const Login = () => {

    const user = useContext(UserContext);

    const signInGoogle = async () => {

        try {
            await auth.signInWithPopup(providers.google);
        } catch (error) {
            console.log(error.message);
        }

    }

    return (
        <>
            <Addthis url='//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5f85dd0fa7c0fa0d' />
            <div className={styles.bgtitle}></div>
            <div className={styles.title}>uDiet</div>
            <div className={styles.loginbox}>
                <div onClick={signInGoogle} >
                    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
                    <div className={styles['google-btn']}>
                        <div className={styles['google-icon-wrapper']}>
                            <img alt="Google login" className={styles['google-icon']} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                        </div>
                        <p className={styles['btn-text']}><b>Sign in with google</b></p>
                    </div>
                </div>
            </div>
            <div className={`addthis_inline_share_toolbox ${styles['addthis-element']}`}></div>
        </>
    )
}

export default Login;
