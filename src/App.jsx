import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './utilities/PrivateRoute';

function App() {
  const API_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:80/floware/api' // Local dev server
  : 'https://floware.studio/api'; // Production server
  
  return (
    <Router basename='/'>
      <Routes>    
        <Route path="/login" element={<LoginPage API_URL= {API_URL} />} />
        <Route path="/" element={<PrivateRoute element={<HomePage API_URL= {API_URL} />} />}/>        
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
