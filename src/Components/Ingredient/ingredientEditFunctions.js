import styles from './Ingredient.module.css';
import { modifyIngredientInfo } from '../../Database/writeDietInfo';

const cancelEditOperation = (event, ingredientNameEl, ingredientListEl, editButton, removeButton,
    checkButton, cancelButton, value, setExpanded) => {
    event.stopPropagation();
    const oldNameEl = ingredientNameEl.querySelector(`.${styles.undisplay}:last-child`);
    oldNameEl.classList.remove(styles.undisplay);

    console.log(oldNameEl)
    oldNameEl.innerText = value;
    console.log(oldNameEl)

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

export const editIngredient = (event, userId, dietId, mealKey, courseKey, ingredientKey,
    expanded, setExpanded) => {
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
        userId, dietId, mealKey, courseKey, ingredientKey, nameInput.value, setExpanded));

    cancelButton.classList = [`fa fa-ban ${styles.red}`]
    cancelButton.addEventListener('click', event => cancelEditOperation(event,
        ingredientNameEl, ingredientListEl, editButton, removeButton, checkButton,
        cancelButton, ingredientNameEl.lastChild.textContent, setExpanded));

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

const sendNewIngredientData = async (event, ingredientNameEl, ingredientListEl, editButton, removeButton,
    checkButton, cancelButton, userId, dietId, mealKey, courseKey, ingredientKey, newValue, setExpanded) => {
    event.stopPropagation();
    const ingredientSet = event.target.parentElement.parentElement.parentElement;
    const newObject = {}
    ingredientSet.querySelectorAll('[edit-ingredient]').forEach(ingredient => {
        newObject[ingredient.getAttribute('edit-ingredient')] = ingredient.value;
    })

    await modifyIngredientInfo(userId, dietId, mealKey, courseKey, ingredientKey, newObject);
    cancelEditOperation(event, ingredientNameEl, ingredientListEl, editButton, removeButton,
        checkButton, cancelButton, newValue, setExpanded);

}