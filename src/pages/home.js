import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // We'll create this CSS file for styling

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the Dashboard</h1>
      <div className="button-container">
        <Link to="/report-management" className="home-button">
          Report Management
        </Link>
        <Link to="/profile" className="home-button">
          Profile
        </Link>
      </div>
    </div>
  );
}

export default Home;
