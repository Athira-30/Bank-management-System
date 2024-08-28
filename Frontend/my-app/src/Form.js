import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import "./Form.css";

function BasicExample() {
  // State variables to hold form data
  const [name, setName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Basic validation to ensure fields are not empty
    if (!name || !accountNumber) {
      alert('Name and Account Number are required.');
      return;
    }

    // Prepare the data to be sent
    const bankDetails = {
      name: name,
      accountNumber: accountNumber,
    };

    console.log('Submitting:', bankDetails); // Log the data being sent

    // Send POST request to the server
    axios.post('http://localhost:8092/bank/save', bankDetails)
      .then((response) => {
        console.log('Bank details saved successfully:', response.data);
        alert('Bank details saved successfully!');
      })
      .catch((error) => {
        console.error('Error saving bank details:', error.response?.data || error.message);
        alert('Error saving bank details. Please try again.');
      });
  };

  return (
    <div>
      <h1>Bank Mangement System</h1>
    <Form className="form-container" onSubmit={handleSubmit}>
      {/* Name Input */}
       <h2>Register</h2>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label className="form-label">Name</Form.Label><br /><br />
        <Form.Control
          className="form-control"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      {/* Account Number Input */}
      <Form.Group className="mb-3" controlId="formBasicAccountNumber">
        <Form.Label className="form-label">Account Number</Form.Label><br /><br />
        <Form.Control
          className="form-control"
          type="text"
          placeholder="Enter account number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
      </Form.Group>

      {/* Submit Button */}
      <Button variant="primary" type="submit" className="submit-btn w-100">
        Submit
      </Button>

    
    </Form>

    <div>
      <a href="Fecth">Fetch data</a>
    </div>
    </div>
  );
}

export default BasicExample;
