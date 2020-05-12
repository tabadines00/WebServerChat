import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Signup = ({appUser, setAppUser}) => {
  const[username, setUsername] = React.useState('');
  const[password, setPassword] = React.useState('');
  const[confirmPass, setConfirmPass] = React.useState('');
  const[error, setError]       = React.useState('');

  var alphanumeric = /^[a-zA-Z0-9]*$/;
  
 // body will send to axios 
  const handleAuth = () => {
    if(password === confirmPass) {
      if(sanitizeInput()) {
        const body = {
          username: username,
          password: password,
        };
        axios.post('/api/register', body)
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
      }
    } else {
      setError("Failed to register, passwords do not match!");
    }
  };

  // May use later
  const sanitizeInput = () => {
    if(!alphanumeric.test(username)) {
      setError("Invalid Username! Alphanumeric characters only");
      return false;
    }
    return true;
  }

  // if appUser is exist, redict to userpage
  if(appUser){
    return <Redirect to="/login" />;
  }
  
 // e: event object once you click the bottom
 // if error is not empty or null, print Error variable
 // disbled: input name and pass, then you can submit
  return (
    <div className="container">
      <h1>Signup Page</h1>
      <div>
        Username:
        <input
          value={username}
          onChange = {e => setUsername(e.target.value)} 
        />
      </div>

      <div>
        Password: 
        <input
          type="password"
          value={password}
          onChange = {e => setPassword(e.target.value)} 
        />
      </div>

      <div>
        Confirm Password: 
        <input
          type="password"
          value={confirmPass}
          onChange = {e => setConfirmPass(e.target.value)} 
        />
      </div>

      <div>
        <button disabled={!username || !password || !confirmPass} onClick={handleAuth}>Sign Up</button>
      </div> 
      {error && <strong>{error}</strong>}
    </div>
  );
};

export default Signup;
