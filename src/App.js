import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import UserDashboard from './components/UserDashboard';
import AdminLogin from './components/AdminLogin'; // Import AdminLogin
import AdminDashboard from './components/AdminDashboard'; // Import AdminDashboard
import setAuthToken from './utils/setAuthToken';

// Check for token in localStorage on app load
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
}

// Optionally, if you have a separate admin token, you can add a check here
// if (localStorage.adminToken) {
//   setAuthToken(localStorage.adminToken, 'admin'); // Assuming setAuthToken can differentiate
// }

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user-dashboard/:userId" element={<UserDashboard />} />
        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* This will be protected later */}
      </Routes>
    </Router>
  );
}

export default App;