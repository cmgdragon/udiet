import React, { useContext } from 'react';
import { auth, providers } from '../Services/authProviders';
import { UserContext } from '../Context/userContext';
import styles from '../App.module.css';
import Addthis from "react-load-script";

const Login = () => {

    const user = useContext(UserContext);

    const signIn = async provider => {

        try {
            await auth.signInWithPopup(provider);
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

                <div className={styles['login-buttons']}>


                    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
                    <div onClick={() => signIn(providers.google)} className={`${styles['google-btn']} ${styles['provider-btn']}`}>
                        <div className={styles['provider-icon-wrapper']}>
                            <img alt="Google login" className={`${styles['google-icon']} ${styles['provider-icon']}`} src="providers_icons/google.svg" />
                        </div>
                        <p className={styles['btn-text']}><b>Sign in with Google</b></p>
                    </div>

                    <div onClick={() => signIn(providers.twitter)} className={`${styles['twitter-btn']} ${styles['provider-btn']}`}>
                        <div className={styles['provider-icon-wrapper']}>
                            <img alt="Twitter login" className={`${styles['twitter-icon']} ${styles['provider-icon']}`} src="providers_icons/twitter.png" />
                        </div>
                        <p className={styles['btn-text']}><b>Sign in with Twitter</b></p>
                    </div>

                    <div onClick={() => signIn(providers.github)} className={`${styles['github-btn']} ${styles['provider-btn']}`}>
                        <div className={styles['provider-icon-wrapper']}>
                            <img alt="Github login" className={`${styles['github-icon']} ${styles['provider-icon']}`} src="providers_icons/github.png" />
                        </div>
                        <p className={styles['btn-text']}><b>Sign in with Github</b></p>
                    </div>

                    <div onClick={() => signIn(providers.facebook)} className={`${styles['facebook-btn']} ${styles['provider-btn']}`}>
                        <div className={styles['provider-icon-wrapper']}>
                            <img alt="Github login" className={`${styles['facebook-icon']} ${styles['provider-icon']}`} src="providers_icons/facebook.png" />
                        </div>
                        <p className={styles['btn-text']}><b>Sign in with Facebook</b></p>
                    </div>

                </div>

            </div>
            <div className={`addthis_inline_share_toolbox ${styles['addthis-element']}`}></div>
        </>
    )
}

export default Login;
