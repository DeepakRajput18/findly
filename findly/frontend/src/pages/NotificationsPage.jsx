import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Button,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  FindInPage as LostItemsIcon,
  EmojiObjects as FoundItemsIcon,
  Compare as MatchesIcon,
  Mail as MessageIcon,
  Delete as DeleteIcon,
  CheckCircle as ReadIcon,
} from '@mui/icons-material';
import { notificationsApi } from '../services/api';
import { timeAgo } from '../utils/helpers';
import AuthContext from '../context/AuthContext';

const NotificationsPage = () => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Mock data for now
        setTimeout(() => {
          const mockNotifications = [
            {
              _id: '1',
              title: 'New Match Found',
              message: 'We found a potential match for your lost iPhone.',
              type: 'match',
              reference_id: 'm1',
              created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
              read_status: false,
            },
            {
              _id: '2',
              title: 'New Message',
              message: 'John Doe sent you a message about your lost wallet.',
              type: 'message',
              reference_id: 'u1',
              created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
              read_status: false,
            },
            {
              _id: '3',
              title: 'Match Status Updated',
              message: 'Your match for the lost keys has been confirmed.',
              type: 'match_update',
              reference_id: 'm2',
              created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
              read_status: true,
            },
            {
              _id: '4',
              title: 'Similar Item Found',
              message: 'Someone reported finding a black backpack similar to yours.',
              type: 'similar_item',
              reference_id: 'f1',
              created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
              read_status: true,
            },
          ];
          
          setNotifications(mockNotifications);
          setLoading(false);
        }, 1000);
        
        // In a real app, you would use:
        // const data = await notificationsApi.getMyNotifications();
        // setNotifications(data);
        // setLoading(false);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError('Failed to fetch notifications. Please try again later.');
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      // Update UI immediately
      setNotifications(
        notifications.map((notification) =>
          notification._id === id ? { ...notification, read_status: true } : notification
        )
      );
      
      // In a real app, you would use:
      // await notificationsApi.markAsRead(id);
    } catch (error) {
      console.error('Error marking notification as read:', error);
      setError('Failed to mark notification as read. Please try again.');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      // Update UI immediately
      setNotifications(
        notifications.map((notification) => ({ ...notification, read_status: true }))
      );
      
      // In a real app, you would use:
      // await notificationsApi.markAllAsRead();
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      setError('Failed to mark all notifications as read. Please try again.');
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      // Update UI immediately
      setNotifications(notifications.filter((notification) => notification._id !== id));
      
      // In a real app, you would use:
      // await notificationsApi.deleteNotification(id);
    } catch (error) {
      console.error('Error deleting notification:', error);
      setError('Failed to delete notification. Please try again.');
    }
  };

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'match':
      case 'match_update':
        return <MatchesIcon color="primary" />;
      case 'message':
        return <MessageIcon color="primary" />;
      case 'similar_item':
        return <FoundItemsIcon color="primary" />;
      default:
        return <NotificationsIcon color="primary" />;
    }
  };

  // Get notification link based on type and reference_id
  const getNotificationLink = (type, reference_id) => {
    switch (type) {
      case 'match':
      case 'match_update':
        return `/matches/${reference_id}`;
      case 'message':
        return `/messages/${reference_id}`;
      case 'similar_item':
        return `/found-items/${reference_id}`;
      default:
        return '/';
    }
  };

  // Redirect if not logged in
  if (!user) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Alert severity="warning" sx={{ mb: 4 }}>
          You need to be logged in to view your notifications.
        </Alert>
        <Button
          variant="contained"
          component={Link}
          to="/login"
          sx={{ mr: 2 }}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          component={Link}
          to="/register"
        >
          Register
        </Button>
      </Box>
    );
  }

  const unreadCount = notifications.filter((notification) => !notification.read_status).length;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Notifications
          {unreadCount > 0 && (
            <Typography
              component="span"
              variant="h6"
              color="primary"
              sx={{ ml: 2 }}
            >
              ({unreadCount} unread)
            </Typography>
          )}
        </Typography>
        
        {unreadCount > 0 && (
          <Button
            variant="outlined"
            onClick={handleMarkAllAsRead}
          >
            Mark All as Read
          </Button>
        )}
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8, flexGrow: 1 }}>
          <CircularProgress />
        </Box>
      ) : notifications.length === 0 ? (
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            textAlign: 'center',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '300px'
          }}
        >
          <NotificationsIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No notifications
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            You don't have any notifications yet. We'll notify you when there are updates on your lost or found items.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              component={Link}
              to="/lost-items"
              sx={{ mr: 2 }}
            >
              Browse Lost Items
            </Button>
            <Button
              variant="outlined"
              component={Link}
              to="/found-items"
            >
              Browse Found Items
            </Button>
          </Box>
        </Paper>
      ) : (
        <Paper elevation={3} sx={{ borderRadius: 2, flexGrow: 1 }}>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {notifications.map((notification, index) => (
              <Box key={notification._id}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    p: 2,
                    bgcolor: !notification.read_status ? 'rgba(33, 150, 243, 0.08)' : 'inherit',
                  }}
                  secondaryAction={
                    <Box>
                      {!notification.read_status && (
                        <IconButton
                          edge="end"
                          aria-label="mark as read"
                          onClick={() => handleMarkAsRead(notification._id)}
                          sx={{ mr: 1 }}
                        >
                          <ReadIcon />
                        </IconButton>
                      )}
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteNotification(notification._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemIcon>
                    {getNotificationIcon(notification.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle1"
                        fontWeight={!notification.read_status ? 'bold' : 'normal'}
                      >
                        {notification.title}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                          sx={{
                            display: 'block',
                            fontWeight: !notification.read_status ? 'bold' : 'normal',
                          }}
                        >
                          {notification.message}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                          >
                            {timeAgo(notification.created_at)}
                          </Typography>
                          <Button
                            size="small"
                            component={Link}
                            to={getNotificationLink(notification.type, notification.reference_id)}
                            color="primary"
                          >
                            View Details
                          </Button>
                        </Box>
                      </>
                    }
                    secondaryTypographyProps={{ component: 'div' }}
                  />
                </ListItem>
                {index < notifications.length - 1 && <Divider component="li" />}
              </Box>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default NotificationsPage; 