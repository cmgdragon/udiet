import styles from './Meal.module.css';
import { changeDietName, changeMealName } from '../../Database/writeDietInfo';

const cancelDietEditOperation = (elementToShow, elementToDelete, text) => {
    elementToDelete.remove();
    elementToShow.classList.remove(styles.undisplay);
    elementToShow.firstChild.innerText = text;
}

const updateDietName = async (userUid, dietId, currentTitle, inputWrapper, newName) => {
    await changeDietName(userUid, dietId, newName);
    cancelDietEditOperation(currentTitle, inputWrapper, newName);
}

const updateMealName = async (userUid, dietId, mealKey, currentTitle, inputWrapper, newName) => {
    await changeMealName(userUid, dietId, mealKey, newName);
    cancelDietEditOperation(currentTitle, inputWrapper, newName);
}

export const editDietName = (event, userId, dietId) => {
        
    const currentTitle = event.target.parentElement;
    const parentEl = event.target.parentElement.parentElement;
    const newInput = document.createElement('input');

    const inputWrapper = document.createElement('div');
    const editBox = document.createElement('div');
    inputWrapper.classList.add(styles['diet-input-wrapper']);
    const oldText = parentEl.querySelector('span').innerText;

    const checkButton = document.createElement('i');
    const cancelButton = document.createElement('i');
    checkButton.classList = [`fa fa-check ${styles.green}`]
    checkButton.addEventListener('click', async () => updateDietName(userId, dietId,currentTitle,
        inputWrapper, newInput.value));

    cancelButton.classList = [`fa fa-ban ${styles.red}`]
    cancelButton.addEventListener('click', () => cancelDietEditOperation(currentTitle,
        inputWrapper, oldText));

    editBox.prepend(checkButton);
    editBox.appendChild(cancelButton);

    inputWrapper.appendChild(newInput);
    inputWrapper.appendChild(editBox);
    newInput.value = oldText;
    newInput.select();
    parentEl.prepend(inputWrapper);
    
    currentTitle.classList.add(styles.undisplay);
    newInput.select();

}

export const editMealName = (event, userId, dietId, mealKey) => {
        
    const currentTitle = event.target.parentElement;
    const parentEl = event.target.parentElement.parentElement;
    const newInput = document.createElement('input');

    const inputWrapper = document.createElement('div');
    const editBox = document.createElement('div');
    inputWrapper.classList.add(styles['meal-input-wrapper']);
    const oldText = parentEl.querySelector('span').innerText;

    const checkButton = document.createElement('i');
    const cancelButton = document.createElement('i');
    checkButton.classList = [`fa fa-check ${styles.green}`]
    checkButton.addEventListener('click', async () => updateMealName(userId, dietId, mealKey, 
        currentTitle, inputWrapper, newInput.value));

    cancelButton.classList = [`fa fa-ban ${styles.red}`]
    cancelButton.addEventListener('click', () => cancelDietEditOperation(currentTitle,
        inputWrapper, oldText));

    editBox.prepend(checkButton);
    editBox.appendChild(cancelButton);

    inputWrapper.appendChild(newInput);
    inputWrapper.appendChild(editBox);
    newInput.value = oldText;
    newInput.select();
    parentEl.prepend(inputWrapper);
    
    currentTitle.classList.add(styles.undisplay);
    newInput.select();

}