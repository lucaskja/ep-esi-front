import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './report.css';

function ReportManagement() {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If the page is accessed by a professor, they'll have passed a studentId as a query parameter
    const searchParams = new URLSearchParams(location.search);
    const studentId = searchParams.get('studentId') || localStorage.getItem('studentId'); // Use student ID for students or professor input

    fetch(`/api/performance-report/student/${studentId}`)
      .then((response) => response.json())
      .then((data) => setReports(data))
      .catch((error) => console.error('Error fetching reports:', error));
  }, [location.search]);

  return (
    <div className="report-management-container">
      <h1 className="report-management-title">Reports</h1>

      <div className="reports-list">
        {reports.map((report, index) => (
          <div key={index} className="report-item">
            <button
              className="report-link"
              onClick={() => navigate(`/report/${index}`)}
            >
              {`Report - ${index + 1}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReportManagement;
