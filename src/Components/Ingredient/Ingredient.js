import React, { useState, useRef } from 'react';
import styles from './Ingredient.module.css';
import { deleteCourseMealIngredient } from '../../Database/deleteDietInfo';
import { editIngredient } from './ingredientEditFunctions';

const Ingredient = props => {

    const { ingredientName, quantity, brand, location, info, userId,
        dietId, mealKey, courseKey, ingredientKey, hasPerms,
        ingredientList, updateIngredients } = props;
    const [expanded, setExpanded] = useState(false);
    const [hasIngredients, setHasIngredients] = useState(quantity || brand || location || info);
    const ingredientContent = useRef();

    const hasPropertyData = property => !property ? styles.undisplay : '';

    const expandedStyle = {
        height: expanded ? ingredientContent.current.scrollHeight-10 : '0px',
        padding: expanded ? hasIngredients ? '0.7rem' : '0px' : '0px'
    }

    const ingredientNameStyle = () => ({ cursor: hasIngredients ? 'pointer' : '' })

    const expand = () => setExpanded(!expanded);

    const deleteIngredient = async event => {
        event.stopPropagation();
        const ingredient = event.target.parentElement.parentElement.parentElement;
        if (window.confirm('¿Quieres borrar este ingrediente?')) {
            await deleteCourseMealIngredient(userId, dietId, mealKey, courseKey, ingredientKey);
            delete ingredientList[ingredientKey];
            updateIngredients(ingredientList);
            ingredient.remove();
        }
    }

    return (
        <div className={styles.ingredients}>

            <div className={`${styles['ingredient-name']} ${hasIngredients ? styles['not-empty'] : ''}`} onClick={expand}>
                {hasPerms ? <div className={styles['edit-box']}>
                    <i onClick={event => editIngredient(event, userId, dietId, mealKey, courseKey,
                        ingredientKey, expanded, setExpanded, setHasIngredients)}
                        className={`fa fa-pencil`} aria-hidden="true"></i>
                    <i onClick={deleteIngredient} className={`fa fa-trash`} aria-hidden="true"></i>
                </div>
                    : undefined}
                <div>{ingredientName}</div>
            </div>

            <div className={styles['ingredient-list-background']} style={expandedStyle} ref={ingredientContent}>

                    <div className={`${styles.quantity} ${hasPropertyData(quantity)}`} ingredient-box='quantity'>
                        <div className={styles['ingredient-labels']}>Cantidad</div>
                        <div current-value=''>{quantity}</div>
                    </div>

                    <div className={`${styles.brand} ${hasPropertyData(brand)}`} ingredient-box='brand'>
                        <div className={styles['ingredient-labels']}>Marca</div>
                        <div current-value=''>{brand}</div>
                    </div>

                    <div className={`${styles.location} ${hasPropertyData(location)}`} ingredient-box='location'>
                        <div className={styles['ingredient-labels']}>Localización</div>
                        <div current-value=''>{location}</div>
                    </div>

                    <div className={`${styles.info} ${hasPropertyData(info)}`} ingredient-box='info'>
                        <div className={styles['ingredient-labels']}>Más info</div>
                        <p current-value='masinfo'>{info}</p>
                    </div>
            </div>

        </div>
    )

}

export default Ingredient;