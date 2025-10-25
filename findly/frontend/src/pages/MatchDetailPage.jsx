import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Divider,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';
import { matchesApi } from '../services/api';
import { formatDate, getStatusColor } from '../utils/helpers';
import AuthContext from '../context/AuthContext';

const MatchDetailPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Mock data for now
        setTimeout(() => {
          setMatch({
            _id: id,
            lost_item: {
              _id: 'l1',
              item_name: 'iPhone 13',
              description: 'Black iPhone 13 with a red case. Has a crack on the top right corner of the screen.',
              category: 'Electronics',
              last_seen_location: 'Central Park',
              lost_date: new Date().toISOString(),
              status: 'Lost',
              image_url: 'https://via.placeholder.com/600x400?text=iPhone',
              user_id: {
                _id: 'u1',
                name: 'John Doe',
                email: 'john@example.com',
                phone: '555-123-4567'
              }
            },
            found_item: {
              _id: 'f1',
              item_name: 'iPhone found',
              description: 'Found a black iPhone with a red case in Central Park near the fountain.',
              category: 'Electronics',
              found_location: 'Central Park, near fountain',
              found_date: new Date().toISOString(),
              status: 'Found',
              image_url: 'https://via.placeholder.com/600x400?text=iPhone+Found',
              user_id: {
                _id: 'u2',
                name: 'Jane Smith',
                email: 'jane@example.com',
                phone: '555-987-6543'
              }
            },
            match_percentage: 95,
            status: 'Pending',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            match_details: [
              { field: 'Category', match: true },
              { field: 'Location', match: true },
              { field: 'Date', match: true },
              { field: 'Description', match: true },
            ]
          });
          setLoading(false);
        }, 1000);
        
        // In a real app, you would use:
        // const data = await matchesApi.getMatchById(id);
        // setMatch(data);
        // setLoading(false);
      } catch (error) {
        console.error('Error fetching match:', error);
        setError('Failed to fetch match details. Please try again later.');
        setLoading(false);
      }
    };

    fetchMatch();
  }, [id]);

  const handleConfirmMatch = async () => {
    try {
      setActionLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setMatch({
          ...match,
          status: 'Confirmed',
          updated_at: new Date().toISOString()
        });
        setActionLoading(false);
        setConfirmDialogOpen(false);
      }, 1000);
      
      // In a real app, you would use:
      // await matchesApi.updateMatchStatus(id, { status: 'Confirmed' });
      // const updatedMatch = await matchesApi.getMatchById(id);
      // setMatch(updatedMatch);
      // setActionLoading(false);
      // setConfirmDialogOpen(false);
    } catch (error) {
      console.error('Error confirming match:', error);
      setError('Failed to confirm match. Please try again later.');
      setActionLoading(false);
    }
  };

  const handleRejectMatch = async () => {
    try {
      setActionLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setMatch({
          ...match,
          status: 'Rejected',
          updated_at: new Date().toISOString()
        });
        setActionLoading(false);
        setRejectDialogOpen(false);
      }, 1000);
      
      // In a real app, you would use:
      // await matchesApi.updateMatchStatus(id, { status: 'Rejected' });
      // const updatedMatch = await matchesApi.getMatchById(id);
      // setMatch(updatedMatch);
      // setActionLoading(false);
      // setRejectDialogOpen(false);
    } catch (error) {
      console.error('Error rejecting match:', error);
      setError('Failed to reject match. Please try again later.');
      setActionLoading(false);
    }
  };

  // Redirect if not logged in
  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ mb: 4 }}>
          You need to be logged in to view match details.
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

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          component={Link}
          to="/matches"
          sx={{ mt: 2 }}
        >
          Back to Matches
        </Button>
      </Container>
    );
  }

  if (!match) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="info" sx={{ mb: 4 }}>
          Match not found.
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          component={Link}
          to="/matches"
          sx={{ mt: 2 }}
        >
          Back to Matches
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        component={Link}
        to="/matches"
        sx={{ mb: 4 }}
      >
        Back to Matches
      </Button>
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Match Details
          </Typography>
          <Chip
            label={match.status}
            sx={{
              backgroundColor: getStatusColor(match.status),
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1rem',
              py: 1,
              px: 2,
            }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Chip
            label={`${match.match_percentage}% Match`}
            color="primary"
            sx={{ fontWeight: 'bold', fontSize: '1.1rem', py: 1.5, px: 2 }}
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          Created on: {formatDate(match.created_at)}
        </Typography>
        
        {match.status !== 'Pending' && (
          <Typography variant="body2" color="text.secondary" paragraph>
            Updated on: {formatDate(match.updated_at)}
          </Typography>
        )}
        
        <Divider sx={{ my: 3 }} />
        
        <Grid container spacing={4}>
          {/* Lost Item */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Lost Item
            </Typography>
            
            <Card sx={{ mb: 3 }}>
              <CardMedia
                component="img"
                height="250"
                image={match.lost_item.image_url || 'https://via.placeholder.com/600x400?text=No+Image'}
                alt={match.lost_item.item_name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {match.lost_item.item_name}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Category:</strong> {match.lost_item.category}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Last Seen:</strong> {match.lost_item.last_seen_location}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Lost Date:</strong> {formatDate(match.lost_item.lost_date)}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Status:</strong> {match.lost_item.status}
                </Typography>
                
                <Typography variant="body2" paragraph>
                  <strong>Description:</strong> {match.lost_item.description}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Reported By:</strong> {match.lost_item.user_id.name}
                </Typography>
                
                <Button
                  variant="outlined"
                  component={Link}
                  to={`/lost-items/${match.lost_item._id}`}
                  fullWidth
                >
                  View Lost Item
                </Button>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Found Item */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Found Item
            </Typography>
            
            <Card sx={{ mb: 3 }}>
              <CardMedia
                component="img"
                height="250"
                image={match.found_item.image_url || 'https://via.placeholder.com/600x400?text=No+Image'}
                alt={match.found_item.item_name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {match.found_item.item_name}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Category:</strong> {match.found_item.category}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Found At:</strong> {match.found_item.found_location}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Found Date:</strong> {formatDate(match.found_item.found_date)}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Status:</strong> {match.found_item.status}
                </Typography>
                
                <Typography variant="body2" paragraph>
                  <strong>Description:</strong> {match.found_item.description}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Reported By:</strong> {match.found_item.user_id.name}
                </Typography>
                
                <Button
                  variant="outlined"
                  component={Link}
                  to={`/found-items/${match.found_item._id}`}
                  fullWidth
                >
                  View Found Item
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h5" gutterBottom>
          Match Details
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {match.match_details.map((detail, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  textAlign: 'center',
                  bgcolor: detail.match ? 'success.light' : 'error.light',
                  color: 'white',
                }}
              >
                <Typography variant="body1">
                  {detail.field}: {detail.match ? 'Match' : 'No Match'}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        
        {match.status === 'Pending' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
            <Button
              variant="contained"
              color="success"
              startIcon={<CheckIcon />}
              onClick={() => setConfirmDialogOpen(true)}
              disabled={actionLoading}
              sx={{ px: 4, py: 1 }}
            >
              Confirm Match
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<CloseIcon />}
              onClick={() => setRejectDialogOpen(true)}
              disabled={actionLoading}
              sx={{ px: 4, py: 1 }}
            >
              Reject Match
            </Button>
          </Box>
        )}
        
        {match.status === 'Confirmed' && (
          <Box sx={{ mt: 4 }}>
            <Alert severity="success">
              You have confirmed this match. Contact the finder to arrange item recovery.
            </Alert>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              component={Link}
              to={`/messages/${match.found_item.user_id._id}`}
            >
              Contact Finder
            </Button>
          </Box>
        )}
        
        {match.status === 'Rejected' && (
          <Box sx={{ mt: 4 }}>
            <Alert severity="info">
              You have rejected this match. Continue searching for your item.
            </Alert>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              component={Link}
              to="/found-items"
            >
              Browse Found Items
            </Button>
          </Box>
        )}
      </Paper>
      
      {/* Confirm Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => !actionLoading && setConfirmDialogOpen(false)}
      >
        <DialogTitle>Confirm Match</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure this is your lost item? Confirming the match will notify the finder and allow you to arrange recovery of your item.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setConfirmDialogOpen(false)} 
            disabled={actionLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmMatch} 
            variant="contained" 
            color="success"
            disabled={actionLoading}
          >
            {actionLoading ? <CircularProgress size={24} /> : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Reject Dialog */}
      <Dialog
        open={rejectDialogOpen}
        onClose={() => !actionLoading && setRejectDialogOpen(false)}
      >
        <DialogTitle>Reject Match</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure this is not your lost item? Rejecting the match will remove it from your matches list.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setRejectDialogOpen(false)} 
            disabled={actionLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleRejectMatch} 
            variant="contained" 
            color="error"
            disabled={actionLoading}
          >
            {actionLoading ? <CircularProgress size={24} /> : 'Reject'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MatchDetailPage; 