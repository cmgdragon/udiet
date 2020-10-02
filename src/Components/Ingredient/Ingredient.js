import React, {useEffect, useState, useRef} from 'react';
import styles from './Ingredient.module.css';

const Ingredient = props => {

    const {ingredientName, quantity, brand, location, info } = props;
    const [expanded, setExpanded] = useState(false);
    const ingredientContent = useRef();

    const expandedStyle = {
        height: expanded ? ingredientContent.current.scrollHeight : '0px',
        padding: expanded ? '0.7rem' : '0px'
    }

    const expand = () => {
        setExpanded(!expanded);
    }

    useEffect(() => {

    });


    return (
        <div className={styles.ingredients}>


            <div className={styles['ingredient-name']} onClick={expand}>{ingredientName}</div>
            <div className={styles['ingredient-list-background']} style={expandedStyle} ref={ingredientContent}>
            {quantity ? <div className={styles.quantity}><div className={styles['ingredient-labels']}>Cantidad</div> <div>{quantity}</div></div> : undefined }
            {brand ? <div className={styles.brand}><div className={styles['ingredient-labels']}>Marca</div> <div>{brand}</div></div> : undefined }
            {location ? <div className={styles.location}><div className={styles['ingredient-labels']}>Localización</div> <div>{location}</div></div> : undefined }
            {info ? <div className={styles.info}><div className={styles['ingredient-labels']}>Más info</div> <div>{info}</div></div> : undefined }
            </div>
        </div>
    ) 

}

export default Ingredient;