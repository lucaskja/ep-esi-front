import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './relatorios.css'; // Import the CSS for styling

function ReportManagement() {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the reports for the student from the backend (assuming the student ID is stored in localStorage)
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
            <a href={`/report/${index}`} className="report-link">
              {`Report - ${index + 1}`}
            </a>
          </div>
        ))}
      </div>

      {/* Button to write a new report */}
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
