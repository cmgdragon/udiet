import styles from './MealOption.module.css';
import { changeCourseMealName, modifyCourseMealInfo } from '../../Database/writeDietInfo';

const cancelEditNameOperation = (elementToShow, elementToDelete, text) => {
    elementToDelete.remove();
    elementToShow.classList.remove(styles.undisplay);
    elementToShow.firstChild.innerText = text;
}

const updateCourseMealName = async (userUid, dietId, mealKey, courseKey, currentTitle, inputWrapper, newName) => {
    await changeCourseMealName(userUid, dietId, mealKey, courseKey, newName);
    cancelEditNameOperation(currentTitle, inputWrapper, newName);
}

export const editCourseMealName = (event, userId, dietId, mealKey, courseKey) => {

    const currentTitle = event.target.parentElement.parentElement;
    const parentEl = event.target.parentElement.parentElement.parentElement;
    const newInput = document.createElement('input');

    const inputWrapper = document.createElement('div');
    const editBox = document.createElement('div');
    inputWrapper.classList.add(styles['coursemeal-input-wrapper']);
    const oldText = parentEl.querySelector('span').innerText;

    const checkButton = document.createElement('i');
    const cancelButton = document.createElement('i');
    checkButton.classList = [`fa fa-check ${styles.green}`]
    checkButton.addEventListener('click', async () => updateCourseMealName(userId, dietId, mealKey,
        courseKey, currentTitle, inputWrapper, newInput.value));

    cancelButton.classList = [`fa fa-ban ${styles.red}`]
    cancelButton.addEventListener('click', () => cancelEditNameOperation(currentTitle,
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

const cancelEditOperation = (contentEl, newTextarea, editBox, checkButton, cancelButton, content) => {
    newTextarea.remove();
    contentEl.classList.remove(styles.hiddenEl);
    editBox.classList.remove(styles.visibleEl);
    editBox.style.bottom = "";
    editBox.style.left = "92%";
    contentEl.querySelector('p').innerText = content;
    checkButton.remove();
    cancelButton.remove();
    editBox.querySelector('i').classList.remove(styles.undisplay);
}

export const editMealInfo = (event, userUid, dietId, mealKey, courseKey) => {
    const newTextarea = document.createElement('textarea');
    const contentEl = event.target.parentElement.parentElement;
    const editBox = event.target.parentElement;
    const oldText = contentEl.lastChild.textContent;
    newTextarea.value = oldText;
    contentEl.lastChild.textContent = "";

    contentEl.appendChild(newTextarea);
    newTextarea.select();
    contentEl.classList.add(styles.hiddenEl);
    editBox.classList.add(styles.visibleEl);

    newTextarea.classList.add(styles.visibleEl);

    const checkButton = document.createElement('i');
    const cancelButton = document.createElement('i');
    checkButton.classList = [`fa fa-check ${styles.green}`]
    checkButton.addEventListener('click', event => sendNewMealInfo(event,
        contentEl, newTextarea, editBox, checkButton, cancelButton, newTextarea.value,
        userUid, dietId, mealKey, courseKey));

    cancelButton.classList = [`fa fa-ban ${styles.red}`]
    cancelButton.addEventListener('click', () => cancelEditOperation(contentEl,
        newTextarea, editBox, checkButton, cancelButton, oldText));

    event.target.classList.add(styles.undisplay);
    editBox.prepend(checkButton);
    editBox.appendChild(cancelButton);
}

const sendNewMealInfo = async (event, contentEl, newTextarea, editBox, checkButton, cancelButton, content,
    userUid, dietId, mealKey, courseKey) => {
    const property = Array.from(event.target.parentElement.parentElement.attributes)
        .find(a => a.name === "coursemeal-info").value;
    const newContent = event.target.parentElement.nextElementSibling.nextElementSibling.value;
    await modifyCourseMealInfo(userUid, dietId, mealKey, courseKey, property, newContent);
    cancelEditOperation(contentEl, newTextarea, editBox, checkButton, cancelButton, content);
}