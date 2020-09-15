import React from 'react';
import styles from './MealOption.module.css';

const MealOption = (props) => {

    //const {courseMeals} = props;

    return (

    <div className={styles['options-box-displayed']
        /*props.displayed ? styles['options-box-displayed'] : styles['options-box']*/}>
        <div>{/*courseMeals[0].name*/}</div>
        <div>Propiedades: {/*courseMeals[0].properties*/}</div>
        <div>Ingredientes: {/*props.mealData.ingredients.toString()*/}</div>
        <div>Preparación: {/*courseMeals[0].recipe*/}</div>
    </div>
    )
}

export default MealOption;