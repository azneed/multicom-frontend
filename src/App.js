import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import UserDashboard from './components/UserDashboard';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import setAuthToken from './utils/setAuthToken';

// Check for token in localStorage on app load
// IMPORTANT: Prioritize adminToken if it exists
if (localStorage.adminToken) { // ✅ UNCOMMENTED AND MADE ACTIVE
  setAuthToken(localStorage.adminToken);
} else if (localStorage.jwtToken) { // ✅ Only check for jwtToken if no adminToken
  setAuthToken(localStorage.jwtToken);
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user-dashboard/:userId" element={<UserDashboard />} />
        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;