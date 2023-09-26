import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Posts from './components/Posts';
import Header from './components/header';
import './styles/app.css';
import { loginUser } from './api/authApi';
import CreatePost from './components/CreatePost';
import UserProfile from './components/UserProfile';
import { fetchPosts } from './api/posts';

function App() {
  const [token, setToken] = useState(sessionStorage.getItem('token') || null);
  const [message, setMessage] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await fetchPosts(token);
        if (posts) {
          setAllPosts(posts);
          const filteredPosts = posts.filter((post) => post.isAuthor);
          setUserPosts(filteredPosts);
        }
      } catch (error) {
        console.error('Failed to fetch all posts.', error);
      }
    };
    fetchData();
  }, [token]);  

  const logIn = (newToken) => {
    setToken(newToken);
    sessionStorage.setItem('token', newToken);
    setMessage('Successfully logged in!');
  };

  const logOut = () => {
    setToken(null);
    sessionStorage.removeItem('token');
    setMessage('Successfully logged out!');
  };

  const addUserPost = (newPost) => {
    console.log("Adding new post: ", newPost);  // Debugging line
    setUserPosts((prevPosts) => [...prevPosts, newPost]);
    setAllPosts((prevPosts) => [...prevPosts, newPost]);
};

  const handleLogin = async (username, password) => {
    try {
      const response = await loginUser(username, password);
      if (response.success) {
        const token = response.data.token;
        logIn(token);
      } else {
        setMessage('Wrong credentials!');
      }
    } catch (error) {
      setMessage('An error occurred during login.');
      console.error(error);
    }
  };

  const removeUserPost = (postId) => {
    setAllPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
  };
  

  return (
    
    <Router>
      <div className="App">
        {message && <div className="message">{message}</div>}
        <Header isLoggedIn={!!token} logOut={logOut} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h2>Welcome to the Stranger's Things</h2>
                <LoginForm handleLogin={handleLogin} />
                <p>
                  Don't have an account? <Link to="/register">Sign up here</Link>
                </p>
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <h2>Create a new account</h2>
                <RegisterForm logIn={logIn} />
              </>
            }
          />
          <Route
            path="/posts"
            element={
              <>
                <h1>Stranger's Things Posts</h1>
                <Posts token={token} posts={allPosts} />
              </>
            }
          />
          <Route path="/create-post" element={<CreatePost token={token} addUserPost={addUserPost} />} />
          <Route path="/profile" element={<UserProfile allPosts={allPosts} removeUserPost={removeUserPost} token={token}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;