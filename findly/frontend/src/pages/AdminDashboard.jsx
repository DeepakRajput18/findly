import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  TrendingUp as TrendingUpIcon,
  PeopleAlt as PeopleIcon,
  FindInPage as LostItemsIcon,
  EmojiObjects as FoundItemsIcon,
  CompareArrows as MatchesIcon,
  Flag as ReportIcon,
  Today as TodayIcon,
  ViewList as ViewListIcon,
  Person as PersonIcon,
  MoreVert as MoreVertIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';

// Chart.js components
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, BarElement } from 'chart.js';
import { Pie, Line, Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, ChartTooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, BarElement);

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalItems: 0,
    matchRate: 0,
    activeUsers: 0,
    lostItems: 0,
    foundItems: 0,
    resolvedItems: 0,
    pendingReports: 0
  });
  
  const [recentActivity, setRecentActivity] = useState([]);
  const [trendData, setTrendData] = useState({});
  const [itemTypeData, setItemTypeData] = useState({});
  const [userGrowthData, setUserGrowthData] = useState({});

  // Simulate loading data from an API
  useEffect(() => {
    // Mock data
    setTimeout(() => {
      setStats({
        totalUsers: 1254,
        totalItems: 876,
        matchRate: 42,
        activeUsers: 342,
        lostItems: 452,
        foundItems: 424,
        resolvedItems: 218,
        pendingReports: 14
      });
      
      // Mock recent activity
      setRecentActivity([
        { id: 1, type: 'user', action: 'registered', timestamp: '10 minutes ago', name: 'John Doe' },
        { id: 2, type: 'lost', action: 'reported', timestamp: '30 minutes ago', name: 'iPhone 13' },
        { id: 3, type: 'found', action: 'reported', timestamp: '1 hour ago', name: 'Car Keys' },
        { id: 4, type: 'match', action: 'created', timestamp: '2 hours ago', name: 'Wallet matched' },
        { id: 5, type: 'report', action: 'submitted', timestamp: '3 hours ago', name: 'Spam report' },
      ]);
      
      // Mock trend data (active items over time)
      setTrendData({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: 'Lost Items',
            data: [65, 72, 86, 74, 80, 92, 98],
            borderColor: 'rgb(244, 67, 54)',
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            tension: 0.2,
          },
          {
            label: 'Found Items',
            data: [42, 56, 65, 70, 75, 85, 90],
            borderColor: 'rgb(76, 175, 80)',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            tension: 0.2,
          },
        ],
      });
      
      // Mock item type distribution
      setItemTypeData({
        labels: ['Electronics', 'Clothing', 'Documents', 'Jewelry', 'Other'],
        datasets: [
          {
            data: [35, 20, 15, 10, 20],
            backgroundColor: [
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(153, 102, 255, 0.8)',
              'rgba(255, 159, 64, 0.8)',
            ],
            borderWidth: 1,
          },
        ],
      });
      
      // Mock user growth data
      setUserGrowthData({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: 'New Users',
            data: [45, 58, 70, 82, 95, 110, 125],
            backgroundColor: 'rgba(156, 39, 176, 0.6)',
          },
        ],
      });
      
      setLoading(false);
    }, 1000);
  }, []);

  // Get avatar for activity type
  const getActivityAvatar = (type) => {
    switch(type) {
      case 'user':
        return <Avatar sx={{ bgcolor: 'primary.main' }}><PersonIcon /></Avatar>;
      case 'lost':
        return <Avatar sx={{ bgcolor: 'error.main' }}><LostItemsIcon /></Avatar>;
      case 'found':
        return <Avatar sx={{ bgcolor: 'success.main' }}><FoundItemsIcon /></Avatar>;
      case 'match':
        return <Avatar sx={{ bgcolor: 'info.main' }}><MatchesIcon /></Avatar>;
      case 'report':
        return <Avatar sx={{ bgcolor: 'warning.main' }}><ReportIcon /></Avatar>;
      default:
        return <Avatar><DashboardIcon /></Avatar>;
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <DashboardIcon fontSize="large" sx={{ mr: 2, color: 'primary.main' }} />
          <Typography variant="h4">Dashboard</Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Welcome to the Findly admin dashboard. Here's an overview of your platform's performance.
        </Typography>
      </Paper>

      {loading ? (
        <Box sx={{ my: 5 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Loading dashboard data...</Typography>
          <LinearProgress />
        </Box>
      ) : (
        <>
          {/* Key Metrics */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PeopleIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography variant="h6">Total Users</Typography>
                  </Box>
                  <Typography variant="h3" sx={{ mb: 1 }}>
                    {stats.totalUsers.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stats.activeUsers} active in last 30 days
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ViewListIcon sx={{ color: 'success.main', mr: 1 }} />
                    <Typography variant="h6">Total Items</Typography>
                  </Box>
                  <Typography variant="h3" sx={{ mb: 1 }}>
                    {stats.totalItems.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stats.lostItems} lost, {stats.foundItems} found
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <MatchesIcon sx={{ color: 'info.main', mr: 1 }} />
                    <Typography variant="h6">Match Rate</Typography>
                  </Box>
                  <Typography variant="h3" sx={{ mb: 1 }}>
                    {stats.matchRate}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stats.resolvedItems} items successfully returned
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ReportIcon sx={{ color: 'warning.main', mr: 1 }} />
                    <Typography variant="h6">Pending Reports</Typography>
                  </Box>
                  <Typography variant="h3" sx={{ mb: 1 }}>
                    {stats.pendingReports}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Requires your attention
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Charts Row */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={8}>
              <Card sx={{ height: '100%', borderRadius: 2 }}>
                <CardHeader 
                  title="Activity Trends" 
                  subheader="Lost and found items over time"
                  action={
                    <Tooltip title="More Options">
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    </Tooltip>
                  }
                />
                <Divider />
                <CardContent>
                  <Box sx={{ height: 300, pt: 1 }}>
                    <Line 
                      data={trendData} 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true
                          }
                        }
                      }} 
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', borderRadius: 2 }}>
                <CardHeader 
                  title="Item Categories" 
                  subheader="Distribution by type"
                />
                <Divider />
                <CardContent>
                  <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
                    <Pie 
                      data={itemTypeData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Bottom Row */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', borderRadius: 2 }}>
                <CardHeader 
                  title="Recent Activity" 
                  subheader="Latest platform events"
                  action={
                    <Button 
                      size="small" 
                      endIcon={<ArrowForwardIcon />}
                    >
                      View All
                    </Button>
                  }
                />
                <Divider />
                <List>
                  {recentActivity.map((activity) => (
                    <ListItem key={activity.id} alignItems="flex-start">
                      <ListItemAvatar>
                        {getActivityAvatar(activity.type)}
                      </ListItemAvatar>
                      <ListItemText
                        primary={activity.name}
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.primary">
                              {activity.action}
                            </Typography>
                            {` — ${activity.timestamp}`}
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Card sx={{ height: '100%', borderRadius: 2 }}>
                <CardHeader 
                  title="User Growth" 
                  subheader="New registrations per month"
                  action={
                    <Tooltip title="More Options">
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    </Tooltip>
                  }
                />
                <Divider />
                <CardContent>
                  <Box sx={{ height: 300 }}>
                    <Bar 
                      data={userGrowthData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true
                          }
                        }
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default AdminDashboard; 