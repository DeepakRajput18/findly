import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Badge,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';
import { messagesApi } from '../services/api';
import { timeAgo, getInitials } from '../utils/helpers';
import AuthContext from '../context/AuthContext';

const MessagesPage = () => {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Mock data for now
        setTimeout(() => {
          const mockConversations = [
            {
              user_id: {
                _id: 'u1',
                name: 'John Doe',
                profile: null,
              },
              last_message: {
                content: 'Hi, I found your wallet. When can we meet?',
                created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
                is_read: false,
                sender_id: 'u1',
              },
              unread_count: 2,
            },
            {
              user_id: {
                _id: 'u2',
                name: 'Jane Smith',
                profile: null,
              },
              last_message: {
                content: 'Thank you for returning my phone!',
                created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
                is_read: true,
                sender_id: 'current_user',
              },
              unread_count: 0,
            },
            {
              user_id: {
                _id: 'u3',
                name: 'Mike Johnson',
                profile: null,
              },
              last_message: {
                content: 'I think I found your keys. They have a red keychain.',
                created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
                is_read: true,
                sender_id: 'u3',
              },
              unread_count: 0,
            },
          ];
          
          setConversations(mockConversations);
          setLoading(false);
        }, 1000);
        
        // In a real app, you would use:
        // const data = await messagesApi.getMyConversations();
        // setConversations(data);
        // setLoading(false);
      } catch (error) {
        console.error('Error fetching conversations:', error);
        setError('Failed to fetch conversations. Please try again later.');
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  // Redirect if not logged in
  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ mb: 4 }}>
          You need to be logged in to view your messages.
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
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Messages
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress />
        </Box>
      ) : conversations.length === 0 ? (
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom>
            No messages yet
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            You don't have any conversations yet. Start by browsing lost and found items.
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
        <Paper elevation={3} sx={{ borderRadius: 2 }}>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {conversations.map((conversation, index) => (
              <Box key={conversation.user_id._id}>
                <ListItem
                  alignItems="flex-start"
                  component={Link}
                  to={`/messages/${conversation.user_id._id}`}
                  sx={{
                    p: 2,
                    transition: 'background-color 0.3s',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                    cursor: 'pointer',
                    bgcolor: conversation.unread_count > 0 ? 'rgba(33, 150, 243, 0.08)' : 'inherit',
                  }}
                >
                  <ListItemAvatar>
                    <Badge
                      color="primary"
                      badgeContent={conversation.unread_count}
                      overlap="circular"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                    >
                      <Avatar src={conversation.user_id.profile || ''}>
                        {!conversation.user_id.profile && getInitials(conversation.user_id.name)}
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle1"
                        fontWeight={conversation.unread_count > 0 ? 'bold' : 'normal'}
                      >
                        {conversation.user_id.name}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                          sx={{
                            display: 'inline',
                            fontWeight: conversation.unread_count > 0 ? 'bold' : 'normal',
                          }}
                        >
                          {conversation.last_message.sender_id === 'current_user' ? 'You: ' : ''}
                          {conversation.last_message.content.length > 50
                            ? `${conversation.last_message.content.substring(0, 50)}...`
                            : conversation.last_message.content}
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                          sx={{ display: 'block', mt: 0.5 }}
                        >
                          {timeAgo(conversation.last_message.created_at)}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {index < conversations.length - 1 && <Divider variant="inset" component="li" />}
              </Box>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
};

export default MessagesPage; 