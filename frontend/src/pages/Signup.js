import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

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
      setError("Failed. Passwords do not match!");
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

  const keyPressed = (event) => {
    if (event.key === "Enter") {
      handleAuth();
    }
  }

  const buttonStyle = () => {
    if (!username || !password) {
      return ("");
    } else {
      return ("btnHover");
    }
  }

  // if appUser is exist, redict to userpage
  if(appUser){
    return <Redirect to="/login" />;
  }


  
 // e: event object once you click the bottom
 // if error is not empty or null, print Error variable
 // disbled: input name and pass, then you can submit
  return (
    <div className="text-center">
    <div className="form-signin">
    <h1 className="h3 mb-3 font-weight-normal"> Please sign up</h1>
      <label htmlFor="inputUsername" className="sr-only">Username</label>
        <input
          type="username"
          id="inputUsername"
          className="form-control"
          placeholder="Username"
          required autoFocus
          value={username}
          onKeyPress={keyPressed}
          onChange = {e => setUsername(e.target.value)} 
          />
      <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
          value={password}
          onKeyPress={keyPressed}
          onChange = {e => setPassword(e.target.value)} 
        />
      

      <label htmlFor="inputPassword" className="sr-only">Confirm Password</label>
        <input
          type="password"
          id="inputConfirmPassword"
          className="form-control"
          placeholder="Confirm Password"
          required
          value={confirmPass}
          onKeyPress={keyPressed}
          onChange = {e => setConfirmPass(e.target.value)} 
        />
        

      <button className={"btn btn-lg btn-primary btn-block " + buttonStyle()}
      type="Submit" 
      disabled={!username || !password || !confirmPass} onClick={handleAuth}> Sign Up</button>

      <div> 
      {error && <strong>{error}</strong>}</div>
      <Link to="/login">Already have an account?</Link> 
  
      </div>
    </div>
    
  );
};

export default Signup;
