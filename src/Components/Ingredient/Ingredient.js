import React, {useEffect, useState, useRef} from 'react';
import styles from './Ingredient.module.css';

const Ingredient = props => {

    const {ingredientName, quantity, brand, location, info } = props;
    const [expanded, setExpanded] = useState(false);
    const ingredientContent = useRef();

    const expandedStyle = {
        height: expanded ? ingredientContent.current.scrollHeight : '0px'
    }

    const expand = () => {
        setExpanded(!expanded);
    }

    useEffect(() => {

    });


    return (
        <div>
            <div className={styles['ingredient-name']} onClick={expand}>{ingredientName}</div>
            <div className={styles['ingredient-list']} style={expandedStyle} ref={ingredientContent}>
                <div>{quantity}</div>
                <div>{brand}</div>
                <div>{location}</div>
                <div>{info}</div>
            </div>
        </div>
    ) 

}

export default Ingredient;