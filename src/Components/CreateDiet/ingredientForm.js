import React, { useState } from 'react';
import styles from './CreateDiet.module.css';
import { activateCheck } from './CreateDiet';

const IngredientForm = () => {

    const [quantity, setQuantity] = useState(false);
    const [location, setLocation] = useState(false);
    const [brand, setBrand] = useState(false);
    const [info, setInfo] = useState(false);  

    const updateQuantity = () => setQuantity(!quantity)
    const updateLocation = () => setLocation(!location)
    const updateBrand = () => setBrand(!brand)
    const updateInfo = () => setInfo(!info)

    const removeIngredint = event => {
        event.target.parentElement.remove();
    }

    return (
        <div className={styles.ingredient} ingredient-object="">
            <i onClick={removeIngredint} className="fa fa-minus-square" aria-hidden="true" />

            <div className={styles['ingredient-name']}><label>Nombre del ingrediente</label>
            <input ingredient-input="name" placeholder="Merienda, cena, desayuno, etc." type="text" required/></div>

            <div className={styles.checkboxes}><input onChange={updateQuantity} type="checkbox"/><label onClick={activateCheck}>Añadir cantidad</label></div>
            { quantity ? <>
            <div className={styles.name}><label>Cantidad</label>
            <input ingredient-input="quantity" placeholder="200g" type="text" /></div>
            </> : undefined}

            <div className={styles.checkboxes}><input onChange={updateBrand} type="checkbox"/><label onClick={activateCheck}>Añadir marca</label></div>
            { brand ? <>
            <div className={styles.name}><label>Marca</label>
            <input ingredient-input="brand" placeholder="Marca del producto" type="text" /></div>
            </> : undefined}

            <div className={styles.checkboxes}><input onChange={updateLocation} type="checkbox"/><label onClick={activateCheck}>Añadir localización</label></div>
            { location ? <>
            <div className={styles.name}><label>Localización</label>
            <input ingredient-input="location" placeholder="Dónde encontrarlo" type="text" /></div>
            </> : undefined}

            <div className={styles.checkboxes}><input onChange={updateInfo} type="checkbox"/><label onClick={activateCheck}>Añadir más info</label></div>
            { info ? <>
            <div className={styles.name}><label>Información adicional</label>
            <input ingredient-input="info" placeholder="Información adicional" type="text" /></div>
            </> : undefined}


        </div>
    )

}

export default IngredientForm;