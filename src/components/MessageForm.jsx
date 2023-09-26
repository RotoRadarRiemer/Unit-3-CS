import React, { useState } from 'react';
import { postMessage } from '../api/messagingApi';

const MessageForm = ({ postId, token, isAuthor }) => {
  const [content, setContent] = useState('');

  if (isAuthor || !token) {
    return null; 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await postMessage(postId, token, content);
    if (result.success) {
      alert('Message sent!');
      setContent(''); 
    } else {
      alert('Failed to send the message.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea 
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Send a message to the author..."
        required
      />
      <button type="submit">Send Message</button>
    </form>
  );
}

export default MessageForm;
