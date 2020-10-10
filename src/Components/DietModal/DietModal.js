import React from 'react';
import ReactDOM from 'react-dom';
import styles from './DietModal.module.css';

const DietModal = props => {

    const { shown, closeModal, sendModal } = props;

    return !shown ? <></> : ReactDOM.createPortal((
        <div diet-modal=''>
            <form className={styles['modal-form']} onSubmit={sendModal}>
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