import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
  const role = localStorage.getItem('role'); // Get role from localStorage

  return (
    <div className="home-container">
      <h1>Welcome to the Dashboard</h1>
      <div className="button-container">
        {/* Report Management is accessible to both students and professors */}
        <Link to="/report-management" className="home-button">
          Report Management
        </Link>

        {/* Profile link */}
        {role === 'PROFESSOR' && (
          <Link to="/professor-profile" className="home-button">
            Professor Profile
          </Link>
        )}

        {/* Student Profile */}
        {role !== 'PROFESSOR' && (
          <Link to="/profile" className="home-button">
            Profile
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;
