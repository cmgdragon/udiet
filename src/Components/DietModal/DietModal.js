import React from 'react';
import ReactDOM from 'react-dom';
import styles from './DietModal.module.css';
import { modifyCourseMealInfo } from '../../Database/writeDietInfo';

const DietModal = props => {

    const { shown, closeModal } = props;

    return !shown ? <></> : ReactDOM.createPortal((
        <div className={styles['diet-modal']}>
            <form className={styles['modal-form']}>
                {props.children}
                <div className={styles['button-box']}>
                    <input className={styles.submit} type="submit" value="Enviar" />
                    <div onClick={closeModal} className={styles.cancel}>Cancelar</div>
                </div>
            </form>
        </div>
    ), document.getElementById('diet-modal'));
}

export default DietModal;