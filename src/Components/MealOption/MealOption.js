import React, { useState, useRef } from 'react';
import styles from './MealOption.module.css';
import Ingredient from '../Ingredient';

const MealOption = props => {

    console.log(props)
    const { courseMeals } = props;
    //const [displayed, setDisplayed] = useState(undefined);
    const mealOption = useRef();

    const expandedStyle = {
        //height: displayed ? mealOption.current.scrollHeight : '0px'
    }
        
    return (  
    <div ref={mealOption} className={styles['options-box']} style={expandedStyle}>

        {
            Object.values(courseMeals).map(({ingredients, name, properties, recipe, comments}, index) => {
                return (
                    <React.Fragment key={index} >
                        <div>Nombre: {name}</div>
                        { properties ? <div>Propiedades: {properties}</div> : undefined}
                            <div>Ingredientes: </div>
                            
                                <div className={styles['ingredient-list']}>
                                {
                                    Object.values(ingredients).map(({name, quantity, brand, location, info}, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <Ingredient
                                                    ingredientName={name}
                                                    quantity={quantity}
                                                    brand={brand}
                                                    location={location}
                                                    info={info}
                                                />
                                            </React.Fragment>
                                        )
                                    })
                                }
                                </div>
                            
                        { recipe ? <div>Preparación: {recipe}</div> : undefined}
                        { comments ? <div>Comentarios: {comments}</div> : undefined}
                    </React.Fragment>
                )
            })
        }

    </div>
    )
}

export default MealOption;