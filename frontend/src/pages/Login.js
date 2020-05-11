import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Login = ({appUser, setAppUser}) => {
  const[username, setUsername] = React.useState('');
  const[password, setPassword] = React.useState('');
  const[error, setError]       = React.useState('');
  
 // body will send to axios 
  const handleAuth = () => {
    const body = {
      username: username,
      password: password,
    };
    axios.post('/api/authenticate', body)
      .then((res) => {
        console.log(res.data); // dto coming from spark
        if(res.data.success){
          console.log('Worked!');
          setAppUser(username); //trigger page change
        }else{
          setError(res.data.error);
        }
      })    
      .catch(() => {
        setError("Failed to register");
    });
  };
  // if appUser is exist, redict to userpage
  if(appUser){
    return <Redirect to="/userpage"/>;
  }
  
 // e: event object once you click the bottom
 // if error is not empty or null, print Error variable
 // disbled: input name and pass, then you can submit
  return (
    <body class="text-center">
    <form class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputUsername" class="sr-only">Username</label>
        <input 
          type="username"
          id="inputUsername"
          class="form-control"
          placeholder="Username"
          required autofocus
          value={username}
          onChange = {e => setUsername(e.target.value)} 
        />

      <label for="inputPassword" class="sr-only">Password</label>
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          required
          value={password}
          onChange = {e => setPassword(e.target.value)} 
        />
      <button class="btn btn-lg btn-primary btn-block"
      type="Submit"
      disabled={!username || !password} onClick={handleAuth}>Sign in</button>
       
      {error && <strong>{error}</strong>}
      <p class="mt-5 mb-3 text-muted">(c) Homebrewers 2020</p>
      
    </form>
    </body>
  );
};


export default Login;
