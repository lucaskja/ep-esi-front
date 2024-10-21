import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';  // We'll create this CSS file

function Header() {
  return (
    <header className="app-header">
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li>
            <Link to="/report-management" className="nav-link">Report Management</Link>
          </li>
          <li>
            <Link to="/profile" className="nav-link">Profile</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
