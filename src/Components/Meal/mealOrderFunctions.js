import styles from './Meal.module.css';
import { updateMealOrder } from '../../Database/writeDietInfo';

export const orderMeals = (keyOrderList, userId, dietId, hasPerms) => {

    const mealList = document.querySelectorAll('[meal-order]');
    const mealBox = document.querySelector(`.${styles['meal-box']}`);

    mealBox.innerHTML = '';

    for (let i = 0; i < mealList.length; i++) {

        const node = [...mealList].find(n=>n.getAttribute('meal-order').replace('o', '') === Object.values(keyOrderList)[i].toString());
        node.setAttribute('draggable', false);

        node.addEventListener('dragstart', () => {
            if (node.getAttribute('draggable')==='false') return;
            node.classList.add(styles.dragging)
        });

        node.addEventListener('dragend', async () => {
            node.classList.remove(styles.dragging);
            const newOrderList = getNewOerderValues();
            if (newOrderList === keyOrderList && !hasPerms) return;
            await updateMealOrder(userId, dietId,
                getNewOerderValues());
        });

        mealBox.appendChild(node);
    }

    mealBox.addEventListener('dragover', event => {
        event.preventDefault();
        const detectElementAfter = getDragNode(mealBox, event.clientY);
        const draggable = mealBox.querySelector(`.${styles.dragging}`);
        if (detectElementAfter == null) {
            mealBox.appendChild(draggable);
        } else {
            mealBox.insertBefore(draggable, detectElementAfter);
        }
    })

    const getDragNode = (mealBox, yAxis) => {
        const dragNodes = [...mealBox.querySelectorAll(`[meal-order]:not(.${styles.dragging})`)];
        return dragNodes.reduce((closest, child) => {

            const box = child.getBoundingClientRect();
            const offset = yAxis - box.top - box.height / 2;

            if (offset < 0 && offset > closest.offset) {
              return {
                offset: offset,
                element: child
                }
            } else {
              return closest;
            }

        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

}

export const switchDrag = event => {
    if (!event.target.classList.contains(styles['active-drag-button'])) {
        event.target.classList.add(styles['active-drag-button']);
        event.target.parentElement.parentElement.classList.add(styles['draggable-element']);
    }
    else {
        event.target.classList.remove(styles['active-drag-button']);
        event.target.parentElement.parentElement.classList.remove(styles['draggable-element']);
    }

    const mealEl = event.target.parentElement.parentElement;
    const currentValue = mealEl.getAttribute('draggable') === 'true';
    mealEl.setAttribute('draggable', !currentValue);
}

const getNewOerderValues = () => {
    const mealList = document.querySelectorAll(`.${styles['meal-box']} > [meal-order]`);
    const newOrderList = [];
    [...mealList].forEach(node => {
        newOrderList.push(
            node.getAttribute('meal-order').replace('o', '')
        );
    });
    return newOrderList;
}