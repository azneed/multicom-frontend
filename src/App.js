import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import UserDashboard from './components/UserDashboard'; // Import UserDashboard
import setAuthToken from './utils/setAuthToken';

// Check for token in localStorage on app load
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* LandingPage route */}
        <Route path="/user-dashboard/:userId" element={<UserDashboard />} /> {/* UserDashboard route */}
      </Routes>
    </Router>
  );
}

export default App;



