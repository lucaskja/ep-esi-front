import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './viewReport.css'; // Assuming you have a CSS file for styling

function ReportView() {
  const { reportId } = useParams();
  const [report, setReport] = useState(null);
  const [professorOpinion, setProfessorOpinion] = useState('');
  const [professorFinalOpinion, setProfessorFinalOpinion] = useState('');
  const [isProfessor, setIsProfessor] = useState(false);

  useEffect(() => {
    // Fetch the report details based on the reportId
    fetch(`/api/reports/${reportId}`)
      .then((response) => response.json())
      .then((data) => {
        setReport(data);
      })
      .catch((error) => console.error('Error fetching report:', error));

    // Check if the logged-in user is a professor
    const role = localStorage.getItem('role');
    if (role === 'PROFESSOR') {
      setIsProfessor(true);
    }
  }, [reportId]);

  const handleSubmitReview = (e) => {
    e.preventDefault();

    const professorId = localStorage.getItem('userId'); // Get professorId from storage

    const reviewData = {
      professorId: professorId,
      professorOpinion: professorOpinion,
      professorFinalOpinion: professorFinalOpinion,
    };

    fetch('/api/professor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Review submitted successfully:', data);
        // Handle success (e.g., display a success message)
      })
      .catch((error) => console.error('Error submitting review:', error));
  };

  return (
    <div className="report-view-container">
      {report && (
        <div>
          <h1>Report Details</h1>
          <p><strong>Academic Events Resume:</strong> {report.academicEventsResume}</p>
          <p><strong>Research Resume:</strong> {report.researchResume}</p>
          <p><strong>Student Observation:</strong> {report.studentObservation}</p>
          <p><strong>Assignment Deadline:</strong> {report.assigmentDeadline}</p>
          {/* Display other report attributes as necessary */}

          {isProfessor && (
            <div className="professor-review-form">
              <h2>Review Report</h2>
              <form onSubmit={handleSubmitReview}>
                <label>
                  Professor Opinion:
                  <textarea
                    value={professorOpinion}
                    onChange={(e) => setProfessorOpinion(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Professor Final Opinion:
                  <select
                    value={professorFinalOpinion}
                    onChange={(e) => setProfessorFinalOpinion(e.target.value)}
                    required
                  >
                    <option value="">Select Opinion</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </label>
                <button type="submit">Review</button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ReportView;
