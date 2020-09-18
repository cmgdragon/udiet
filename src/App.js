import React, { useContext } from 'react';
import Diet from './Components/Diet';
import Login from './Components/login';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from './Context/userContext';
//import getDiets from '../../../backend/src/controllers/getDietData';

//const dietData = getDiets('carlos.ole@1996gmail.com');

const App = () => {
  const user = useContext(UserContext);

  return (
      <BrowserRouter>
      {console.log("app: "+user.uid)}
      {
        user
        ? <Diet />
        : <Login />
      }    
      </BrowserRouter>
  )

}


export default App;
