import React from 'react';
import styles from '../App.module.css';

const Footer = () => {

    return (
        <footer className={styles.footer}>
            <div className={styles['footer-credits']}>© uDiet 2020 – cmgdragon <span role="img">🐲</span></div>
            <a href='https://github.com/cmgdragon/udiet' target='_blank' aria-hidden="true"><i className="fa fa-github" aria-hidden="true"></i></a>
        </footer>
    )
}

export default Footer;