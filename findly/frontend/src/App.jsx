import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

  // Check for dark mode preference
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(savedMode === 'true');
    } else {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDarkMode);
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
  };

  // Create theme
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#2196f3',
      },
      secondary: {
        main: '#f50057',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 500,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 500,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 500,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 500,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 500,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 500,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 500,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Main App Routes */}
            <Route path="/" element={<MainLayout toggleDarkMode={toggleDarkMode} darkMode={darkMode} />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
              <Route path="forgot-password-otp" element={<ForgotPasswordOTPPage />} />
              <Route path="verify-otp" element={<VerifyOTPPage />} />
              <Route path="reset-password" element={<ResetPasswordOTPPage />} />
              <Route path="logout" element={<ProtectedRoute><LogoutPage /></ProtectedRoute>} />
              
              {/* Protected Routes */}
              <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="lost-items" element={<ProtectedRoute><LostItemsPage /></ProtectedRoute>} />
              <Route path="lost-items/:id" element={<ProtectedRoute><LostItemDetailPage /></ProtectedRoute>} />
              <Route path="report-lost-item" element={<ProtectedRoute><ReportLostItemPage /></ProtectedRoute>} />
              <Route path="found-items" element={<ProtectedRoute><FoundItemsPage /></ProtectedRoute>} />
              <Route path="found-items/:id" element={<ProtectedRoute><FoundItemDetailPage /></ProtectedRoute>} />
              <Route path="report-found-item" element={<ProtectedRoute><ReportFoundItemPage /></ProtectedRoute>} />
              <Route path="matches" element={<ProtectedRoute><MatchesPage /></ProtectedRoute>} />
              <Route path="matches/:id" element={<ProtectedRoute><MatchDetailPage /></ProtectedRoute>} />
              <Route path="messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
              <Route path="messages/:userId" element={<ProtectedRoute><ConversationPage /></ProtectedRoute>} />
              <Route path="notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
              <Route path="map" element={<ProtectedRoute><MapPage /></ProtectedRoute>} />
              
              {/* Public Routes */}
              <Route path="how-it-works" element={<HowItWorks />} />
              <Route path="contact" element={<ContactSupport />} />
              <Route path="terms" element={<TermsOfService />} />
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="cookies" element={<CookiePolicy />} />
              <Route path="gdpr" element={<GDPRCompliance />} />
              <Route path="accessibility" element={<Accessibility />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            
            {/* Admin Routes with AdminLayout */}
            <Route path="/admin" element={
              <AdminProtectedRoute>
                <AdminLayout toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
              </AdminProtectedRoute>
            }>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="items" element={<AdminItems />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;