import React, { useEffect, useState } from 'react';
import styles from './Diet.module.css';
import Meal from '../Meal';
import { signOut } from '../../Services/authProviders';
import { getUserDiets } from '../../Database/readDietInfo';
import Header from '../Header';
import Addthis from "react-load-script";
import { activateCheck } from '../CreateDiet';
import { setDietPrivateness } from '../../Database/writeDietInfo';
import 'drag-drop-touch';

const ViewDiet = props => {
    const [isPrivate, setIsPrivate] = useState(true);
    const [dietUser, setDietUser] = useState('loading');
    const { currentUser } = props;

    const user = {
        uid: props.ids.uid,
        dietId: props.ids.dietId,
        notLoggedIn: props.ids.notLoggedIn,
        displayName: props.ids.displayName
    };

    useEffect(() => {
        getUserDiets(user.uid).then(diets => {
            setDietUser(getDietUser(diets));
            setIsPrivate(Object.values(diets)[user.dietId]?.isPrivate
             ? Object.values(diets)[user.dietId].isPrivate : false);
        });
        document.getElementById('back-button').classList.remove(styles.invisible);
    }, []);

    const getDietUser = diets => {
        const dietList = diets ? Object.entries(diets) : [];
        return dietList === 0 ? undefined :
            dietList.find(diet => diet[0] === user.dietId) ? 
            dietList.find(diet => diet[0] === user.dietId)[1] : undefined;
    }

    const updateAddthis = () => {
        if (typeof window.addthis?.layers?.refresh === 'function') {
            window.addthis.layers.refresh();
            if (window.addthis_share?.title) {
                window.addthis_share.title = dietUser ? dietUser.dietName : "uDiet";
            }
        }
    }

    const updateDietPrivateness = async event => {
        const check = event.target;
        await setDietPrivateness(user.uid, user.dietId, check.checked);
        window.alert(check.checked ? "La dieta ahora es privada" : "La dieta ahora es pública");
    }

    const hasAccess = () => {
        const collaborators = dietUser.sharedWith ? Object.values(dietUser.sharedWith) : [];
        const isCollaborator = collaborators.includes(currentUser.email);
        return !isPrivate || user.uid === currentUser.uid || isCollaborator
    }

    return (
        <>
        <Header user={user} signOut={signOut} />
        { dietUser === 'loading' ? <div className={styles['loading-spinner']}><i className="fas fa-spinner fa-pulse"></i></div> :
          !dietUser?.mealData ? <div className={styles['error-diet-message']}>Dieta no encontrada</div> :
          hasAccess() ? <>
            <Addthis url='//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5f85dd0fa7c0fa0d'
                onLoad={updateAddthis} />
            <div className={styles.cuerpo}>

                <div className={`addthis_inline_share_toolbox ${styles['addthis-element']}`}></div>

                { user.uid === currentUser.uid ?
                <div className={`${styles.checkboxes} ${styles['is-private']}`}>
                    <input onClick={updateDietPrivateness} id="isprivate" type="checkbox" defaultChecked={isPrivate} />
                    <label onClick={activateCheck}>Hacer privada</label>
                </div>
                : undefined}

                <Meal dietObject={dietUser}
                    dietId={user.dietId}
                    userUid={user.uid}
                    notLoggedIn={user.notLoggedIn}
                />

            </div>
        </> : <div className={styles['error-diet-message']}>¡Esta dieta es privada!</div>}
        </>
    )

}

export default ViewDiet;