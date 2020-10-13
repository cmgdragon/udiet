import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ViewDiet/Diet.module.css';

const Header = ({user, signOut}) => {
    return(
    <header className={styles.userbuttons}>
        <Link to={'/'} id="back-button" className={`fa fa-arrow-left ${styles.goback}`} aria-hidden="true"></Link>
        <button className={styles.logout} onClick={signOut}>Salir ({user.displayName})</button>
    </header>
    )
}

export default Header;