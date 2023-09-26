import React, { useState } from 'react';
import { registerUser } from '../api/authApi';
import '../styles/RegisterForm.css'

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert('Passwords do not match.');
      return;
    }
    const result = await registerUser(username, password);
    if (result && result.success) {
      setRegistrationSuccess(true);
      setRegistrationMessage(result.data.message);
    } else {
      setRegistrationSuccess(false);
      // You can customize this message or use the one from the API if provided.
      setRegistrationMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          required
          minLength="3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          minLength="8"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          required
          minLength="8"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      {registrationMessage && (
        <p className={registrationSuccess ? 'success-text' : 'error-text'}>
          {registrationMessage}
        </p>
      )}
    </div>
  );
}

export default RegisterForm;
