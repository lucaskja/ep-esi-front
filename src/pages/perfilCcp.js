import React, { useState } from 'react';
import './perfilCcp.css';

function ReportManagementCcp() {
  const [reportId, setReportId] = useState('');
  const [report, setReport] = useState(null);
  const [ccpOpinion, setCcpOpinion] = useState('');
  const [ccpFinalOpinion, setCcpFinalOpinion] = useState('');
  
  const handleSubmitReportId = (e) => {
    e.preventDefault();
    // Fetch the report using the entered report ID
    fetch(`/api/performance-report/${reportId}`)
      .then(response => response.json())
      .then(data => {
        setReport(data);
      })
      .catch(error => console.error('Error fetching report:', error));
  };

  const handleSubmitCcpReview = (e) => {
    e.preventDefault();
    const ccpId = localStorage.getItem('userId');  // Retrieve the logged-in CCP's ID
    const reviewData = {
      ccpId: ccpId,
      ccpOpinion: ccpOpinion,
      ccpFinalOpinion: ccpFinalOpinion,
    };

    fetch(`/api/ccp/opinion/${reportId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('CCP review submitted successfully:', data);
        // Handle success (e.g., show a success message or redirect)
      })
      .catch(error => console.error('Error submitting CCP review:', error));
  };

  return (
    <div className="report-management-ccp-container">
      <h1>CCP Report Management</h1>
      <form onSubmit={handleSubmitReportId} className="report-id-form">
        <label>
          Enter Report ID:
          <input
            type="text"
            value={reportId}
            onChange={(e) => setReportId(e.target.value)}
            required
          />
        </label>
        <button type="submit">Fetch Report</button>
      </form>

      {report && (
        <div className="report-details">
          <h2>Report Details</h2>
          <p><strong>Academic Events Resume:</strong> {report.academicEventsResume}</p>
          <p><strong>Research Resume:</strong> {report.researchResume}</p>
          <p><strong>Student Observation:</strong> {report.studentObservation}</p>
          <p><strong>Assignment Deadline:</strong> {report.assigmentDeadline}</p>
          {/* Display more report fields as needed */}

          {/* CCP Review Form */}
          <div className="ccp-review-form">
            <h2>Submit CCP Review</h2>
            <form onSubmit={handleSubmitCcpReview}>
              <label>
                CCP Opinion:
                <textarea
                  value={ccpOpinion}
                  onChange={(e) => setCcpOpinion(e.target.value)}
                  required
                />
              </label>
              <label>
                CCP Final Opinion:
                <select
                  value={ccpFinalOpinion}
                  onChange={(e) => setCcpFinalOpinion(e.target.value)}
                  required
                >
                  <option value="">Select Final Opinion</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </label>
              <button type="submit">Submit Review</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportManagementCcp;
