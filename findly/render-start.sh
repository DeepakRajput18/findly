#!/bin/bash
# Render startup script for Findly application

echo "Starting Findly application on Render..."

# Set default environment variables if not provided
export JWT_SECRET=${JWT_SECRET:-"default_jwt_secret_change_in_production"}
export NODE_ENV=${NODE_ENV:-"production"}
export MONGODB_URI=${MONGODB_URI:-"mongodb://mongo:27017/findly"}
export PORT=${PORT:-5001}

echo "Environment variables set:"
echo "JWT_SECRET: ${JWT_SECRET:0:10}..."
echo "NODE_ENV: $NODE_ENV"
echo "MONGODB_URI: $MONGODB_URI"
echo "PORT: $PORT"

# Start the application using docker-compose
echo "Starting Docker containers..."
docker-compose -f render-compose.yml up --build
