import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import styles from './Diet.module.css';
import Meal from '../Meal';
import { auth } from '../../Services/authProviders';
import { getUserDiets } from '../../Database/readDietInfo';
import { UserContext } from '../../Context/userContext';
import { addNewUserDiet } from '../../Database/writeDietInfo';

const dietObjectDB = {
    isPrivate: false,
    dietName: "testets",
    mealData: [
        {
            name: "Merienda",
            courseMeals: [
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments"
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments"
                },
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments"
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments"
                },
                {
                    name: "course 1",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments"
                },
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz22",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments"
                }
            ]
        },

        {
            name: "Merienda2",
            courseMeals: [
                {
                    name: "course 2",
                    properties: "propiedades",
                    ingredients: [
                        {
                            name: "arroz2",
                            quantity: "80g",
                            location: "Soli Corbera",
                            brand: "Marca",
                            info: "más info"
                        }
                    ],
                    recipe: "preparación",
                    comments: "comments"
                }
            ]
        }

    ]
}

const Diet = props => {

    const [dietUserList, setDietUserList] = useState({});
    const [dietObject, setDietObject] = useState(undefined);
    const userContext = useContext(UserContext);

    const user = userContext ? userContext : {
        uid: props.ids.uid,
        dietId: props.ids.dietId
    };
    
    useEffect(() => {
        
        //addNewUserDiet(user.uid, dietObjectDB);

       (async()=>{
            const dietlist = await getUserDiets(user.uid);
            setDietUserList(dietlist);
        })();

        if (user.dietId) {
            setDietObject(Object.values(dietUserList)[user.dietId]);
        }

    }, []);


    const signOut = async () => {
    
        try {
            await auth.signOut();
            console.log('Logged out')
            window.location.reload();
        } catch (error) {
            console.log(error.message)
        }
    
    }

    const selectDiet = index => {
        setDietObject(Object.values(dietUserList)[index]);
    }

    return (
        <>
           { user.notLoggedIn ? undefined : <button onClick={signOut}>Sign out</button>}
            <div className={styles.cuerpo}>

                {  dietObject ? <Meal dietObject={dietObject} /> :
                   Object.values(dietUserList)[user.dietId] ? <Meal dietObject={Object.values(dietUserList)[user.dietId]} /> :

                    Object.values(dietUserList).map((diet, index) => {
                        return (
                            <div key={index} 
                            className={styles['diet-list-item']}
                            onClick={() => selectDiet(index)} >{diet.dietName}</div>
                        )
                    })
                }

            </div>
        </>
    ) 

}

export default Diet;