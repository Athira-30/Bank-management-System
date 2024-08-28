import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios"
function EditDetails() {
    const { id } = useParams(); // Ensure the URL parameter name matches exactly
    const [name, setName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const navigate = useNavigate();

    // Debugging: Log the _id value to ensure it's being captured correctly
    useEffect(() => {
      console.log('ID from URL:', id); // Debugging: Check if ID is captured
      if (!id) {
          console.error('ID is undefined'); // If still undefined, it suggests an issue with URL or route configuration
          return;
      }
      
      // Fetch data from the server for the specific bank detail
      axios.get(`http://localhost:8091/bank/edit/${id}`)
          .then(response => {
              const data = response.data;
              // Set the fetched data to the state
              setName(data.name);
              setAccountNumber(data.accountNumber);
          })
          .catch(error => console.error('Error fetching data:', error));
  }, [id]);
  

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedDetails = { name, accountNumber };

        fetch(`http://localhost:8091/bank/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedDetails),
        })
            .then(response => {
                if (response.ok) {
                    alert('Bank details updated successfully!');
                    navigate('/'); // Redirect after successful update
                } else {
                    throw new Error('Failed to update details');
                }
            })
            .catch(error => console.error('Error updating details:', error));
    };

    return (
        <div>
            <h1>Edit Bank Details</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Account Number:
                    <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default EditDetails;
