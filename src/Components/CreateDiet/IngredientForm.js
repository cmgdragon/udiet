import React, { useState } from 'react';
import styles from './CreateDiet.module.css';
import { activateCheck } from './CreateDiet';

const IngredientForm = ({canRemove = true}) => {

    const [quantity, setQuantity] = useState(false);
    const [location, setLocation] = useState(false);
    const [brand, setBrand] = useState(false);
    const [info, setInfo] = useState(false);  

    const updateQuantity = () => setQuantity(!quantity)
    const updateLocation = () => setLocation(!location)
    const updateBrand = () => setBrand(!brand)
    const updateInfo = () => setInfo(!info)

    const removeIngredient = event => {
        event.target.parentElement.remove();
    }

    return (
        <div className={styles.ingredient} ingredient-object="">
            { canRemove ? <i onClick={removeIngredient} className="fa fa-minus-square" aria-hidden="true" /> : undefined }

            <div className={styles['ingredient-name']}><label>Nombre del ingrediente</label>
            <input ingredient-input="name" placeholder="Arroz" type="text" required/></div>

            <div className={styles.checkboxes}><input onChange={updateQuantity} type="checkbox"/><label onClick={activateCheck}>Añadir cantidad</label></div>
            { quantity ? <>
            <div className={styles.name}>
            <input ingredient-input="quantity" placeholder="200g" type="text" /></div>
            </> : undefined}

            <div className={styles.checkboxes}><input onChange={updateBrand} type="checkbox"/><label onClick={activateCheck}>Añadir marca</label></div>
            { brand ? <>
            <div className={styles.name}>
            <input ingredient-input="brand" placeholder="Marca del producto" type="text" /></div>
            </> : undefined}

            <div className={styles.checkboxes}><input onChange={updateLocation} type="checkbox"/><label onClick={activateCheck}>Añadir localización</label></div>
            { location ? <>
            <div className={styles.name}>
            <input ingredient-input="location" placeholder="Dónde encontrarlo" type="text" /></div>
            </> : undefined}

            <div className={styles.checkboxes}><input onChange={updateInfo} type="checkbox"/><label onClick={activateCheck}>Añadir más info</label></div>
            { info ? <>
            <div className={styles.name}>
            <textarea ingredient-input="info" placeholder="Información adicional" type="text" ></textarea></div>
            </> : undefined}


        </div>
    )

}

export default IngredientForm;
