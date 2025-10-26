# Render deployment script
#!/bin/bash

echo "Starting Findly deployment on Render..."

# Install dependencies for backend
echo "Installing backend dependencies..."
cd backend
npm install --production
cd ..

# Install dependencies for frontend and build
echo "Installing frontend dependencies and building..."
cd frontend
npm install
npm run build
cd ..

# Start the backend server
echo "Starting backend server..."
cd backend
npm start
