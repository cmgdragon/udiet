import React from 'react';
import ReactDOM from 'react-dom';
import styles from './DietModal.module.css';

const DietModal = props => {

    const { shown, sendModal, closeFn } = props;

    if (shown)
        document.body.setAttribute('style', 'overflow:hidden;')


    return !shown ? '' : ReactDOM.createPortal((
        <div diet-modal=''>
            <form className={styles['modal-form']} onSubmit={event => {
                event.preventDefault();
                if (window.confirm('¿Quieres enviar estos datos?')) { 
                    sendModal();
                    document.body.removeAttribute('style');
                    closeFn(false);
                }
            }}>
                {props.children}
                <div className={styles['button-box']}>
                    <input className={styles.submit} type="submit" value="Enviar" />
                    <div onClick={() => {
                        if (window.confirm('¿Quieres cancelar esta acción?')) { 
                            document.body.removeAttribute('style');
                            closeFn(false);
                        }
                    }}
                    className={styles.cancel}>Cancelar</div>
                </div>
            </form>
        </div>
    ), document.getElementById('diet-modal'));
}

export const DietUsersModal = props => {

    const { shown, sharedUsersDiet, closeModal, promptModal, removeUser } = props;

    if (shown)
        document.body.setAttribute('style', 'overflow:hidden;')


    return !shown ? '' : ReactDOM.createPortal((
    <>
        <div diet-modal='' onClick={event => {
            event.stopPropagation();
            document.body.removeAttribute('style');
            closeModal();
            }}>
        </div>
        <div className={styles['modal-users-buttons']}>
            <i className={`fa fa-times ${styles['modal-users-close']}`} onClick={() => { 
                document.body.removeAttribute('style');
                closeModal(); 
            }}></i>
            <div onClick={promptModal} className={styles['modal-users-add']}>Añadir editor</div>
        </div>
        <div className={styles['modal-users']}>

            {
                sharedUsersDiet ? Object.values(sharedUsersDiet).map((user, index) => {
                    return (
                        <div className={styles['modal-users-list']} key={index}>
                            <div className={styles['modal-user-list-item']}>{user}</div>        
                            <i onClick={removeUser} className={`fa fa-trash ${styles['remove-user']}`}></i>
                        </div>
                    )
                }) : undefined
            }
        </div>
    </>
    ), document.getElementById('diet-modal'));
}

export const ImageModal = props => {

    const { dataShown, closeModal } = props;
    const { shown, image, imageName } = dataShown;

    if (shown)
        document.body.setAttribute('style', 'overflow:hidden;')

    return !shown ? '' : ReactDOM.createPortal((
    <>
        <div diet-modal='' onClick={event => {
            event.stopPropagation();
            document.body.removeAttribute('style');
            closeModal({...dataShown, shown : false});
            }}>
              <div className={styles['image-content']}><img src={image} alt={imageName} /></div>
        </div>
    </>
    ), document.getElementById('diet-modal'));
}

export default DietModal;