import '../styles/posts.css';
import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../api/posts';

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const fetchedPosts = await fetchPosts();
            if (fetchedPosts) {
                setPosts(fetchedPosts);
            } else {
                console.error("No posts fetched or the data structure is unexpected.");
            }
        };
    
        getPosts();
    }, []);    

    return (
        <div className="posts-container">
            {posts.map(post => (
                <div key={post._id} className="post">
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <p>{post.price}</p>
                    <p>Created on {formatDate(post.createdAt)}</p>
                    <p>Updated last: {formatDate(post.updatedAt)}</p>
                    <p>{post.location}</p>
                    <p className="author">{post.author.username}</p>
                </div>
            ))}
        </div>
    );
};

export default Posts;





