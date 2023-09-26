import '../styles/posts.css';
import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../api/posts';
import MessageForm from './MessageForm';
import { getCurrentUserDetails } from '../api/authApi';

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

const Posts = ({ token }) => {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentUserId, setCurrentUserId] = useState(null);

    function postMatches(post, text) {
        const lowercasedText = text.toLowerCase
        return post.title.toLowerCase().includes(text) || post.description.toLowerCase().includes(text) || post.author.username.toLowerCase().includes(text);
    }

    const filteredPosts = posts.filter((post) => postMatches(post, searchTerm));
    const postsToDisplay = searchTerm.length ? filteredPosts : posts;

    useEffect(() => {
        const getPosts = async () => {
            const fetchedPosts = await fetchPosts();
            if (fetchedPosts) {
                setPosts(fetchedPosts);
            } else {
                console.error("No posts fetched or the data structure is unexpected.");
            }
        };

        const fetchUserDetails = async () => {
            if (token) {
                try {
                    const userDetails = await getCurrentUserDetails(token);
                    setCurrentUserId(userDetails._id); 
                } catch (err) {
                    console.error("Error fetching user details:", err);
                }
            }
        };

        getPosts();
        fetchUserDetails();
    }, [token]);

    return (
        <div className="posts-container">
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Search for posts here..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {postsToDisplay.map(post => (
                <div key={post._id} className="post">
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <p>{post.price}</p>
                    <p>Created on {formatDate(post.createdAt)}</p>
                    <p>Updated last: {formatDate(post.updatedAt)}</p>
                    <p>Located at: {post.location}</p>
                    <p className="author">{post.author.username}</p>

                    {(token && currentUserId !== post.author._id) && 
                        <MessageForm postId={post._id} token={token} isAuthor={currentUserId === post.author._id} />
                    }
                </div>
            ))}
        </div>
    );
};

export default Posts;