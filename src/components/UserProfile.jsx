import React from 'react';
import { deleteUserPost } from '../api/deleteUserPost';
import '../styles/UserProfile.css';
import '../styles/Posts.css';

const UserProfile = ({ allPosts, token, removeUserPost }) => {
  const userPosts = allPosts.filter(post => post.isAuthor);

  const handleDelete = async (postId) => {
    const result = await deleteUserPost(token, postId);
    if (result.success) {
      removeUserPost(postId);  
    }
  };

  const getRecentMessages = () => {
    return userPosts.flatMap(post => post.messages.map(message => ({
        ...message,
        postTitle: post.title 
    })));
};

  const recentMessages = getRecentMessages();

  return (
    <div>
      <h1 className="welcome-header">Welcome!</h1>

      <h2 className="posts-header">Your Posts</h2>
      <div className="posts-container">
        {userPosts.map((post) => (
          <div key={post._id} className="post">
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p>Price: {post.price}</p>
            <p>Location: {post.location || 'On Request'}</p>
            <p>Will Deliver: {post.willDeliver ? 'Yes' : 'No'}</p>
            <button onClick={() => handleDelete(post._id)}>Delete Post</button>
          </div>
        ))}
      </div>

      <h2 className="messages-header">Recent Messages on Your Posts</h2>
      <div className="messages-container">
        {recentMessages.length > 0 ? (
          recentMessages.map((message, index) => (
            <div key={index}>
              <p><strong>Post: </strong>{message.postTitle}</p>
              <p><strong>From: </strong>{message.fromUser.username}</p>
              <p><strong>Message: </strong>{message.content}</p>
            </div>
          ))
        ) : (
          <p>No recent messages.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;