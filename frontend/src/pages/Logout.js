import React from 'react';
import { Redirect } from 'react-router-dom';

const Logout = ({appUser, setAppUser}) => {

  if(appUser){
    setAppUser(null);
    return <Redirect to="/"/>;
  }
  return <Redirect to="/" />
}


export default Logout;