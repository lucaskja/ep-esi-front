import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';  // Import the Header component
import Cadastro from './pages/cadastro';
import Login from './pages/login';  // Import the Login page
import Home from './pages/home';    // Import the Home page
import ReportManagement from './pages/relatorios';
//import Profile from './pages/profile';  // Import other pages

function App() {
  return (
    <Router>
      <Routes>
        {/* Set Login as the first page */}
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Cadastro />} />

        {/* Display header on other pages */}
        <Route path="/home" element={<><Header /><Home /></>} />
        <Route path="/report-management" element={<><Header /><ReportManagement /></>} />
        {/*<Route path="/profile" element={<><Header /><Profile /></>} />*/}
      </Routes>
    </Router>
  );
}

export default App;
