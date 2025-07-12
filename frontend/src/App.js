import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { ThemeProvider } from './hooks/useTheme';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Skills from './pages/Skills';
import Browse from './pages/Browse';
import Swaps from './pages/Swaps';
import Ratings from './pages/Ratings';
import './index.css';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen transition-all duration-300">
            <Navbar />
            <main className="transition-all duration-300">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/skills" element={<ProtectedRoute><Skills /></ProtectedRoute>} />
                <Route path="/browse" element={<ProtectedRoute><Browse /></ProtectedRoute>} />
                <Route path="/swaps" element={<ProtectedRoute><Swaps /></ProtectedRoute>} />
                <Route path="/ratings" element={<ProtectedRoute><Ratings /></ProtectedRoute>} />
                <Route path="/" element={<Navigate to="/browse" />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;