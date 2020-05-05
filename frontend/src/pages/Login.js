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
    <div>
      <h1>Login</h1>
      <div>
        <input
          value={username}
          onChange = {e => setUsername(e.target.value)} 
        />
      </div>

      <div>
        <input
          type="password"
          value={password}
          onChange = {e => setPassword(e.target.value)} 
        />
      </div>

      <div>
        <button disabled={!username || !password} onClick={handleAuth}>Login</button>
      </div> 
      {error && <strong>{error}</strong>}
    </div>
  );
};


export default Login;
