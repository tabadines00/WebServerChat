import React from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Signup from './pages/Signup';
import UserPage from './pages/UserPage';

const App = () => {
  // the user that is use up right now
  // && logout and login
  const [appUser, setAppUser] = React.useState(null); //sticks until refresh or logout

  return (
    <div>
      <nav>
        <Link to="/"> Home |</Link>
        {appUser  && <Link to="/logout"> Log out |</Link>}
        {!appUser && <Link to="/login"> Log in |</Link>}
        {!appUser && <Link to="/signup"> Sign up</Link>}
        {appUser  && <Link to="/userpage"> User page</Link>}
      </nav>
      {appUser && <h2> Welcome {appUser}</h2>}
      <Switch>
        <Route path="/login">
          <Login appUser={appUser} setAppUser={setAppUser}/>
        </Route>

        <Route path="/logout">
          <Logout appUser={appUser} setAppUser={setAppUser}/>
        </Route>
        
        <Route path="/signup">
          <Signup appUser={appUser} setAppUser={setAppUser}/>
        </Route>
        
        <Route path="/userpage">
          <UserPage appUser={appUser} setAppUser={setAppUser}/>
        </Route>
        
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
};

export default App;