import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css'; // We'll create this CSS file for styling

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the login data to the backend endpoint
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          // Handle successful login, e.g., redirect to another page
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle error
        });
  };


  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <div className="options">
        <Link to="/registration" className="option-link">New User Registration</Link>
        <Link to="/professor-login" className="option-link">Professor Login</Link>
      </div>
    </div>
  );
}

export default Login;
