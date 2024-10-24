import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './writeReport.css'; // Import the CSS file for styling

function WriteReport() {
  const navigate = useNavigate();

  // Get studentId from localStorage (assuming it's stored during login)
  const studentId = localStorage.getItem('studentId');

  // Initialize form data state
  const [formData, setFormData] = useState({
    academicEventsResume: '',
    researchResume: '',
    studentObservation: '',
    hasDifficult: false,
    qualificationExamDate: '',
    qualificationExamDeadline: '',
    languageProficiencyExamDate: '',
    languageProficiencyDeadline: '',
    assigmentDeadline: '',
    writingArticles: 0,
    reviewingArticles: 0,
    approvedArticles: 0
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reportData = {
      studentId, // Take studentId from localStorage
      ...formData
    };

    // Send data to backend
    fetch('api/performance-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reportData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Report submitted:', data);
        navigate('/report-management'); // Redirect to report management page after submission
      })
      .catch(error => console.error('Error submitting report:', error));
  };

  return (
    <div className="write-report-container">
      <h1 className="write-report-title">Write Performance Report</h1>
      <form onSubmit={handleSubmit} className="write-report-form">
        <label>
          Academic Events Resume:
          <textarea
            name="academicEventsResume"
            value={formData.academicEventsResume}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Research Resume:
          <textarea
            name="researchResume"
            value={formData.researchResume}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Student Observation:
          <textarea
            name="studentObservation"
            value={formData.studentObservation}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Difficulty in Research (Check if Yes):
          <input
            type="checkbox"
            name="hasDifficult"
            checked={formData.hasDifficult}
            onChange={handleChange}
          />
        </label>

        <label>
          Qualification Exam Date:
          <input
            type="date"
            name="qualificationExamDate"
            value={formData.qualificationExamDate}
            onChange={handleChange}
          />
        </label>

        <label>
          Qualification Exam Deadline:
          <input
            type="date"
            name="qualificationExamDeadline"
            value={formData.qualificationExamDeadline}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Language Proficiency Exam Date:
          <input
            type="date"
            name="languageProficiencyExamDate"
            value={formData.languageProficiencyExamDate}
            onChange={handleChange}
          />
        </label>

        <label>
          Language Proficiency Deadline:
          <input
            type="date"
            name="languageProficiencyDeadline"
            value={formData.languageProficiencyDeadline}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Assignment Deadline:
          <input
            type="date"
            name="assigmentDeadline"
            value={formData.assigmentDeadline}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Writing Articles:
          <input
            type="number"
            name="writingArticles"
            value={formData.writingArticles}
            onChange={handleChange}
            min="0"
            required
          />
        </label>

        <label>
          Reviewing Articles:
          <input
            type="number"
            name="reviewingArticles"
            value={formData.reviewingArticles}
            onChange={handleChange}
            min="0"
            required
          />
        </label>

        <label>
          Approved Articles:
          <input
            type="number"
            name="approvedArticles"
            value={formData.approvedArticles}
            onChange={handleChange}
            min="0"
            required
          />
        </label>

        <button type="submit" className="submit-button">Submit Report</button>
      </form>
    </div>
  );
}

export default WriteReport;
