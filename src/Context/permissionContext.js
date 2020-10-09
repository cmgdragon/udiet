import React, {useEffect, createContext, useRef} from "react";
import { userHasEditPermissions } from '../Database/readDietInfo';

export const PermissionContext = createContext(false);

const HasPermissionContext = props => {

    const {userUid, userEmail, dietUserUid, dietId} = props;
    const permissionRef = useRef();

    useEffect(() => {
        userHasEditPermissions(userUid, userEmail, dietUserUid, dietId).then(res => permissionRef.current = res);    
    }, [props]);

    return (
        <div ref={permissionRef}>{props.children}</div>
    )

}

export default HasPermissionContext;