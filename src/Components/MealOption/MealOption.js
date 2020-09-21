import React from 'react';
import styles from './MealOption.module.css';
import Ingredient from '../Ingredient';

const MealOption = props => {
  
    const { courseMeals, display } = props;
    const {comments, ingredients, name, properties, recipe} = courseMeals;

    return ( 
    <div  className={
      !display ? styles['options-box'] : styles['options-box'] + " " + styles.displayed
    }>
        {console.log("cagon",courseMeals)}

                        {console.log('cagonn', name)}
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


     </div>
    )
}

export default MealOption;