import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { TrendingUp } from 'lucide-react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const mode = queryParams.get('mode');
    setIsSignUp(mode === 'signup');
  }, [location]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: name });

        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          displayName: name,
          hasCompletedOnboarding: false,
          monthlyData: {}, // Align with Dashboard.js
          goal: null,      // Align with Dashboard.js
          createdAt: new Date().toISOString(),
        });

        navigate('/onboarding');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/dashboard');
      }
    } catch (err) {
      let errorMessage = 'An error occurred. Please try again.';
      if (err.code === 'auth/email-already-in-use') errorMessage = 'This email is already registered. Please log in instead.';
      else if (err.code === 'auth/invalid-email') errorMessage = 'Please enter a valid email address.';
      else if (err.code === 'auth/weak-password') errorMessage = 'Password should be at least 6 characters long.';
      else if (err.code === 'auth/network-request-failed') errorMessage = 'Network error. Please check your connection and try again.';
      else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') errorMessage = 'Invalid email or password.';
      setError(errorMessage);
      console.error('Firebase error:', err.code, err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <TrendingUp className="text-blue-600 mr-2" />
          <span className="text-2xl font-bold text-gray-800">WealthPulse</span>
        </div>
      </nav>

      {/* Form */}
      <div className="flex-grow flex items-center justify-center">
        <form onSubmit={handleAuth} className="bg-white p-6 rounded-xl shadow-md w-full max-w-md border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{isSignUp ? 'Sign Up' : 'Login'}</h2>
          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

          {isSignUp && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            disabled={loading}
          >
            {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Login'}
          </button>

          <p className="mt-4 text-center text-gray-600">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-600 hover:underline focus:outline-none"
            >
              {isSignUp ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;