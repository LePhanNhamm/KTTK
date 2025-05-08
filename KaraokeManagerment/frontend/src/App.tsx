import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Rooms from './pages/Rooms';
import Profile from './pages/Profile';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Layout>
                <Routes>
                  {/* Dashboard - Trang chủ */}
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/bookings" element={<Bookings />} />
                  <Route path="/bookings/new" element={<Bookings />} />
                  <Route path="/bookings/:id" element={<Bookings />} />
                  
                  <Route path="/rooms" element={<Rooms />} />
                  <Route path="/rooms/new" element={<Rooms />} />
                  <Route path="/rooms/:id" element={<Rooms />} />
                  
                  {/* Profile - Thông tin cá nhân */}
                  <Route path="/profile" element={<Profile />} />
                  
                  {/* Redirect unknown routes to Dashboard */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;