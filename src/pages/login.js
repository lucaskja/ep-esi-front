import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css'; // We'll create this CSS file for styling

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic (you can log or send data here)
    console.log('Login Data:', { email, password });
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
