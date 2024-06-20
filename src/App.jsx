import React from 'react';
import Career from './Career/Career';
import './App.css';
import Contactus from './Contact-us/contact-us-main/Contactus';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Career />} />
        <Route path="/career" element={<Career />} />
        <Route path="/contactus" element={<Contactus />} />
      </Routes>
    </Router>
  );
}

export default App;
