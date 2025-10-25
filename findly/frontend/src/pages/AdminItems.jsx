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
  Alert,
  Tabs,
  Tab,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FindInPage as LostItemsIcon,
  EmojiObjects as FoundItemsIcon,
  Visibility as ViewIcon,
  GetApp as DownloadIcon,
  Close as CloseIcon,
  Save as SaveIcon,
} from '@mui/icons-material';

const AdminItems = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // View/Edit/Delete Dialog States
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editedItem, setEditedItem] = useState(null);

  // Mock item data
  useEffect(() => {
    const mockItems = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
      category: ['Electronics', 'Jewelry', 'Clothing', 'Documents', 'Accessories'][Math.floor(Math.random() * 5)],
      type: i % 2 === 0 ? 'lost' : 'found',
      status: ['active', 'resolved', 'expired'][Math.floor(Math.random() * 3)],
      location: ['Downtown Park', 'Central Station', 'University Campus', 'Shopping Mall', 'City Library'][Math.floor(Math.random() * 5)],
      date: new Date(2023, 0, i % 28 + 1).toISOString().split('T')[0],
      user: `User ${Math.floor(Math.random() * 20) + 1}`,
      description: `This is a detailed description for item ${i + 1}. It includes relevant information about the item's appearance and where it was lost or found.`,
      contactInfo: `Contact information for item ${i + 1}: example${i}@email.com`,
    }));

    setTimeout(() => {
      setItems(mockItems);
      setLoading(false);
    }, 500);
  }, []);

  // Filter items based on search term and active tab
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by tab
    if (activeTab === 'all') {
      return matchesSearch;
    } else if (activeTab === 'lost') {
      return matchesSearch && item.type === 'lost';
    } else if (activeTab === 'found') {
      return matchesSearch && item.type === 'found';
    } else if (activeTab === 'resolved') {
      return matchesSearch && item.status === 'resolved';
    }
    
    return matchesSearch;
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

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setPage(0);
  };

  // Handle export items
  const handleExportItems = () => {
    // Filter items based on active tab and search term
    const dataToExport = filteredItems;
    
    // Create CSV header
    const headers = [
      'ID',
      'Name',
      'Category',
      'Type',
      'Status',
      'Location',
      'Date',
      'Reported By'
    ];
    
    // Convert items to CSV rows
    const csvRows = [
      headers.join(','), // Header row
      ...dataToExport.map(item => [
        item.id,
        `"${item.name}"`, // Quote strings to handle commas in text
        `"${item.category}"`,
        item.type,
        item.status,
        `"${item.location}"`,
        item.date,
        `"${item.user}"`
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
    
    // Create filename based on active tab
    const tabLabel = activeTab === 'all' ? 'All' : 
                    activeTab === 'lost' ? 'Lost' : 
                    activeTab === 'found' ? 'Found' : 'Resolved';
    
    link.setAttribute('download', `${tabLabel}_Items_${new Date().toISOString().split('T')[0]}.csv`);
    
    // Append to the document, click and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message
    setSnackbarMessage(`${dataToExport.length} items exported successfully`);
    setSnackbarOpen(true);
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Handle view item
  const handleViewItem = (item) => {
    setSelectedItem(item);
    setViewDialogOpen(true);
  };

  // Handle close view dialog
  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
    setSelectedItem(null);
  };

  // Handle edit item
  const handleEditItem = (item) => {
    setSelectedItem(item);
    setEditedItem({...item});
    setEditDialogOpen(true);
  };

  // Handle close edit dialog
  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedItem(null);
    setEditedItem(null);
  };

  // Handle save edit changes
  const handleSaveEditChanges = () => {
    // Update the item in the items array
    const updatedItems = items.map(item => 
      item.id === editedItem.id ? editedItem : item
    );
    
    setItems(updatedItems);
    setEditDialogOpen(false);
    setSelectedItem(null);
    setEditedItem(null);
    
    // Show success message
    setSnackbarMessage('Item updated successfully');
    setSnackbarOpen(true);
  };

  // Handle edit field change
  const handleEditFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedItem({
      ...editedItem,
      [name]: value
    });
  };

  // Handle delete item
  const handleDeleteItem = (item) => {
    setSelectedItem(item);
    setDeleteDialogOpen(true);
  };

  // Handle close delete dialog
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedItem(null);
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    // Remove the item from the items array
    const updatedItems = items.filter(item => item.id !== selectedItem.id);
    setItems(updatedItems);
    setDeleteDialogOpen(false);
    setSelectedItem(null);
    
    // Show success message
    setSnackbarMessage('Item deleted successfully');
    setSnackbarOpen(true);
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Item Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View, edit, and manage all lost and found items reported in the Findly platform.
        </Typography>
      </Paper>

      {/* Tabs */}
      <Paper sx={{ mb: 3, borderRadius: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab value="all" label="All Items" />
          <Tab 
            value="lost" 
            label="Lost Items" 
            icon={<LostItemsIcon />} 
            iconPosition="start"
          />
          <Tab 
            value="found" 
            label="Found Items" 
            icon={<FoundItemsIcon />} 
            iconPosition="start"
          />
          <Tab value="resolved" label="Resolved" />
        </Tabs>
      </Paper>

      {/* Search and Actions */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          placeholder="Search items..."
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
          variant="contained" 
          color="primary"
          startIcon={<DownloadIcon />}
          onClick={handleExportItems}
        >
          Export Items
        </Button>
      </Box>

      {/* Items Table */}
      <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'background.paper' }}>
                <TableCell>Item</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Reported By</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                    Loading items...
                  </TableCell>
                </TableRow>
              ) : filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                    No items found
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {item.type === 'lost' ? (
                            <LostItemsIcon color="error" sx={{ mr: 1 }} />
                          ) : (
                            <FoundItemsIcon color="success" sx={{ mr: 1 }} />
                          )}
                          <Typography variant="body2">{item.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        <Chip
                          label={item.type === 'lost' ? 'Lost' : 'Found'}
                          color={item.type === 'lost' ? 'error' : 'success'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.status}
                          color={
                            item.status === 'active' 
                              ? 'primary' 
                              : item.status === 'resolved' 
                                ? 'success' 
                                : 'warning'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.user}</TableCell>
                      <TableCell align="right">
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => handleViewItem(item)}
                        >
                          <ViewIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => handleEditItem(item)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleDeleteItem(item)}
                        >
                          <DeleteIcon fontSize="small" />
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
          count={filteredItems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Items Management Note */}
      <Alert severity="info" sx={{ mt: 3 }}>
        You can manage all lost and found items. Resolved items indicate successful matches between lost and found items.
      </Alert>

      {/* View Item Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={handleCloseViewDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedItem && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {selectedItem.type === 'lost' ? (
                    <LostItemsIcon color="error" sx={{ mr: 1 }} />
                  ) : (
                    <FoundItemsIcon color="success" sx={{ mr: 1 }} />
                  )}
                  <Typography variant="h6">
                    {selectedItem.name}
                  </Typography>
                </Box>
                <IconButton onClick={handleCloseViewDialog} size="small">
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Category
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedItem.category}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Type
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <Chip
                      label={selectedItem.type === 'lost' ? 'Lost' : 'Found'}
                      color={selectedItem.type === 'lost' ? 'error' : 'success'}
                      size="small"
                    />
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Status
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <Chip
                      label={selectedItem.status}
                      color={
                        selectedItem.status === 'active' 
                          ? 'primary' 
                          : selectedItem.status === 'resolved' 
                            ? 'success' 
                            : 'warning'
                      }
                      size="small"
                    />
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Date Reported
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedItem.date}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Location
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedItem.location}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Reported By
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedItem.user}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Description
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedItem.description}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Contact Information
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedItem.contactInfo}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={handleCloseViewDialog} 
                color="primary"
              >
                Close
              </Button>
              <Button 
                onClick={() => {
                  handleCloseViewDialog();
                  handleEditItem(selectedItem);
                }} 
                color="primary" 
                variant="contained"
                startIcon={<EditIcon />}
              >
                Edit Item
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        maxWidth="md"
        fullWidth
      >
        {editedItem && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6">
                  Edit Item: {editedItem.name}
                </Typography>
                <IconButton onClick={handleCloseEditDialog} size="small">
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={editedItem.name}
                    onChange={handleEditFieldChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={editedItem.category}
                      onChange={handleEditFieldChange}
                      label="Category"
                    >
                      <MenuItem value="Electronics">Electronics</MenuItem>
                      <MenuItem value="Jewelry">Jewelry</MenuItem>
                      <MenuItem value="Clothing">Clothing</MenuItem>
                      <MenuItem value="Documents">Documents</MenuItem>
                      <MenuItem value="Accessories">Accessories</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Type</InputLabel>
                    <Select
                      name="type"
                      value={editedItem.type}
                      onChange={handleEditFieldChange}
                      label="Type"
                    >
                      <MenuItem value="lost">Lost</MenuItem>
                      <MenuItem value="found">Found</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="status"
                      value={editedItem.status}
                      onChange={handleEditFieldChange}
                      label="Status"
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="resolved">Resolved</MenuItem>
                      <MenuItem value="expired">Expired</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={editedItem.location}
                    onChange={handleEditFieldChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date"
                    name="date"
                    type="date"
                    value={editedItem.date}
                    onChange={handleEditFieldChange}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={editedItem.description}
                    onChange={handleEditFieldChange}
                    margin="normal"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Contact Information"
                    name="contactInfo"
                    value={editedItem.contactInfo}
                    onChange={handleEditFieldChange}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={handleCloseEditDialog} 
                color="inherit"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveEditChanges} 
                color="primary" 
                variant="contained"
                startIcon={<SaveIcon />}
              >
                Save Changes
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
      >
        {selectedItem && (
          <>
            <DialogTitle>
              Delete Item
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete "{selectedItem.name}"? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteDialog} color="inherit">
                Cancel
              </Button>
              <Button 
                onClick={handleConfirmDelete} 
                color="error" 
                variant="contained"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

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

export default AdminItems; 