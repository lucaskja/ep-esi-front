import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './relatorios.css'; // Import CSS file for styling

function ReportManagement() {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  const studentId = localStorage.getItem('studentId'); // Assuming studentId is stored in localStorage

  useEffect(() => {
    // Fetch reports for the logged-in student
    fetch(`/student/${studentId}`)
      .then(response => response.json())
      .then(data => setReports(data.reports)) // Assuming the response contains the reports array
      .catch(error => console.error('Error fetching reports:', error));
  }, [studentId]);

  return (
    <div className="report-management-container">
      <h1 className="report-management-title">Your Reports</h1>
      <div className="report-list">
        {reports.length > 0 ? (
          reports.map((report) => (
            <div key={report.id} className="report-item">
              <div className="report-link">
                {/* Only display the assignment deadline */}
                Assignment Deadline: {new Date(report.assigmentDeadline).toLocaleDateString('pt-BR')}
              </div>
            </div>
          ))
        ) : (
          <p>No reports found</p>
        )}
      </div>
    </div>
  );
}

export default ReportManagement;
