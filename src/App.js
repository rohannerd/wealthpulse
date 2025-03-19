import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase/config';
import LandingPage from './pages/landing';
import LoginPage from './pages/login';
import OnboardingPage from './pages/onboarding';
import DashboardPage from './pages/dashboard';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log('Auth state changed:', currentUser?.uid);
      setUser(currentUser);

      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);

        try {
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            console.log('Onboarding status:', userData.hasCompletedOnboarding);
            setHasCompletedOnboarding(Boolean(userData.hasCompletedOnboarding));
          } else {
            setHasCompletedOnboarding(false);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setHasCompletedOnboarding(false);
        }
      } else {
        setHasCompletedOnboarding(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Redirect unauthenticated users to the landing page
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Special case for onboarding page
  if (location.pathname === '/onboarding') {
    return children;
  }

  // Redirect to onboarding if not completed
  if (hasCompletedOnboarding === false) {
    console.log('Redirecting to onboarding');
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <OnboardingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;