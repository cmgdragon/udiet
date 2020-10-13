import React, { useState } from 'react';
import styles from './CreateDiet.module.css';
import CourseMealForm from './CourseMealForm';

const MealForm = props => {

    const { initNumber, canRemove = true } = props;
    const [courseMealNumber, setCourseMealNumber] = useState(initNumber);

    const removeMeal = event => {
        event.target.parentElement.remove();
    }

    const addCourseMeal = () => {

        setCourseMealNumber(
            courseMealNumber + 1
        );

    }

    const renderCourseMeals = () => {

        let renderCourseMeals = [];

        for (let i = 0; i < courseMealNumber; i++) {
            renderCourseMeals.push(
                <React.Fragment key={i}>
                    <CourseMealForm />
                </React.Fragment>
            );
        }

        return renderCourseMeals;

    }


    return (
        <div className={styles.meal} meal-object="" >
            { canRemove ? <i onClick={removeMeal} className="fa fa-minus-square" aria-hidden="true" /> : undefined }

            <div className={styles.name}><label>Nombre de la comida</label>
                <input meal-name="" placeholder="Merienda, cena, desayuno, etc." type="text" required/>
            </div>

            <div onClick={addCourseMeal} className={styles['coursemeal-button']}>
                Añadir plato
            </div>

            <div className={styles['coursemeal-box']}>

                {
                    renderCourseMeals()
                }

            </div>

        </div>
    )

}

export default MealForm;