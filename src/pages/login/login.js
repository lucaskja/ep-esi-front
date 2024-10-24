import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css'; // We'll create this CSS file for styling

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username:email, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.accessToken) {
          const { accessToken } = data;

          localStorage.setItem('token', accessToken);
  
          if (data.role === 'CCP') {
            window.location.href = '/report-management-ccp';
          } else if (data.role === 'PROFESSOR') {
            window.location.href = '/professor-profile';
          } else {
            window.location.href = '/home';
          }
        } else {
          console.error('Login failed:', data.message);
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
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Entrar</button>
      </form>
      <div className="options">
        <Link to="/registration" className="option-link">Cadastre-se</Link>
      </div>
    </div>
  );
}

export default Login;
