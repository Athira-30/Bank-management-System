import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Form from './Form'; // Importing the Form component
import Fetch from './Fetch'; // Importing the Fetch component
import EditDetails from './editDetails'; // Importing the EditDetails component

function Home() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> | 
          <Link to="/fetch">Fetch Data</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/fetch" element={<Fetch />} />
          
          <Route path="/bank/edit/:_id" element={<EditDetails />} />

        </Routes>
      </div>
    </Router>
  );
}

export default Home;
