import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css'; // We'll create this CSS file for styling

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Send the login data to the backend endpoint
    fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username:email, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log('Success:', data);
  
          // Assuming the backend returns the user role in the response, e.g., data.role
          const { role, userId } = data; // Adjust this to match your backend's response structure
  
          // Store the role and userId in localStorage
          localStorage.setItem('role', role);
          localStorage.setItem('userId', userId);
  
          if (data.role === 'CCP') {
            // Redirect to the CCP home or report management page
            window.location.href = '/report-management-ccp';
          } else if (data.role === 'PROFESSOR') {
            window.location.href = '/professor-profile';
          } else {
            window.location.href = '/home';
          }
        } else {
          console.error('Login failed:', data.message);
          // Handle login failure
        }
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
