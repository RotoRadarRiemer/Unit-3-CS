import React, { useState } from 'react';
import { makePost } from '../api/makingAPost';
import '../styles/CreatePost.css';

const CreatePost = ({ token, addUserPost }) => {
  const [post, setPost] = useState({
    title: "",
    description: "",
    price: "",
    willDeliver: false
  });
  
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPost({
      ...post,
      [name]: checked
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await makePost(token, post);
    if (result.success) {
        addUserPost(result.data.post);
        setSuccessMessage("Your post has been successfully created!");
        setPost({
            title: "",
            description: "",
            price: "",
            willDeliver: false
        });
        
        setTimeout(() => {
            setSuccessMessage("");
        }, 3000); // Clears the message after 3 seconds
    }
    console.log(result);
  };

  return (
    <div className="create-post-form">
        {successMessage && <div className="success-message">{successMessage}</div>}
        
        <form onSubmit={handleSubmit}>
        <input 
            type="text" 
            name="title"
            placeholder="Title" 
            value={post.title} 
            onChange={handleInputChange} 
            required
        />
        <textarea 
            name="description"
            placeholder="Description" 
            value={post.description} 
            onChange={handleInputChange} 
            required
        ></textarea>
        <input 
            type="text" 
            name="price"
            placeholder="Price" 
            value={post.price} 
            onChange={handleInputChange} 
            required
        />
        <label>
            Will Deliver?
            <input 
            type="checkbox"
            name="willDeliver"
            checked={post.willDeliver}
            onChange={handleCheckboxChange}
            />
        </label>
        <button type="submit">Create Post</button>
        </form>
    </div>
  );
};

export default CreatePost;
