import React, { useContext } from 'react';
import Diet from './Components/Diet';
import Login from './Components/login';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from './Context/userContext';
import { getUserDiets } from './Database/readDietInfo';
//import getDiets from '../../../backend/src/controllers/getDietData';

//const dietData = getDiets('carlos.ole@1996gmail.com');

const App = () => {
  const user = useContext(UserContext);

  const getUidAndDietId = () => {
    const url = window.location.href.replace(window.location.origin+'/', '');
    const ids = url.split('/');

    if (ids.length !== 2) {
      return false
    } else {
      return ({
        uid: ids[0],
        dietId: ids[1],
        notLoggedIn: true
      })
    }
    
  }

  return (
      <BrowserRouter>
      {console.log("app: "+user.uid)}
      {
        user || getUidAndDietId()
        ? <Diet ids={getUidAndDietId()} />
        : <Login />
      }    
      </BrowserRouter>
  )

}


export default App;
