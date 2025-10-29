/** @jsxImportSource react */
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useState, useEffect } from 'react';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ForgotPasswordOTPPage from './pages/ForgotPasswordOTPPage';
import VerifyOTPPage from './pages/VerifyOTPPage';
import ResetPasswordOTPPage from './pages/ResetPasswordOTPPage';
import ProfilePage from './pages/ProfilePage';
import LostItemsPage from './pages/LostItemsPage';
import FoundItemsPage from './pages/FoundItemsPage';
import LostItemDetailPage from './pages/LostItemDetailPage';
import FoundItemDetailPage from './pages/FoundItemDetailPage';
import ReportLostItemPage from './pages/ReportLostItemPage';
import ReportFoundItemPage from './pages/ReportFoundItemPage';
import MatchesPage from './pages/MatchesPage';
import MatchDetailPage from './pages/MatchDetailPage';
import MessagesPage from './pages/MessagesPage';
import ConversationPage from './pages/ConversationPage';
import NotificationsPage from './pages/NotificationsPage';
import MapPage from './pages/MapPage';
import NotFoundPage from './pages/NotFoundPage';
import HowItWorks from './pages/HowItWorks';
import ContactSupport from './pages/ContactSupport';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import GDPRCompliance from './pages/GDPRCompliance';
import Accessibility from './pages/Accessibility';
import LogoutPage from './pages/LogoutPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminItems from './pages/AdminItems';
import AdminReports from './pages/AdminReports';
import AdminSettings from './pages/AdminSettings';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';

// Context
import { AuthProvider } from './context/AuthContext';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(savedMode === 'true');
    } else {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDarkMode);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#2196f3' },
      secondary: { main: '#f50057' },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  });

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout toggleDarkMode={toggleDarkMode} darkMode={darkMode} />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'login', element: <LoginPage /> },
        { path: 'register', element: <RegisterPage /> },

        { path: 'forgot-password', element: <ForgotPasswordPage /> },
        { path: 'forgot-password/otp', element: <ForgotPasswordOTPPage /> },
        { path: 'verify-otp', element: <VerifyOTPPage /> },
        { path: 'reset-password-otp', element: <ResetPasswordOTPPage /> },

        { path: 'lost-items', element: <LostItemsPage /> },
        { path: 'found-items', element: <FoundItemsPage /> },
        { path: 'lost-items/:id', element: <LostItemDetailPage /> },
        { path: 'found-items/:id', element: <FoundItemDetailPage /> },

        { path: 'report-lost-item', element: (
          <ProtectedRoute>
            <ReportLostItemPage />
          </ProtectedRoute>
        ) },
        { path: 'report-found-item', element: (
          <ProtectedRoute>
            <ReportFoundItemPage />
          </ProtectedRoute>
        ) },

        { path: 'matches', element: (
          <ProtectedRoute>
            <MatchesPage />
          </ProtectedRoute>
        ) },
        { path: 'matches/:id', element: (
          <ProtectedRoute>
            <MatchDetailPage />
          </ProtectedRoute>
        ) },

        { path: 'messages', element: (
          <ProtectedRoute>
            <MessagesPage />
          </ProtectedRoute>
        ) },
        { path: 'messages/:userId', element: (
          <ProtectedRoute>
            <ConversationPage />
          </ProtectedRoute>
        ) },

        { path: 'notifications', element: (
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
        ) },

        { path: 'profile', element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ) },

        { path: 'map', element: <MapPage /> },
        { path: 'how-it-works', element: <HowItWorks /> },
        { path: 'contact', element: <ContactSupport /> },
        { path: 'terms', element: <TermsOfService /> },
        { path: 'privacy', element: <PrivacyPolicy /> },
        { path: 'cookies', element: <CookiePolicy /> },
        { path: 'gdpr', element: <GDPRCompliance /> },
        { path: 'accessibility', element: <Accessibility /> },
        { path: 'logout', element: <LogoutPage /> },

        { path: '*', element: <NotFoundPage /> },
      ],
    },
    {
      path: '/admin',
      element: (
        <AdminProtectedRoute>
          <AdminLayout />
        </AdminProtectedRoute>
      ),
      children: [
        { index: true, element: <AdminDashboard /> },
        { path: 'users', element: <AdminUsers /> },
        { path: 'items', element: <AdminItems /> },
        { path: 'reports', element: <AdminReports /> },
        { path: 'settings', element: <AdminSettings /> },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <RouterProvider 
          router={router}
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;