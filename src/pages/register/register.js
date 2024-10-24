import React, { useState } from 'react';
import './register.css'; // Import the CSS file for styling

function Cadastro() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    uspNumber: '',
    professor: '',
    role: '',
    dateOfBirth: '',
    name: '',
    birthplace: '',
    nationality: '',
    program: '',
    lattes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the form data to the backend endpoint
    fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Handle successful registration, e.g., redirect to another page
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle error
    });
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit} className="registration-form">
        <h1>Registration Form</h1>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          USP Number:
          <input
            type="text"
            name="uspNumber"
            value={formData.uspNumber}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Professor:
          <input
            type="text"
            name="professor"
            value={formData.professor}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Role:
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Birthplace:
          <input
            type="text"
            name="birthplace"
            value={formData.birthplace}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Nationality:
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Program:
          <input
            type="text"
            name="program"
            value={formData.program}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Lattes URL:
          <input
            type="url"
            name="lattes"
            value={formData.lattes}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Cadastro;
