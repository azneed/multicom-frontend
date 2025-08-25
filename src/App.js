import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage'; // Renamed to LandingPage3 for clarity in our discussion
import UserDashboard from './components/UserDashboard';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import setAuthToken from './utils/setAuthToken';

// Check for token in localStorage on app load
// IMPORTANT: Prioritize adminToken if it exists
if (localStorage.adminToken) {
  setAuthToken(localStorage.adminToken);
} else if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
}

function App() {
  return (
    <Router>
      <Routes>
        {/*
          This is where we render your new landing page (LandingPage2/LandingPage3).
          It will be the default page when visiting your site.
        */}
        <Route path="/" element={<LandingPage />} />

        {/* Existing routes for your application */}
        <Route path="/user-dashboard/:userId" element={<UserDashboard />} />

        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;


// import React from 'react';
// import PremiumLandingPage from './components/PremiumLandingPage';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <PremiumLandingPage />
//     </div>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import LandingPage from './components/LandingPage';
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <LandingPage />
//       </div>
//     </Router>
//   );
// }

// export default App;