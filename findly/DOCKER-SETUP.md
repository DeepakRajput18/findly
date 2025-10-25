# Docker Setup for Findly

This document explains how to run the Findly application using Docker with all services on the same port.

## Architecture

The application uses the following Docker services:

- **MongoDB**: Database service
- **Backend**: Node.js API server (internal port 5001)
- **Web**: Nginx reverse proxy serving frontend and proxying API calls (port 80)

## Quick Start

### Windows
```bash
# Run the setup script
docker-run.bat
```

### Linux/Mac
```bash
# Make script executable and run
chmod +x docker-run.sh
./docker-run.sh
```

### Manual Setup
```bash
# Build and start all services
docker-compose up --build -d

# Check service status
docker-compose ps

# View logs
docker-compose logs -f
```

## Services

### MongoDB
- **Port**: Internal only (27017)
- **Data**: Persisted in Docker volume `mongo-data`
- **Health Check**: MongoDB ping command

### Backend (Node.js API)
- **Port**: Internal only (5001)
- **Environment Variables**:
  - `MONGODB_URI`: Connection string for MongoDB
  - `PORT`: Server port (5001)
  - `JWT_SECRET`: Secret key for JWT tokens
  - `NODE_ENV`: Environment (production)

### Web (Nginx)
- **Port**: 80 (accessible from host)
- **Functions**:
  - Serves React frontend static files
  - Proxies `/api/*` requests to backend
  - Proxies `/uploads/*` requests to backend
  - Handles CORS headers

## Access Points

- **Frontend**: http://localhost
- **API**: http://localhost/api
- **Health Check**: http://localhost/health
- **File Uploads**: http://localhost/uploads

## Configuration Files

### docker-compose.yml
- Defines all services and their relationships
- Sets up networking between services
- Configures health checks and dependencies

### docker/nginx/nginx.conf
- Nginx configuration for reverse proxy
- Handles static file serving
- Manages API request proxying
- Includes CORS headers

### docker/nginx/Dockerfile
- Multi-stage build for frontend and Nginx
- Builds React application
- Sets up Nginx with custom configuration

## Development vs Production

### Development
- Frontend API calls use `http://localhost:5001/api`
- Vite dev server proxy configuration handles API requests
- Backend CORS allows localhost origins

### Production (Docker)
- Frontend API calls use relative URLs (`/api`)
- Nginx handles all API proxying
- Single port (80) for all services

## Troubleshooting

### Services won't start
```bash
# Check Docker is running
docker info

# View detailed logs
docker-compose logs

# Rebuild services
docker-compose down
docker-compose up --build
```

### Database connection issues
```bash
# Check MongoDB container
docker-compose logs mongo

# Restart MongoDB
docker-compose restart mongo
```

### Frontend not loading
```bash
# Check if frontend build succeeded
docker-compose logs web

# Verify static files are served
curl http://localhost
```

### API calls failing
```bash
# Check backend health
curl http://localhost/health

# Check backend logs
docker-compose logs backend

# Test API directly
curl http://localhost/api/users
```

## Useful Commands

```bash
# Start services in background
docker-compose up -d

# Stop all services
docker-compose down

# Restart specific service
docker-compose restart backend

# View real-time logs
docker-compose logs -f

# Remove all containers and volumes
docker-compose down -v

# Rebuild specific service
docker-compose up --build backend
```

## Environment Variables

Create a `.env` file in the root directory to override defaults:

```env
JWT_SECRET=your_secret_key_here
MONGODB_URI=mongodb://mongo:27017/findly
NODE_ENV=production
```

## Port Configuration

The application is designed to run everything on port 80:

- **Frontend**: Served by Nginx on port 80
- **API**: Proxied through Nginx from backend (port 5001) to port 80
- **Database**: Internal only, not exposed to host

This setup allows the entire application to be accessed through a single port, making it easy to deploy and access.
