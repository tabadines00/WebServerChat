import React from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Signup from './pages/Signup';
import UserPage from './pages/UserPage';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from './logo.svg';

const App = () => {
  // the user that is use up right now
  // && logout and login
  const [appUser, setAppUser] = React.useState(null); //sticks until refresh or logout

  return (
    <div>
      <Navbar bg="dark" expand="lg" className="m-3 d-flex justify-content-left">
            <Navbar.Brand>
              <Link to="/">
                <img
                  src={Logo}
                  width="35"
                  height="35"
                  className="d-inline-block align-top"
                  alt="logo"
                />
              </Link>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">

            <Nav>
            
            <Link className="d-inline p-2 bg-dark text-white"
            to="/"> Home </Link>
            {appUser  && <Link className="d-inline p-2 bg-dark text-white"
            to="/logout"> Log out </Link>}
            {!appUser && <Link className="d-inline p-2 bg-dark text-white"
            to="/login"> Log in </Link>}
            {!appUser && <Link className="d-inline p-2 bg-dark text-white"
            to="/signup"> Sign up</Link>}
            {appUser  && <Link className="d-inline p-2 bg-dark text-white"
            to="/userpage"> User page</Link>}
            
            </Nav>
            </Navbar.Collapse>
        </Navbar>
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
          <Home appUser={appUser} setAppUser={setAppUser} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;