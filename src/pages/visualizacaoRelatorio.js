import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './visualizacaoRelatorio.css'; // CSS for styling

function ReportVisualization() {
  const { id } = useParams(); // Report ID from the URL
  const [report, setReport] = useState(null);

  useEffect(() => {
    const studentId = localStorage.getItem('studentId');
    // Fetch the specific report using the report ID
    fetch(`/student/${studentId}/report/${id}`)
      .then(response => response.json())
      .then(data => setReport(data))
      .catch(error => console.error('Error fetching report:', error));
  }, [id]);

  if (!report) {
    return <div>Loading...</div>;
  }

  return (
    <div className="report-visualization-container">
      <h1 className="report-visualization-title">Report Details</h1>

      <div className="report-details">
        <div className="report-row">
          <strong>Professor Opinion:</strong> <span>{report.professorOpinion}</span>
        </div>
        <div className="report-row">
          <strong>Professor Final Opinion:</strong> <span>{report.professorFinalOpinion}</span>
        </div>
        <div className="report-row">
          <strong>CCP Opinion:</strong> <span>{report.ccpOpinion}</span>
        </div>
        <div className="report-row">
          <strong>CCP Final Opinion:</strong> <span>{report.ccpFinalOpinion}</span>
        </div>
        <div className="report-row">
          <strong>Academic Events Resume:</strong> <span>{report.academicEventsResume}</span>
        </div>
        <div className="report-row">
          <strong>Research Resume:</strong> <span>{report.researchResume}</span>
        </div>
        <div className="report-row">
          <strong>Student Observation:</strong> <span>{report.studentObservation}</span>
        </div>
        <div className="report-row">
          <strong>Qualification Exam Date:</strong> <span>{report.qualificationExamDate}</span>
        </div>
        <div className="report-row">
          <strong>Qualification Exam Deadline:</strong> <span>{report.qualificationExamDeadline}</span>
        </div>
        <div className="report-row">
          <strong>Language Proficiency Exam Date:</strong> <span>{report.languageProficiencyExamDate}</span>
        </div>
        <div className="report-row">
          <strong>Language Proficiency Deadline:</strong> <span>{report.languageProficiencyDeadline}</span>
        </div>
        <div className="report-row">
          <strong>Assignment Deadline:</strong> <span>{report.assigmentDeadline}</span>
        </div>
        <div className="report-row">
          <strong>Writing Articles:</strong> <span>{report.writingArticles}</span>
        </div>
        <div className="report-row">
          <strong>Reviewing Articles:</strong> <span>{report.reviewingArticles}</span>
        </div>
        <div className="report-row">
          <strong>Approved Articles:</strong> <span>{report.approvedArticles}</span>
        </div>
      </div>
    </div>
  );
}

export default ReportVisualization;
