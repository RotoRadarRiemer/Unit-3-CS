import React from 'react';
import '../styles/UserProfile.css'

const UserProfile = ({ allPosts }) => {
    const userPosts = allPosts.filter(post => post.isAuthor);
  
    return (
      <div>
        <h1 className="welcome-header">Welcome!</h1>
        <h2 className="posts-header">Your Posts</h2>
        {userPosts.map((post) => (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p>Price: {post.price}</p>
            <p>Location: {post.location || 'On Request'}</p>
            <p>Will Deliver: {post.willDeliver ? 'Yes' : 'No'}</p>
            
            <div>
              <h3>Messages:</h3>
              {post.messages && post.messages.length > 0 ? (
                post.messages.map((message, index) => (
                  <div key={index}>
                    <p><strong>From: </strong>{message.author.username}</p>
                    <p><strong>Message: </strong>{message.content}</p>
                  </div>
                ))
              ) : (
                <p>No messages yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default UserProfile