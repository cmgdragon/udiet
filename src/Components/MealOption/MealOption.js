import React from 'react';
import styles from './MealOption.module.css';

const MealOption = (props) => {

    console.log(props)
    const { courseMeals } = props;
    
        
    return (  
    <div className={styles['options-box-displayed']
                /*props.displayed ? styles['options-box-displayed'] : styles['options-box']*/}>

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
                                            <div key={index} className={styles.ingredient}>
                                                {name}
                                            </div>
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