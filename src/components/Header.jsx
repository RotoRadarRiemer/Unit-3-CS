import { Link } from 'react-router-dom';
import '../styles/header.css';
import React, { useEffect } from 'react';


const Header = ({ isLoggedIn, logOut }) => {
    useEffect(() => {
        console.log("Header re-rendered. isLoggedIn:", isLoggedIn);
    }, [isLoggedIn]);
  
    return (
      <div className="header">
        {isLoggedIn ? (
          <>
            <Link to="/create-post">Create Post</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/" onClick={logOut}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        <Link to="/posts">Posts</Link>
      </div>
    );
  };
  

export default Header;