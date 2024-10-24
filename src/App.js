import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';  // Import the Header component
import Cadastro from './pages/register/register';
import Login from './pages/login/login';  // Import the Login page
import Home from './pages/home/home';    // Import the Home page
import ReportManagement from './pages/report/report';
import ReportVisualization from './pages/report/viewReport';
import WriteReport from './pages/report/writeReport';
import ProfessorProfile from './pages/profile/professorProfile/professorProfile';
import ReportManagementCcp from './pages/profile/ccpProfile/profileCcp';

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
        <Route path="/write-report" element={<><Header /><WriteReport/></>} />
        <Route path="/report/:id" element={<><Header /><ReportVisualization /></>} />
        <Route path="/professor-profile" element={<><Header /><ProfessorProfile /></>} />
        <Route path="/report-management-ccp" element={<><Header /><ReportManagementCcp /></>} />
        {/*<Route path="/profile" element={<><Header /><Profile /></>} />*/}
      </Routes>
    </Router>
  );
}

export default App;
