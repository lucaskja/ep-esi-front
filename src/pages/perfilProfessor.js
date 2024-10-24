import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './perfilProfessor.css'; // You'll create this CSS file for styling

function ProfessorProfile() {
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!studentId) {
      setError('Please enter a valid student ID.');
      return;
    }

    // Redirect to the report management page for the specific student
    navigate(`/report-management?studentId=${studentId}`);
  };

  return (
    <div className="professor-profile-container">
      <h1>Professor Profile</h1>
      <form onSubmit={handleSubmit} className="student-id-form">
        <label htmlFor="studentId">Enter Report ID:</label>
        <input
          type="text"
          id="studentId"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">View Report</button>
      </form>
    </div>
  );
}

export default ProfessorProfile;
