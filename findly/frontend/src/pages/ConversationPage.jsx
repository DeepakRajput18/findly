import { useState, useEffect, useContext, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Avatar,
  CircularProgress,
  Alert,
  Divider,
  IconButton,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import { messagesApi } from '../services/api';
import { formatDate, getInitials } from '../utils/helpers';
import AuthContext from '../context/AuthContext';

const ConversationPage = () => {
  const { userId } = useParams();
  const { user } = useContext(AuthContext);
  const messagesEndRef = useRef(null);
  
  const [otherUser, setOtherUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Mock data for now
        setTimeout(() => {
          const mockUser = {
            _id: userId,
            name: 'John Doe',
            email: 'john@example.com',
            phone: '555-123-4567',
            profile: null,
          };
          
          const mockMessages = [
            {
              _id: '1',
              content: 'Hi, I think I found your wallet.',
              created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
              sender_id: userId,
              receiver_id: 'current_user',
              is_read: true,
            },
            {
              _id: '2',
              content: 'Oh really? Can you describe it?',
              created_at: new Date(Date.now() - 1000 * 60 * 55).toISOString(), // 55 minutes ago
              sender_id: 'current_user',
              receiver_id: userId,
              is_read: true,
            },
            {
              _id: '3',
              content: 'It\'s a black leather wallet with a red stripe. It has your ID inside.',
              created_at: new Date(Date.now() - 1000 * 60 * 50).toISOString(), // 50 minutes ago
              sender_id: userId,
              receiver_id: 'current_user',
              is_read: true,
            },
            {
              _id: '4',
              content: 'That\'s definitely mine! Where and when can we meet?',
              created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
              sender_id: 'current_user',
              receiver_id: userId,
              is_read: true,
            },
            {
              _id: '5',
              content: 'I\'m available tomorrow at the coffee shop on Main Street around 3 PM. Does that work for you?',
              created_at: new Date(Date.now() - 1000 * 60 * 40).toISOString(), // 40 minutes ago
              sender_id: userId,
              receiver_id: 'current_user',
              is_read: true,
            },
          ];
          
          setOtherUser(mockUser);
          setMessages(mockMessages);
          setLoading(false);
          
          // Scroll to bottom after messages load
          setTimeout(scrollToBottom, 100);
        }, 1000);
        
        // In a real app, you would use:
        // const data = await messagesApi.getConversation(userId);
        // setOtherUser(data.user);
        // setMessages(data.messages);
        // setLoading(false);
        // setTimeout(scrollToBottom, 100);
      } catch (error) {
        console.error('Error fetching conversation:', error);
        setError('Failed to fetch conversation. Please try again later.');
        setLoading(false);
      }
    };

    fetchConversation();
  }, [userId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    try {
      setSending(true);
      
      // Create new message object
      const messageData = {
        content: newMessage,
        created_at: new Date().toISOString(),
        sender_id: 'current_user',
        receiver_id: userId,
        is_read: false,
        _id: `temp-${Date.now()}`, // Temporary ID
      };
      
      // Add to messages immediately for UI responsiveness
      setMessages([...messages, messageData]);
      setNewMessage('');
      
      // Simulate API call
      setTimeout(() => {
        setSending(false);
      }, 500);
      
      // In a real app, you would use:
      // await messagesApi.sendMessage({
      //   content: newMessage,
      //   receiver_id: userId,
      // });
      // setSending(false);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
      setSending(false);
    }
  };

  // Redirect if not logged in
  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ mb: 4 }}>
          You need to be logged in to view conversations.
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
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        component={Link}
        to="/messages"
        sx={{ mb: 4 }}
      >
        Back to Messages
      </Button>
      
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}
      
      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        {/* Conversation header */}
        {loading ? (
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress size={24} />
          </Box>
        ) : otherUser && (
          <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white', display: 'flex', alignItems: 'center' }}>
            <Avatar 
              src={otherUser.profile || ''} 
              sx={{ mr: 2, bgcolor: 'white', color: 'primary.main' }}
            >
              {!otherUser.profile && getInitials(otherUser.name)}
            </Avatar>
            <Box>
              <Typography variant="h6">{otherUser.name}</Typography>
              <Typography variant="body2">{otherUser.email}</Typography>
            </Box>
          </Box>
        )}
        
        <Divider />
        
        {/* Messages area */}
        <Box 
          sx={{ 
            height: 400, 
            overflowY: 'auto', 
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </Box>
          ) : messages.length === 0 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography variant="body1" color="text.secondary">
                No messages yet. Start the conversation!
              </Typography>
            </Box>
          ) : (
            messages.map((message) => (
              <Box
                key={message._id}
                sx={{
                  display: 'flex',
                  justifyContent: message.sender_id === 'current_user' ? 'flex-end' : 'flex-start',
                  mb: 2,
                }}
              >
                {message.sender_id !== 'current_user' && (
                  <Avatar 
                    src={otherUser.profile || ''} 
                    sx={{ mr: 1, width: 32, height: 32, bgcolor: 'primary.main' }}
                  >
                    {!otherUser.profile && getInitials(otherUser.name)}
                  </Avatar>
                )}
                <Box
                  sx={{
                    maxWidth: '70%',
                    p: 2,
                    borderRadius: 2,
                    bgcolor: message.sender_id === 'current_user' ? 'primary.main' : 'grey.100',
                    color: message.sender_id === 'current_user' ? 'white' : 'text.primary',
                  }}
                >
                  <Typography variant="body1">{message.content}</Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      display: 'block', 
                      mt: 0.5,
                      textAlign: 'right',
                      color: message.sender_id === 'current_user' ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                    }}
                  >
                    {formatDate(message.created_at)}
                  </Typography>
                </Box>
                {message.sender_id === 'current_user' && (
                  <Avatar 
                    src={user.profile || ''} 
                    sx={{ ml: 1, width: 32, height: 32, bgcolor: 'secondary.main' }}
                  >
                    {!user.profile && getInitials(user.name)}
                  </Avatar>
                )}
              </Box>
            ))
          )}
          <div ref={messagesEndRef} />
        </Box>
        
        <Divider />
        
        {/* Message input */}
        <Box 
          component="form" 
          onSubmit={handleSendMessage}
          sx={{ 
            p: 2, 
            display: 'flex', 
            alignItems: 'center',
            bgcolor: 'background.paper',
          }}
        >
          <TextField
            fullWidth
            placeholder="Type a message..."
            variant="outlined"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={loading || sending}
            sx={{ mr: 1 }}
          />
          <IconButton 
            color="primary" 
            type="submit" 
            disabled={loading || sending || !newMessage.trim()}
            sx={{ p: 1 }}
          >
            {sending ? <CircularProgress size={24} /> : <SendIcon />}
          </IconButton>
        </Box>
      </Paper>
    </Container>
  );
};

export default ConversationPage; 