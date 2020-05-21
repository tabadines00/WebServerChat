import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Login = ({ appUser, setAppUser }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  var alphanumeric = /^[a-zA-Z0-9]*$/;
  //var alphaSpecial = /^([^0-9]*|[^A-Z]*|[a-zA-Z0-9]*)$/; //finds invalid password and will negate it

  // body will send to axios 
  const handleAuth = () => {
    if (sanitizeInput()) {
      const body = {
        username: username,
        password: password,
      };
      axios.post('/api/authenticate', body)
        .then((res) => {
          console.log(res.data); // dto coming from spark
          if (res.data.success) {
            console.log('Worked!');
            setAppUser(username); //trigger page change
          } else {
            setError(res.data.error);
          }
        })
        .catch(() => {
          setError("Failed to register");
        });
    }
  };

  // May use later
  const sanitizeInput = () => {
    if (!alphanumeric.test(username)) {
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
  if (appUser) {
    return <Redirect to="/userpage" />;
  }

  // e: event object once you click the bottom
  // if error is not empty or null, print Error variable
  // disbled: input name and pass, then you can submit
  return (
    <div className="text-center">
      <style>{"\
        .signintext{\
          margin: 1rem !important;\
          font-weight: 400 !important;\
        }\
        .inputtab{\
          position: absolute;\
          width: 1px;\
          height: 1px;\
          padding: 0;\
          margin: -1px;\
          overflow: hidden;\
          clip: rect(0, 0, 0, 0);\
          white-space: nowrap;\
          border: 0;\
        }\
      "}</style>
      <div className="form-signin">
        <h1 className="h3 signintext">Please sign in</h1>
        <label htmlFor="inputUsername" className="inputtab">Username</label>
        <input type="text" id="inputUsername" className="form-control" placeholder="Username" required autoFocus
          value={username} onChange={e => setUsername(e.target.value)}
        />

        <label htmlFor="inputPassword" className="inputtab">Password</label>
        <input ype="text" id="inputConfirmPassword" className="form-control" placeholder="Password" required
          value={password} onKeyPress={keyPressed} onChange={e => setPassword(e.target.value)}
        />
        <button className={"btn btn-lg btn-primary btn-block " + buttonStyle()}
          type="Submit"
          disabled={!username || !password} onClick={handleAuth}>Sign in</button>

        {error && <strong>{error}</strong>}
        <p className="mt-5 mb-3 text-muted">(c) Homebrewers 2020</p>

      </div>

    </div>
  );
};


export default Login;
