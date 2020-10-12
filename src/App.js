import React, { useContext } from 'react';
import DietList from './Components/DietList';
import ViewDiet from './Components/ViewDiet';
import Login from './Components/login';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { UserContext } from './Context/userContext';
import CreateDiet from './Components/CreateDiet';

const PrivateRoute = ({ auth, ...props }) => auth ? <Route {...props} /> : <Route component={Login} />

const App = () => {
  const user = useContext(UserContext);

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

        <PrivateRoute exact auth={user} path='/' component={DietList} />
        <PrivateRoute path='/create' auth={user} component={CreateDiet} />
        <Route path='/:uid/:dietId' render={GetUidAndDietId} />
        <Redirect to='/' />

      </Switch>
         
      </BrowserRouter>
  )

}


export default App;
