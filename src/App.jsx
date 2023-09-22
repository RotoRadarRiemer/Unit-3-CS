import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Posts from './components/Posts';
import Header from './components/header';
import './styles/app.css';
import { loginUser } from './api/authApi';

function App() {
    const [token, setToken] = useState(sessionStorage.getItem('token') || null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        console.log('Token state updated:', token);
    }, [token]);
  
    const logIn = (newToken) => {
        console.log("Setting token to state:", newToken);
        setToken(newToken);
        sessionStorage.setItem('token', newToken);
        setMessage('Successfully logged in!');
      };      
      
  
    const logOut = () => {
      setToken(null);
      sessionStorage.removeItem('token');
      setMessage('Successfully logged out!');
    };
  
    const handleLogin = async (username, password) => {
        try {
          const response = await loginUser(username, password);
          console.log("Complete API response data:", response.data);
          
          if (response.success) {
            const token = response.data.token;
            console.log("Setting token to state:", token);
            logIn(token);
          } else {
            setMessage('Wrong credentials!');
          }
        } catch (error) {
          setMessage('An error occurred during login.');
          console.error(error);
        }
      };           
      
  
    return (
      <Router>
        <div className="App">
          {message && <div className="message">{message}</div>}
          <Header key={token} isLoggedIn={!!token} logOut={logOut} />
          <Routes>
            <Route path="/" element={<>
              <h2>Welcome to the Stranger's Things</h2>
              <LoginForm handleLogin={handleLogin} />
              <p>Don't have an account? <Link to="/register">Sign up here</Link></p>
            </>} />
            <Route path="/register" element={<>
              <h2>Create a new account</h2>
              <RegisterForm logIn={logIn} />
            </>} />
            <Route path="/posts" element={<>
              <h1>Posts</h1>
              <Posts />
            </>} />
          </Routes>
        </div>
      </Router>
    );
  }
  
export default App
