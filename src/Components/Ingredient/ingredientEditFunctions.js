import styles from './Ingredient.module.css';
import { modifyIngredientInfo } from '../../Database/writeDietInfo';

const cancelEditOperation = (event, ingredientNameEl, ingredientListEl, editButton, removeButton,
    checkButton, cancelButton, value, setExpanded, isUploadOperation, setIsEmptyIngredient) => {
    event.stopPropagation();
    const oldNameEl = ingredientNameEl.querySelector(`.${styles.undisplay}:last-child`);
    oldNameEl.classList.remove(styles.undisplay);

    oldNameEl.innerText = value;
    ingredientNameEl.querySelector('input').remove();


    let hasIngredients;
    
    ingredientListEl.classList.remove(styles['force-box-padding']);
    ingredientListEl.querySelectorAll('[ingredient-box]').forEach(ingredientBox => {

        const valueInput = ingredientBox.querySelector('input') || ingredientBox.querySelector('textarea');
        const oldValueDiv = ingredientBox.querySelector(`[current-value].${styles.undisplay}`);

        if (isUploadOperation) {
            if (!hasIngredients && valueInput.value !== '')
                hasIngredients = true;
            if (valueInput.value === '')
                ingredientBox.classList.add(styles.undisplay);
            oldValueDiv.innerText = valueInput.value;
        } else {
            if (oldValueDiv.innerText === '')
            ingredientBox.classList.add(styles.undisplay);
        }

        oldValueDiv.classList.remove(styles.undisplay);
        valueInput.remove();

    });

    if (setIsEmptyIngredient) setIsEmptyIngredient(hasIngredients);
    checkButton.remove();
    cancelButton.remove();
    editButton.classList.remove(styles.undisplay);
    removeButton.classList.remove(styles.undisplay);
    setExpanded(false);

}

export const editIngredient = (event, userId, dietId, mealKey, courseKey, ingredientKey,
    expanded, setExpanded, setHasIngredients) => {
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
        ingredientNameEl, ingredientListEl, editButton, removeButton, checkButton, cancelButton,
        userId, dietId, mealKey, courseKey, ingredientKey, nameInput.value, setExpanded, setHasIngredients));

    cancelButton.classList = [`fa fa-ban ${styles.red}`]
    cancelButton.addEventListener('click', event => cancelEditOperation(event,
        ingredientNameEl, ingredientListEl, editButton, removeButton, checkButton,
        cancelButton, ingredientNameEl.lastChild.textContent, setExpanded, false));

    buttonBox.appendChild(checkButton);
    buttonBox.appendChild(cancelButton);

    ingredientListEl.classList.add(styles['force-box-padding']);
    ingredientListEl.querySelectorAll('[ingredient-box]').forEach(ingredientBox => {

        ingredientBox.classList.remove(styles.undisplay);
        const valueDiv = ingredientBox.querySelector('[current-value]');
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

const sendNewIngredientData = async (event, ingredientNameEl, ingredientListEl, editButton, removeButton,
    checkButton, cancelButton, userId, dietId, mealKey, courseKey, ingredientKey, newValue, setExpanded, setHasIngredients) => {
    event.stopPropagation();
    const ingredientSet = event.target.parentElement.parentElement.parentElement;
    const newObject = {}
    ingredientSet.querySelectorAll('[edit-ingredient]').forEach(ingredient => {
        newObject[ingredient.getAttribute('edit-ingredient')] = ingredient.value;
    })

    await modifyIngredientInfo(userId, dietId, mealKey, courseKey, ingredientKey, newObject);
    cancelEditOperation(event, ingredientNameEl, ingredientListEl, editButton, removeButton,
        checkButton, cancelButton, newValue, setExpanded, true, setHasIngredients);

}