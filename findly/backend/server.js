const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const userRoutes = require('./routes/userRoutes');
const lostItemRoutes = require('./routes/lostItemRoutes');
const foundItemRoutes = require('./routes/foundItemRoutes');
const matchRoutes = require('./routes/matchRoutes');
const messageRoutes = require('./routes/messageRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const locationRoutes = require('./routes/locationRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:80', 'http://localhost'], // Allow both frontend ports and Docker setup
  credentials: true
}));
app.use(express.json());

// Conditional request logging (disable in production)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    // avoid logging large or sensitive bodies in production
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);
    next();
  });
}

// Ensure uploads directory exists
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
  console.log(`Creating uploads directory: ${uploadsPath}`);
  fs.mkdirSync(uploadsPath, { recursive: true });
}

// Serve static files from uploads folder with absolute path
console.log(`Serving static files from: ${uploadsPath}`);
app.use('/uploads', express.static(uploadsPath));

// Log all API requests for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  
  // Add special logging for profile update requests
  if (req.method === 'PUT' && req.url === '/api/users/profile') {
    console.log('Profile update request detected');
    console.log('Request has file?', !!req.file);
    console.log('Content-Type:', req.headers['content-type']);
  }
  
  next();
});

// Connect to MongoDB (non-blocking)
const connectToMongoDB = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Connected to MongoDB');
      console.log('Database URL:', process.env.MONGODB_URI);
    } else {
      console.log('No MongoDB URI provided, running without database');
      console.log('To enable database features, set MONGODB_URI environment variable');
    }
  } catch (err) {
    console.error('MongoDB connection error:', err);
    console.error('Error details:', {
      name: err.name,
      message: err.message,
      code: err.code
    });
    console.log('Continuing without database connection...');
  }
};

// Connect to MongoDB without blocking server startup
connectToMongoDB();

// Add error handler for unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  console.error('Error details:', {
    name: err.name,
    message: err.message,
    stack: err.stack
  });
});

// Add error handler for uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  console.error('Error details:', {
    name: err.name,
    message: err.message,
    stack: err.stack
  });
  process.exit(1);
});

// Mongoose connection event listeners
mongoose.connection.on('connected', () => console.log('Mongoose connection: connected'));
mongoose.connection.on('error', (err) => console.error('Mongoose connection error:', err));
mongoose.connection.on('disconnected', () => console.warn('Mongoose connection: disconnected'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/lost-items', lostItemRoutes);
app.use('/api/found-items', foundItemRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/locations', locationRoutes);

// Note: frontend static serving is added below after API routes and special endpoints

// Add test route for uploads
app.get('/test-uploads', (req, res) => {
  fs.readdir(uploadsPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ 
      message: 'Uploads directory content',
      uploadsPath,
      files 
    });
  });
});

// Health endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    uptime: process.uptime(),
    mongodb_uri: process.env.MONGODB_URI ? 'configured' : 'not configured'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Serve frontend build (if present) or provide API root message
const clientBuildPath = path.join(__dirname, '..', 'frontend', 'dist');

if (fs.existsSync(clientBuildPath)) {
  console.log(`Frontend build detected at ${clientBuildPath}, serving static files.`);
  // Serve static frontend files
  app.use(express.static(clientBuildPath));

  // For any non-API route, send index.html (supports client-side routing)
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Findly API is running');
  });
}

// Start server with error handling
const startServer = () => {
  try {
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Backend URL: http://localhost:${PORT}`);
      console.log(`If running frontend dev server, it typically uses http://localhost:5173`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please try a different port.`);
        process.exit(1);
      } else {
        console.error('Server error:', error);
      }
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer(); 