import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './utilities/PrivateRoute';

function App() {
  // const url = 'floware.studio/api';
  const url = 'http://localhost/floware/api';
  return (
    <Router basename='/'>
      <Routes>    
        <Route path="/login" element={<LoginPage url= {url} />} />
        <Route path="/" element={<PrivateRoute element={<HomePage url= {url} />} />}/>        
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
