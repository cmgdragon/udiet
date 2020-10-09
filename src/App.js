import React, { useContext } from 'react';
import DietList from './Components/DietList';
import ViewDiet from './Components/ViewDiet';
import Login from './Components/login';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { UserContext } from './Context/userContext';
import CreateDiet from './Components/CreateDiet';

const App = () => {
  const user = useContext(UserContext);

  const LoginOrShowDietList = () => {

    return (
      <>
      {
        user ? <DietList /> : <Login />
      }
      </>
    )
    
  }

  const LoginOrCreateDiet = () => {

    return (
      <>
      {
        user ? <CreateDiet /> : <Login />
      }
      </>
    )
    
  }

  const GetUidAndDietId = ({ match }) => {

    return (
      <>
      {
        match ? <ViewDiet ids={{
          uid: match.params.uid,
          dietId: match.params.dietId,
          displayName: user.displayName,
          notLoggedIn: user ? false : true
        }}/> : <DietList />
      }
      </>
    )
    
  }

  return (
      <BrowserRouter>
      {console.log("app: "+user.uid)}
      <Switch>

        <Route exact path='/' render={LoginOrShowDietList} />
        <Route path='/create' component={LoginOrCreateDiet} />
        <Route path='/:uid/:dietId' render={GetUidAndDietId} />
        <Redirect to='/' />

      </Switch>
         
      </BrowserRouter>
  )

}


export default App;
