import React, {useEffect, useState} from 'react';
import styles from './Diet.module.css';
import Meal from '../Meal';
import { signOut } from '../../Services/authProviders';
import { getUserDiets } from '../../Database/readDietInfo';
import { Link, Redirect } from 'react-router-dom';
import Header from '../Header';
import Addthis from "react-load-script";

const ViewDiet = props => {
    const [dietUserList, setDietUserList] = useState({});

    const user = {
        uid: props.ids.uid,
        dietId: props.ids.dietId,
        notLoggedIn: props.ids.notLoggedIn,
        displayName: props.ids.displayName
    };

    useEffect(() => {
    
        getUserDiets(user.uid).then(diets => {
            setDietUserList(diets);
        });
        
    }, []);

    const updateAddthis = () => {
        if (typeof window?.addthis?.layers?.refresh === 'function') {
            window.addthis.layers.refresh();
            if (window?.addthis_share?.title) {
                window.addthis_share.title = Object.values(dietUserList)[user.dietId] ? Object.values(dietUserList)[user.dietId].dietName : "uDiet";
            }
        }
    }

    return (
        <>
           <Addthis url='//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5f85dd0fa7c0fa0d'
            onLoad={updateAddthis()} />
            <Header user={user} signOut={signOut}/>
            <div className={styles.cuerpo}>

            <div className={`addthis_inline_share_toolbox ${styles['addthis-element']}`}></div>

                {
                  !dietUserList ? <Redirect to='/' /> :

                   Object.values(dietUserList)[user.dietId] &&
                   Object.values(dietUserList)[user.dietId].isPrivate ? <strong>¡Esta dieta es privada!</strong> :
                    
                   Object.values(dietUserList)[user.dietId] ?
                    <Meal dietObject={Object.values(dietUserList)[user.dietId]} 
                    dietId={user.dietId} 
                    userUid={user.uid} 
                    notLoggedIn={user.notLoggedIn}
                     />

                : undefined}

            </div>
        </>
    ) 

}

export default ViewDiet;