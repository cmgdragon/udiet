import React, {useContext, useEffect, useState} from 'react';
import styles from './Diet.module.css';
import Meal from '../Meal';
import { auth } from '../../Services/authProviders';
import { getUserDiets } from '../../Database/readDietInfo';
import { UserContext } from '../../Context/userContext';
import { addNewUserDiet } from '../../Database/writeDietInfo';

const dietObjectDB = {
    isPrivate: false,
    dietName: "dsdsdsadasdadsds",
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
                }
            ]
        }

    ]
}

const Diet = () => {

    const user = useContext(UserContext);
    const [dietUserList, setDietUserList] = useState({});
    const [dietObject, setDietObject] = useState(undefined);

    useEffect(() => {

        //addNewUserDiet(user.uid, dietObjectDB);
        
        getUserDiets(user.uid).then(diets => {
            setDietUserList(diets);
        });


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
            <button onClick={signOut}>Sign out</button>
            <div className={styles.cuerpo}>


                {  dietObject ? <Meal dietObject={dietObject} /> :

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