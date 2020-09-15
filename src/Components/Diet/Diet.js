import React from 'react';
import styles from './Diet.module.css';
import Meal from '../Meal'

const Diet = (props) => {

    //const {dietData} = props;
    //const [mealData] = dietData;

    return (

        <div className={styles.cuerpo}>
           <h1 className={styles['diet-name']}>{/*dietData.title*/}</h1>
            {/*<Meal mealData={mealData} />*/}

        </div>

    ) 

}

export default Diet;