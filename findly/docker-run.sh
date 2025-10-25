#!/bin/bash

# Docker setup script for Findly
echo "🚀 Setting up Findly with Docker..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Stop any existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Remove old images (optional, uncomment if needed)
# echo "🗑️  Removing old images..."
# docker-compose down --rmi all

# Build and start services
echo "🔨 Building and starting services..."
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check service status
echo "📊 Checking service status..."
docker-compose ps

# Test health endpoints
echo "🏥 Testing health endpoints..."
curl -f http://localhost/health || echo "❌ Health check failed"

echo "✅ Setup complete!"
echo "🌐 Application is available at: http://localhost"
echo "📱 API is available at: http://localhost/api"
echo ""
echo "📋 Useful commands:"
echo "  View logs: docker-compose logs -f"
echo "  Stop services: docker-compose down"
echo "  Restart services: docker-compose restart"
