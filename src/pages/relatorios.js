import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './relatorios.css';

function ReportManagement() {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const studentId = localStorage.getItem('studentId');
    fetch(`/student/${studentId}`)
      .then(response => response.json())
      .then(data => setReports(data))
      .catch(error => console.error('Error fetching reports:', error));
  }, []);

  return (
    <div className="report-management-container">
      <h1 className="report-management-title">Your Reports</h1>

      <div className="reports-list">
        {reports.map((report, index) => (
          <div key={index} className="report-item">
            <button
              className="report-link"
              onClick={() => navigate(`/report/${index}`)} // Pass the report ID
            >
              {`Report - ${index + 1}`}
            </button>
          </div>
        ))}
      </div>

      <button
        className="write-report-button"
        onClick={() => navigate('/write-report')}
      >
        Write a New Report
      </button>
    </div>
  );
}

export default ReportManagement;
