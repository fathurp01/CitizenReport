import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import './animations.css';

// Import pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import CitizenDashboard from './pages/citizen/Dashboard';
import CreateReport from './pages/citizen/CreateReport';
import CitizenReportDetails from './pages/citizen/ReportDetails';
import ArticleList from './pages/citizen/ArticleList';
import ArticleForm from './pages/staff/ArticleForm';
import StaffDashboard from './pages/staff/Dashboard';
import StaffReportDetails from './pages/staff/ReportDetails';
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import ArticleManagement from './pages/admin/ArticleManagement';
import NotFound from './pages/NotFound';

// Import components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Import context
import { AuthProvider } from './context/AuthContext';

// Theme setup
const theme = createTheme({
  // Theme config di sini...
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/citizen" element={
              <ProtectedRoute allowedRoles={['citizen']}>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<CitizenDashboard />} />
              <Route path="create-report" element={<CreateReport />} />
              <Route path="reports/:id" element={<CitizenReportDetails />} />
              <Route path="articles" element={<ArticleList />} /> 
            </Route>

            <Route path="/staff" element={
              <ProtectedRoute allowedRoles={['village_staff']}>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<StaffDashboard />} />
              <Route path="reports/:id" element={<StaffReportDetails />} />
              <Route path="articles" element={<ArticleForm />} />
            </Route>

            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="articles" element={<ArticleManagement />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
