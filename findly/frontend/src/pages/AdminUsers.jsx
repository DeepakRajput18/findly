import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Avatar,
  MenuItem,
  Menu,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  ListItemIcon,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Snackbar,
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  PersonAdd as AddIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
  Check as CheckIcon,
  Block as BlockIcon,
  Mail as MailIcon,
  Visibility as ViewIcon,
  AdminPanelSettings as AdminIcon,
  Person as PersonIcon,
  GetApp as DownloadIcon,
} from '@mui/icons-material';

const AdminUsers = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState('');
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    status: 'active',
  });
  const [formErrors, setFormErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Fetch users data
  useEffect(() => {
    // Mock data
    const mockUsers = Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      status: ['active', 'inactive', 'suspended'][Math.floor(Math.random() * 3)],
      role: Math.random() > 0.8 ? 'admin' : 'user',
      registeredDate: new Date(2022, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      lastLogin: new Date(2023, Math.floor(Math.random() * 3), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      items: Math.floor(Math.random() * 10),
    }));

    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 500);
  }, []);

  // Filter users based on search term and status
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by selected status
    if (selectedStatus === 'all') {
      return matchesSearch;
    } else if (selectedStatus === 'admin') {
      return matchesSearch && user.role === 'admin';
    } else {
      return matchesSearch && user.status === selectedStatus;
    }
  });

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle search change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  // Handle filter menu
  const handleFilterOpen = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    setFilterAnchorEl(null);
    setPage(0);
  };

  // User action menu
  const handleUserMenuOpen = (event, user) => {
    setUserMenuAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  // Confirmation dialog
  const handleConfirmAction = (action) => {
    setConfirmAction(action);
    setConfirmDialogOpen(true);
    handleUserMenuClose();
  };

  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
  };

  const handleActionConfirm = () => {
    // Mock action implementation
    if (confirmAction === 'delete') {
      setUsers(users.filter(user => user.id !== selectedUser.id));
    } else if (confirmAction === 'suspend') {
      setUsers(users.map(user => 
        user.id === selectedUser.id ? {...user, status: 'suspended'} : user
      ));
    } else if (confirmAction === 'activate') {
      setUsers(users.map(user => 
        user.id === selectedUser.id ? {...user, status: 'active'} : user
      ));
    } else if (confirmAction === 'makeAdmin') {
      setUsers(users.map(user => 
        user.id === selectedUser.id ? {...user, role: 'admin'} : user
      ));
    } else if (confirmAction === 'removeAdmin') {
      setUsers(users.map(user => 
        user.id === selectedUser.id ? {...user, role: 'user'} : user
      ));
    }
    
    setConfirmDialogOpen(false);
  };

  // Get dialog title and content based on action
  const getConfirmDialogContent = () => {
    if (!selectedUser) return { title: '', content: '' };
    
    switch (confirmAction) {
      case 'delete':
        return {
          title: 'Delete User',
          content: `Are you sure you want to delete ${selectedUser.name}? This action cannot be undone.`
        };
      case 'suspend':
        return {
          title: 'Suspend User',
          content: `Are you sure you want to suspend ${selectedUser.name}? They will not be able to access their account.`
        };
      case 'activate':
        return {
          title: 'Activate User',
          content: `Are you sure you want to reactivate ${selectedUser.name}'s account?`
        };
      case 'makeAdmin':
        return {
          title: 'Grant Admin Rights',
          content: `Are you sure you want to make ${selectedUser.name} an administrator? They will have full access to the admin panel.`
        };
      case 'removeAdmin':
        return {
          title: 'Remove Admin Rights',
          content: `Are you sure you want to remove administrator rights from ${selectedUser.name}?`
        };
      default:
        return { title: '', content: '' };
    }
  };

  const dialogContent = getConfirmDialogContent();

  // Open add user dialog
  const handleAddUserClick = () => {
    setAddUserDialogOpen(true);
  };

  // Close add user dialog
  const handleCloseAddDialog = () => {
    setAddUserDialogOpen(false);
    setNewUser({
      name: '',
      email: '',
      password: '',
      role: 'user',
      status: 'active',
    });
    setFormErrors({});
  };

  // Handle new user form input changes
  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };

  // Validate form
  const validateNewUserForm = () => {
    const errors = {};
    
    if (!newUser.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!newUser.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!newUser.password.trim()) {
      errors.password = 'Password is required';
    } else if (newUser.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit new user
  const handleAddUser = () => {
    if (!validateNewUserForm()) {
      return;
    }
    
    // Create a new user with a unique ID and random registration/login dates
    const today = new Date().toISOString().split('T')[0];
    const id = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
    
    const userToAdd = {
      ...newUser,
      id,
      registeredDate: today,
      lastLogin: today,
      items: 0,
    };
    
    setUsers([userToAdd, ...users]);
    handleCloseAddDialog();
  };

  // Handle export users
  const handleExportUsers = () => {
    // Get filtered users based on search term and status filter
    const dataToExport = filteredUsers;
    
    // Create CSV header
    const headers = [
      'ID',
      'Name',
      'Email',
      'Role',
      'Status',
      'Registration Date',
      'Last Login',
      'Items'
    ];
    
    // Convert users to CSV rows
    const csvRows = [
      headers.join(','), // Header row
      ...dataToExport.map(user => [
        user.id,
        `"${user.name}"`, // Quote strings to handle commas in text
        `"${user.email}"`,
        user.role,
        user.status,
        user.registeredDate,
        user.lastLogin,
        user.items
      ].join(','))
    ];
    
    // Combine rows into CSV content
    const csvContent = csvRows.join('\n');
    
    // Create a Blob containing the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    
    // Create filename based on filter
    const filterLabel = selectedStatus === 'all' ? 'All' : 
                       selectedStatus === 'admin' ? 'Admin' : 
                       selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1);
    
    link.setAttribute('download', `${filterLabel}_Users_${new Date().toISOString().split('T')[0]}.csv`);
    
    // Append to the document, click and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message
    setSnackbarMessage(`${dataToExport.length} users exported successfully`);
    setSnackbarOpen(true);
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          User Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage user accounts, permissions, and monitor user activity.
        </Typography>
      </Paper>

      {/* Actions Toolbar */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            placeholder="Search users..."
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            size="small"
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button 
            variant="outlined" 
            startIcon={<FilterIcon />}
            onClick={handleFilterOpen}
            size="small"
          >
            {selectedStatus === 'all' ? 'All Users' : 
             selectedStatus === 'admin' ? 'Admins Only' :
             `${selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)} Users`}
          </Button>
          <Menu
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={handleFilterClose}
          >
            <MenuItem onClick={() => handleStatusFilter('all')}>
              All Users
            </MenuItem>
            <MenuItem onClick={() => handleStatusFilter('active')}>
              Active Users
            </MenuItem>
            <MenuItem onClick={() => handleStatusFilter('inactive')}>
              Inactive Users
            </MenuItem>
            <MenuItem onClick={() => handleStatusFilter('suspended')}>
              Suspended Users
            </MenuItem>
            <MenuItem onClick={() => handleStatusFilter('admin')}>
              Admins Only
            </MenuItem>
          </Menu>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined" 
            color="primary"
            startIcon={<DownloadIcon />}
            onClick={handleExportUsers}
          >
            Export Users
          </Button>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={handleAddUserClick}
          >
            Add New User
          </Button>
        </Box>
      </Box>

      {/* Users Table */}
      <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'background.paper' }}>
                <TableCell>User</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Registered</TableCell>
                <TableCell>Last Login</TableCell>
                <TableCell>Items</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    Loading users...
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TableRow key={user.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ mr: 2, bgcolor: user.role === 'admin' ? 'secondary.main' : 'primary.main' }}>
                            {user.role === 'admin' ? <AdminIcon /> : <PersonIcon />}
                          </Avatar>
                          <Box>
                            <Typography variant="body2">{user.name}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {user.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.status}
                          color={
                            user.status === 'active' 
                              ? 'success' 
                              : user.status === 'inactive' 
                                ? 'default' 
                                : 'error'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.role}
                          color={user.role === 'admin' ? 'secondary' : 'primary'}
                          size="small"
                          icon={user.role === 'admin' ? <AdminIcon /> : <PersonIcon />}
                        />
                      </TableCell>
                      <TableCell>{user.registeredDate}</TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>{user.items}</TableCell>
                      <TableCell align="right">
                        <IconButton size="small" color="primary">
                          <ViewIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="primary">
                          <MailIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={(e) => handleUserMenuOpen(e, user)}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* User Action Menu */}
      <Menu
        anchorEl={userMenuAnchorEl}
        open={Boolean(userMenuAnchorEl)}
        onClose={handleUserMenuClose}
      >
        <MenuItem onClick={handleUserMenuClose}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit User
        </MenuItem>
        <MenuItem onClick={handleUserMenuClose}>
          <ListItemIcon>
            <ViewIcon fontSize="small" />
          </ListItemIcon>
          View Details
        </MenuItem>
        {selectedUser && selectedUser.status !== 'suspended' && (
          <MenuItem onClick={() => handleConfirmAction('suspend')}>
            <ListItemIcon>
              <BlockIcon fontSize="small" color="error" />
            </ListItemIcon>
            <Typography color="error">Suspend User</Typography>
          </MenuItem>
        )}
        {selectedUser && selectedUser.status === 'suspended' && (
          <MenuItem onClick={() => handleConfirmAction('activate')}>
            <ListItemIcon>
              <CheckIcon fontSize="small" color="success" />
            </ListItemIcon>
            <Typography color="success.main">Activate User</Typography>
          </MenuItem>
        )}
        {selectedUser && selectedUser.role !== 'admin' && (
          <MenuItem onClick={() => handleConfirmAction('makeAdmin')}>
            <ListItemIcon>
              <AdminIcon fontSize="small" color="secondary" />
            </ListItemIcon>
            <Typography color="secondary.main">Make Admin</Typography>
          </MenuItem>
        )}
        {selectedUser && selectedUser.role === 'admin' && (
          <MenuItem onClick={() => handleConfirmAction('removeAdmin')}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            Remove Admin Rights
          </MenuItem>
        )}
        <MenuItem onClick={() => handleConfirmAction('delete')}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <Typography color="error">Delete User</Typography>
        </MenuItem>
      </Menu>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={handleConfirmDialogClose}
      >
        <DialogTitle>{dialogContent.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogContent.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDialogClose}>Cancel</Button>
          <Button 
            onClick={handleActionConfirm} 
            color={confirmAction === 'delete' || confirmAction === 'suspend' ? 'error' : 'primary'}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add New User Dialog */}
      <Dialog
        open={addUserDialogOpen}
        onClose={handleCloseAddDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Enter the details for the new user account.
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                name="name"
                label="Full Name"
                fullWidth
                variant="outlined"
                value={newUser.name}
                onChange={handleNewUserChange}
                error={!!formErrors.name}
                helperText={formErrors.name}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email Address"
                fullWidth
                variant="outlined"
                value={newUser.email}
                onChange={handleNewUserChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                value={newUser.password}
                onChange={handleNewUserChange}
                error={!!formErrors.password}
                helperText={formErrors.password}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={newUser.role}
                  onChange={handleNewUserChange}
                  label="Role"
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={newUser.status}
                  onChange={handleNewUserChange}
                  label="Status"
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="suspended">Suspended</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button onClick={handleAddUser} variant="contained" color="primary">
            Add User
          </Button>
        </DialogActions>
      </Dialog>

      {/* User Management Note */}
      <Alert severity="info" sx={{ mt: 3 }}>
        You can manage user accounts, modify permissions, and monitor user activity. 
        Admin users have full access to the admin panel.
      </Alert>

      {/* Export Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

export default AdminUsers; 