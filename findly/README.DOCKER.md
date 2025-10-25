# Dockerized setup (single public port)

This setup runs the frontend, backend and MongoDB using Docker Compose and exposes everything through a single public HTTP port (80) via nginx. MongoDB remains internal (port 27017) and is not exposed publicly.

Files added:
- `docker-compose.yml` - orchestrates `mongo`, `backend` and `web` (nginx)
- `backend/Dockerfile` - builds the backend image
- `docker/nginx/Dockerfile` - builds the nginx image that serves static frontend and proxies /api to backend
- `docker/nginx/nginx.conf` - nginx configuration

Requirements
- Docker Desktop (Windows) or Docker Engine + Compose

How it works
1. Build frontend static files:
   ```bash
   cd frontend
   npm install
   npm run build
   cd ..
   ```
2. Build & start containers:
   ```bash
   docker compose up --build
   ```

What you get
- Public HTTP: http://localhost (port 80) serves the frontend and proxies /api to backend.
- Backend internal: `backend` container listens on 5001 (internal network)
- MongoDB internal: `mongo` container listens on 27017 (internal network)

Environment
- `docker-compose.yml` passes `MONGODB_URI=mongodb://mongo:27017/findly` to the backend.
- You can override `JWT_SECRET` when running `docker compose` with environment variables.

Stopping
```bash
docker compose down
```

Notes
- This setup assumes the frontend is built to `frontend/dist`. If you update frontend assets, rebuild before `docker compose up --build`.
- For HTTPS in production, put a TLS-terminating reverse proxy (or use a managed service).