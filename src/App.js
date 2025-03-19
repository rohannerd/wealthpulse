import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard'; // Path to dashboard.js
import WealthPulseLanding from './pages/landing'; // Path to landing.js
import Login from './pages/login'; // Path to login.js
import Onboarding from './pages/onboarding'; // Path to onboarding.js

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page as the default route */}
        <Route path="/" element={<WealthPulseLanding />} />

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Onboarding page */}
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Dashboard page */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Logout route - redirects to landing page */}
        <Route path="/logout" element={<Navigate to="/" replace />} />

        {/* Optional: Catch-all route for undefined paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;