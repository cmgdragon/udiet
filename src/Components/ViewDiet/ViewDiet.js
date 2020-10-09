import React, {useContext, useEffect, useState} from 'react';
import styles from './Diet.module.css';
import Meal from '../Meal';
import { signOut } from '../../Services/authProviders';
import { getUserDiets } from '../../Database/readDietInfo';
import { UserContext } from '../../Context/userContext';
import { Link, Redirect } from 'react-router-dom';

const ViewDiet = props => {
    const [dietUserList, setDietUserList] = useState({});
    const [dietObject, setDietObject] = useState(undefined);
    const userContext = useContext(UserContext);

    console.log(props, userContext)
    const user = {
        uid: props.ids.uid,
        dietId: props.ids.dietId,
        notLoggedIn: props.ids.notLoggedIn,
        displayName: props.ids.displayName
    };

    useEffect(() => {
    
        getUserDiets(user.uid).then(diets => {
            
            setDietUserList(diets);
            
            console.log(props, dietObject)
            if (user.notLoggedIn)  {
                setDietObject(Object.values(dietUserList)[user.dietId]);
            }

        });

    }, []);

    return (
        <>
           
            <div className={styles.userbuttons}>
                <Link to={'/'} id="back-button" className={`fa fa-arrow-left ${styles.goback}`} aria-hidden="true"></Link>
                <button className={styles.logout} onClick={signOut}>Sign out ({user.displayName})</button>
            </div>
            <div className={styles.cuerpo}>

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