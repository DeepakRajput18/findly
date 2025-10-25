import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { CircularProgress, Box } from '@mui/material';

// AdminProtectedRoute component that redirects to login if user is not authenticated or is not an admin
const AdminProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // If auth is still loading, show loading indicator
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // If not logged in, redirect to login with returnUrl
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If user is not an admin, redirect to home page
  if (!user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If logged in and is admin, render the protected component
  return children;
};

export default AdminProtectedRoute; 