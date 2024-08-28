import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching data using fetch API
    fetch("http://localhost:8092/get")
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        console.log(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      fetch(`http://localhost:8092/bank/delete/${id}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            setUsers(users.filter(user => user.id !== id));
            console.log('User deleted successfully');
          } else {
            console.error('Error deleting user');
          }
        })
        .catch(error => console.error('Error deleting user:', error));
    }
  };

  const handleEdit = (id) => {
    navigate(`/bank/edit/${id}`);

  };

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Account Number</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.accountNumber}</td>
              <td>{user.name}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
                <button onClick={() => handleEdit(user.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
