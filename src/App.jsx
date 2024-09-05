import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './utilities/PrivateRoute';

function App() {
  return (
    <Router basename='Floware-front/'>
      <Routes>    
      <Route path="/" element={<PrivateRoute element={<HomePage />} />}/>        
      <Route path="/login" element={<LoginPage />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
