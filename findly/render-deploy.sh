#!/bin/bash

echo "Starting Findly deployment on Render..."

# Install all dependencies
echo "Installing root dependencies..."
npm install

echo "Installing backend dependencies..."
cd backend
npm install --production
cd ..

# Install frontend dependencies and build
echo "Installing frontend dependencies..."
cd frontend
npm install
npm run build
cd ..

# Verify frontend build exists
if [ -d "frontend/dist" ]; then
  echo "✅ Frontend build completed successfully"
  echo "Building directory contains:"
  ls -la frontend/dist/
else
  echo "❌ Frontend build failed - dist directory not found"
  exit 1
fi

# Start the backend server
echo "Starting backend server..."
cd backend
npm start

