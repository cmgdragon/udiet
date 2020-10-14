import React, {useState, useEffect, createContext} from "react";
import { auth } from '../Services/authProviders';

export const UserContext = createContext(false);

const UserAuthContext = (props) => {

    const [user, setUser] = useState(false);

    useEffect(() => {

        auth.onAuthStateChanged(newUser => {
            try {

                const { displayName, email, uid } = newUser;
                setUser({ displayName, email, uid });

            } catch (error) {}
        });
        
    }, []);

    return (
        <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
    )

}

export default UserAuthContext;