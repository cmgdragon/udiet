import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ViewDiet/Diet.module.css';

const Header = ({user, signOut}) => {
    return(
    <header className={styles.userbuttons}>
        <Link to={'/'} id="back-button" className={`fa fa-arrow-left ${styles.goback}`} aria-hidden="true"></Link>
        { !user.notLoggedIn ? <button className={styles.logout} onClick={signOut}>Salir ({user.displayName ? user.displayName : user.email})</button> : undefined }
    </header>
    )
}

export default Header;