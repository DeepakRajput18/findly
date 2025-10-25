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
  Grid,
  Card,
  CardContent,
  Snackbar,
} from '@mui/material';
import {
  Search as SearchIcon,
  Flag as FlagIcon,
  Visibility as ViewIcon,
  Warning as WarningIcon,
  ErrorOutline as ErrorIcon,
  BugReport as BugIcon,
  Check as CheckIcon,
  Cancel as CancelIcon,
  GetApp as DownloadIcon,
} from '@mui/icons-material';

const AdminReports = () => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Mock report data
  useEffect(() => {
    const reportTypes = ['inappropriate', 'scam', 'spam', 'bug', 'other'];
    const statuses = ['pending', 'investigating', 'resolved', 'rejected'];
    
    const mockReports = Array.from({ length: 35 }, (_, i) => ({
      id: i + 1,
      title: `Report #${i + 1}`,
      type: reportTypes[Math.floor(Math.random() * reportTypes.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
      reporter: `User ${Math.floor(Math.random() * 20) + 1}`,
      date: new Date(2023, 0, i % 28 + 1).toISOString().split('T')[0],
      description: `This is a sample report description for report #${i + 1}. It contains details about the issue.`,
    }));

    setTimeout(() => {
      setReports(mockReports);
      setLoading(false);
    }, 500);
  }, []);

  // Filter reports based on search term
  const filteredReports = reports.filter(report => 
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.reporter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Count reports by status
  const reportCounts = {
    pending: reports.filter(r => r.status === 'pending').length,
    investigating: reports.filter(r => r.status === 'investigating').length,
    resolved: reports.filter(r => r.status === 'resolved').length,
    rejected: reports.filter(r => r.status === 'rejected').length,
    high: reports.filter(r => r.priority === 'high').length,
  };

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

  // Get icon for report type
  const getReportTypeIcon = (type) => {
    switch (type) {
      case 'inappropriate':
        return <WarningIcon fontSize="small" />;
      case 'scam':
        return <ErrorIcon fontSize="small" />;
      case 'spam':
        return <FlagIcon fontSize="small" />;
      case 'bug':
        return <BugIcon fontSize="small" />;
      default:
        return <FlagIcon fontSize="small" />;
    }
  };

  // Handle export reports
  const handleExportReports = () => {
    // Get filtered reports based on search term
    const dataToExport = filteredReports;
    
    // Create CSV header
    const headers = [
      'ID',
      'Report',
      'Type',
      'Priority',
      'Status',
      'Reporter',
      'Date',
      'Description'
    ];
    
    // Convert reports to CSV rows
    const csvRows = [
      headers.join(','), // Header row
      ...dataToExport.map(report => [
        report.id,
        `"${report.title}"`, // Quote strings to handle commas in text
        `"${report.type}"`,
        report.priority,
        report.status,
        `"${report.reporter}"`,
        report.date,
        `"${report.description.replace(/"/g, '""')}"` // Escape quotes in description
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
    link.setAttribute('download', `Reports_${new Date().toISOString().split('T')[0]}.csv`);
    
    // Append to the document, click and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message
    setSnackbarMessage(`${dataToExport.length} reports exported successfully`);
    setSnackbarOpen(true);
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Reports Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Handle user reports and system issues in the Findly platform.
        </Typography>
      </Paper>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ height: '100%', borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h5" color="primary">{reports.length}</Typography>
              <Typography variant="body2" color="text.secondary">Total Reports</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ height: '100%', borderRadius: 2, bgcolor: 'warning.light' }}>
            <CardContent>
              <Typography variant="h5" color="warning.dark">{reportCounts.pending}</Typography>
              <Typography variant="body2" color="warning.dark">Pending</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ height: '100%', borderRadius: 2, bgcolor: 'info.light' }}>
            <CardContent>
              <Typography variant="h5" color="info.dark">{reportCounts.investigating}</Typography>
              <Typography variant="body2" color="info.dark">Investigating</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ height: '100%', borderRadius: 2, bgcolor: 'success.light' }}>
            <CardContent>
              <Typography variant="h5" color="success.dark">{reportCounts.resolved}</Typography>
              <Typography variant="body2" color="success.dark">Resolved</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ height: '100%', borderRadius: 2, bgcolor: 'error.light' }}>
            <CardContent>
              <Typography variant="h5" color="error.dark">{reportCounts.high}</Typography>
              <Typography variant="body2" color="error.dark">High Priority</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Actions */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          placeholder="Search reports..."
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
          onClick={handleExportReports}
        >
          Export Reports
        </Button>
      </Box>

      {/* Reports Table */}
      <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'background.paper' }}>
                <TableCell>Report</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Reporter</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    Loading reports...
                  </TableCell>
                </TableRow>
              ) : filteredReports.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    No reports found
                  </TableCell>
                </TableRow>
              ) : (
                filteredReports
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((report) => (
                    <TableRow key={report.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {getReportTypeIcon(report.type)}
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            {report.title}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={report.type}
                          size="small"
                          color={
                            report.type === 'scam' 
                              ? 'error' 
                              : report.type === 'bug' 
                                ? 'warning' 
                                : 'default'
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={report.priority}
                          size="small"
                          color={
                            report.priority === 'high' 
                              ? 'error' 
                              : report.priority === 'medium' 
                                ? 'warning' 
                                : 'default'
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={report.status}
                          size="small"
                          color={
                            report.status === 'pending' 
                              ? 'warning' 
                              : report.status === 'investigating' 
                                ? 'info' 
                                : report.status === 'resolved'
                                  ? 'success'
                                  : 'error'
                          }
                        />
                      </TableCell>
                      <TableCell>{report.reporter}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell align="right">
                        <IconButton size="small" color="primary">
                          <ViewIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="success">
                          <CheckIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <CancelIcon fontSize="small" />
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
          count={filteredReports.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Reports Management Note */}
      <Alert severity="info" sx={{ mt: 3 }}>
        Reports are automatically prioritized based on their type and frequency. High priority reports should be addressed immediately.
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

export default AdminReports; 