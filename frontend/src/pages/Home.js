import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({appUser}) => {

  return (
    <div className="container">
    <div className="jumbotron">
      {!appUser && <h1>Welcome Homebrewer!</h1>}
      {appUser && <h1>Welcome {appUser}!</h1>}
    </div>
      <h2>This is our chatting room</h2>
      <p>Connect with other like-minded Homebrewers around the world</p>
      <div>
        {!appUser && <Link className="signup-button btnHover" to="/signup">Sign Up</Link>}
        {appUser && <Link className="signup-button btnHover" to="/userpage">Chat Now</Link>}
      </div>
      <div className="bigLogo" />
    </div>
  );
};

export default Home;
