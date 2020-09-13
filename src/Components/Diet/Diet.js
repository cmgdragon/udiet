import React from 'react';
import styles from './Diet.module.css';
import Meal from '../Meal'

const Diet = (props) => {


    return (

        <div className={styles.cuerpo}>
           <h1 className={styles['diet-name']}>Dieta de alguien</h1>
            <Meal />

        </div>

    ) 

}

export default Diet;