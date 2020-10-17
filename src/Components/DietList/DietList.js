import React, { useContext, useEffect, useState } from 'react';
import styles from '../ViewDiet/Diet.module.css';
import { signOut } from '../../Services/authProviders';
import { getUserDiets, getDietSharedUsers, getSharedDiets } from '../../Database/readDietInfo';
import { UserContext } from '../../Context/userContext';
import { Link } from 'react-router-dom';
import { modifyDietSharedUsers, modifyDietUserSharedList } from '../../Database/writeDietInfo';
import { deleteUserDiet } from '../../Database/deleteDietInfo';
import { DietUsersModal } from '../DietModal';
import Skeleton from 'react-loading-skeleton';
import Header from '../Header';

const Diet = props => {

    const [sharedUsersDiet, setSharedUsersDiet] = useState(undefined);
    const [modalShown, setModalShown] = useState(false);
    const userContext = useContext(UserContext);

    const user = userContext;
    const [dietUserList, setDietUserList] = useState('loading');
    const [dietSharedList, setDietSharedList] = useState('loading');

    const getSharedDietsByEmail = async email => {

        try {
            const sharedDiets = await getSharedDiets() || {};
            setDietSharedList(
                Object.values(sharedDiets).filter(shared => shared.email === email)
            );
        } catch (error) {
            console.error(error);
        }

    }

    const filterSharedDietsByUserIdAndDietId = async dietId => {

        try {
            const sharedDiets = await getSharedDiets() || {};

            return Object.values(sharedDiets).filter(shared => shared.dietUserUid === user.uid
                    && shared.dietId !== dietId)

        } catch (error) {
            console.error(error);
        }

    }

    const getDietUserList = async userUid => setDietUserList(await getUserDiets(userUid));

    useEffect(() => {

        getDietUserList(user.uid);
        getSharedDietsByEmail(user.email);

    }, []);

    const removeDiet = async (event, dietId) => {
        if (window.confirm('¿Quieres borrar esta dieta?')) {
            event.target.classList = [`fas fa-spinner fa-pulse ${styles['remove-diet']}`];
            deleteUserDiet(user.uid, dietId).then(re => window.location.reload());
            const updatedUserDietList = await filterSharedDietsByUserIdAndDietId(dietId);
            await modifyDietSharedUsers(updatedUserDietList);
        }
    }

    const closeSharedUsersModal = () => setModalShown(false);

    const showSharedUsersModal = async dietId => {
        const sharedUsers = await getDietSharedUsers(user.uid, dietId) || {};
        setSharedUsersDiet(sharedUsers);
        setModalShown(true);
    }

    const addNewSharedUserDiet = async (userId, dietId, dietName) => {
        const email = window.prompt("Introduce el email del usuario con el que quieres compartir esta dieta");

        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (Object.values(sharedUsersDiet).includes(email)) {
            alert('¡Este usuario ya tiene acceso!');

        } else if (email && emailRegex.test(email)) {
            const newList = sharedUsersDiet ? Object.values(sharedUsersDiet) : [];
            newList.push(email);
            await modifyDietUserSharedList(userId, dietId, newList);

            const oldSharedDiets = await getSharedDiets() || {};
            const sharedDietLength = Object.values(oldSharedDiets).length;

            const newKey = sharedDietLength === 0 ? 0 :
                Object.keys(oldSharedDiets).includes(`${sharedDietLength}`) ? sharedDietLength + 1 :
                    sharedDietLength;

            await modifyDietSharedUsers({
                ...oldSharedDiets,
                [newKey]: {
                    dietId,
                    dietName,
                    dietUserUid: user.uid,
                    email
                }
            });

            setSharedUsersDiet(newList);
        } else {
            if (!email) return;
            alert('Email inválido');
        }

    }

    const removeSharedUserDiet = async (event, userId, dietId) => {

        const email = event.target.previousElementSibling.innerText;
        if (window.confirm(`¿Quieres eliminar a ${email} de la lista de editores?`)) {
            const newList = sharedUsersDiet ? Object.values(sharedUsersDiet) : [];
            const userIndex = newList.findIndex(u => u === email);
            newList.splice(userIndex, 1);
            await modifyDietUserSharedList(userId, dietId, newList);

            const sharedDiets = Object.values(await getSharedDiets()) || [];

            const deleteIndex = sharedDiets.findIndex(shared =>
                shared.email === email &&
                shared.dietUserUid === userId &&
                shared.dietId === dietId
            );

            delete sharedDiets[
                Object.keys(sharedDiets)[deleteIndex]
            ];

            await modifyDietSharedUsers(sharedDiets);

            setSharedUsersDiet(newList);
        }

    }

    return (
        <>
            <Header user={user} signOut={signOut} />
            <div className={styles.cuerpo}>
                <Link to={'/create'} id="create-diet" className={styles['create-diet']} >Crear una nueva dieta</Link>
                <div className={styles['my-diets-label']}>Mis dietas</div>
                <div className={styles['my-diets-label-border-bottom']}></div>
                {dietUserList === 'loading' ? <Skeleton height={100} duration={.3} /> : !dietUserList ? undefined :
                    Object.values(dietUserList).map(({ dietName }, dietId) => {
                        return (
                            <React.Fragment key={dietId}>
                                <DietUsersModal
                                    shown={modalShown}
                                    closeModal={closeSharedUsersModal}
                                    sharedUsersDiet={sharedUsersDiet}
                                    promptModal={() => addNewSharedUserDiet(user.uid, dietId, dietName)}
                                    removeUser={event => removeSharedUserDiet(event, user.uid, dietId)}
                                />
                                {
                                    <div className={styles['diet-list']}>
                                        <Link to={`/${user.uid}/${dietId}`}
                                            className={styles['diet-list-item']} >
                                            {dietName}
                                        </Link>
                                        <div className={styles['diet-item-buttons']}>
                                            <i className={`fa fa-user ${styles['share-diet']}`}
                                                aria-hidden="true"
                                                onClick={() => showSharedUsersModal(dietId)} ></i>
                                            <i className={`fa fa-trash ${styles['remove-diet']}`}
                                                aria-hidden="true"
                                                onClick={(event) => removeDiet(event, dietId)} ></i>
                                        </div>
                                    </div>
                                }
                            </React.Fragment>
                        )
                    })
                }

                <div className={`${styles['my-diets-label']} ${styles['my-shared-label']}`}>Compartidas conmigo</div>
                <div className={styles['my-diets-label-border-bottom']}></div>
                {dietSharedList === 'loading' ? <Skeleton height={100} duration={.3} /> : !dietSharedList ? undefined :
                    Object.values(dietSharedList).map(({ dietName, dietUserUid, dietId }, index) => {
                        return (
                            <React.Fragment key={index}>
                                {
                                    <div className={styles['diet-list']}>
                                        <Link to={`/${dietUserUid}/${dietId}`}
                                            className={styles['diet-list-item']} >
                                            {dietName}
                                        </Link>
                                    </div>
                                }
                            </React.Fragment>
                        )
                    })
                }

            </div>
        </>
    )

}

export default Diet;