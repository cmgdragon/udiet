import React, {useState, useRef} from 'react';
import styles from './Ingredient.module.css';
import { modifyIngredientInfo } from '../../Database/writeDietInfo';
import { deleteCourseMealIngredient } from '../../Database/deleteDietInfo';

const Ingredient = props => {

    const { ingredientName, quantity, brand, location, info, userId,
         dietId, mealKey, courseKey, ingredientKey, hasPerms } = props;
    const [expanded, setExpanded] = useState(false);
    const ingredientContent = useRef();

    const expandedStyle = {
        height: expanded ? ingredientContent.current.scrollHeight : '0px',
        padding: expanded ? '0.7rem' : '0px'
    }

    const expand = () => setExpanded(!expanded);

    const cancelEditOperation = (event, ingredientNameEl, ingredientListEl, editButton, removeButton, checkButton, cancelButton) => {
        if (event) event.stopPropagation();
        const oldNameEl = ingredientNameEl.querySelector(`.${styles.undisplay}:last-child`);

        oldNameEl.classList.remove(styles.undisplay);
        oldNameEl.value = ingredientNameEl.querySelector('input').value;
        ingredientNameEl.querySelector('input').remove();

        ingredientListEl.querySelectorAll('[ingredient-box]').forEach(ingredientBox => {

            const valueInput = ingredientBox.querySelector('input') || ingredientBox.querySelector('textarea');
            const oldValueDiv = ingredientBox.querySelector(`.${styles.undisplay}`);

            oldValueDiv.innerText = valueInput.value;
            oldValueDiv.classList.remove(styles.undisplay);
            valueInput.remove();

        });

        checkButton.remove();
        cancelButton.remove();
        editButton.classList.remove(styles.undisplay);
        removeButton.classList.remove(styles.undisplay);
        setExpanded(false);

    }

    const deleteIngredient = async event => {
        event.stopPropagation();
        const ingredient = event.target.parentElement.parentElement.parentElement;
        if (window.confirm('¿Quieres borrar este ingrediente?')) {
            await deleteCourseMealIngredient(userId, dietId, mealKey, courseKey, ingredientKey);
            ingredient.remove();
        }
    }

    const editIngredient = event => {
        event.stopPropagation();
        const ingredientNameEl = event.target.parentElement.parentElement;
        const ingredientListEl = ingredientNameEl.nextElementSibling;

        const nameInput = document.createElement('input');
        nameInput.setAttribute('edit-ingredient', 'name');
        nameInput.addEventListener('click', event => event.stopPropagation());
        ingredientNameEl.prepend(nameInput);
        nameInput.value = ingredientNameEl.lastChild.textContent;
        ingredientNameEl.lastChild.classList.add(styles.undisplay);

        const buttonBox = event.target.parentElement;
        const editButton = event.target;
        const removeButton = event.target.nextElementSibling;
        editButton.classList.add(styles.undisplay);
        removeButton.classList.add(styles.undisplay);

        const checkButton = document.createElement('i');
        const cancelButton = document.createElement('i');
        checkButton.classList = [`fa fa-check ${styles.green}`]
        checkButton.addEventListener('click', event => sendNewIngredientData(event,
            ingredientNameEl, ingredientListEl, editButton, removeButton, checkButton, cancelButton));

        cancelButton.classList = [`fa fa-ban ${styles.red}`]
        cancelButton.addEventListener('click', event => cancelEditOperation(event,
            ingredientNameEl, ingredientListEl, editButton, removeButton, checkButton, cancelButton));

        buttonBox.appendChild(checkButton);
        buttonBox.appendChild(cancelButton);

        ingredientListEl.querySelectorAll('[ingredient-box]').forEach(ingredientBox => {
            const valueDiv = ingredientBox.querySelector('div:last-child');
            const newInput = ingredientBox.className.includes('info') ? document.createElement('textarea')
                                : document.createElement('input');
            
            newInput.setAttribute('edit-ingredient', ingredientBox.getAttribute('ingredient-box'))
            newInput.classList = [styles['edit-input']];
            newInput.value = valueDiv.innerText;
            ingredientBox.appendChild(newInput);
            valueDiv.classList.add(styles.undisplay);
            
            if (!expanded) setExpanded(true);
            else ingredientListEl.style.height = "";

        });

    }

    const sendNewIngredientData = async (event, ingredientNameEl, ingredientListEl, editButton, removeButton, checkButton, cancelButton) => {
        event.stopPropagation();
        const ingredientSet = event.target.parentElement.parentElement.parentElement;
        const newObject = {}
        ingredientSet.querySelectorAll('[edit-ingredient]').forEach(ingredient => {
            newObject[ingredient.getAttribute('edit-ingredient')] = ingredient.value;
        })

        await modifyIngredientInfo(userId, dietId, mealKey, courseKey, ingredientKey, newObject);
        cancelEditOperation(undefined, ingredientNameEl, ingredientListEl, editButton, removeButton, checkButton, cancelButton);

    }

    return (
        <div className={styles.ingredients}>

            <div className={styles['ingredient-name']} onClick={expand}>
            { hasPerms ? <div className={styles['edit-box']}>
                            <i onClick={editIngredient} className={`fa fa-pencil`} aria-hidden="true"></i>
                            <i onClick={deleteIngredient} className={`fa fa-trash`} aria-hidden="true"></i>
                        </div>
            : undefined}
                <div>{ingredientName}</div>
            </div>

            <div className={styles['ingredient-list-background']} style={expandedStyle} ref={ingredientContent}>

            {!quantity && !hasPerms ? undefined :
            <div className={styles.quantity} ingredient-box='quantity'>
                <div className={styles['ingredient-labels']}>Cantidad</div>
                <div current-value=''>{quantity}</div>
            </div>
            }

            {!brand && !hasPerms ? undefined :
            <div className={styles.brand} ingredient-box='brand'>
                <div className={styles['ingredient-labels']}>Marca</div>
                <div current-value=''>{brand}</div>
            </div>
            }

            {!location && !hasPerms ? undefined :
            <div className={styles.location} ingredient-box='location'>
                <div className={styles['ingredient-labels']}>Localización</div>
                <div current-value=''>{location}</div>
            </div>
            }

            {!info && !hasPerms ? undefined :
            <div className={styles.info} ingredient-box='info'>
                <div className={styles['ingredient-labels']}>Más info</div>
                <div current-value='masinfo'>{info}</div>
            </div>
            }
            </div>

        </div>
    ) 

}

export default Ingredient;