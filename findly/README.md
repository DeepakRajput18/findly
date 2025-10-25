# Findly - Lost and Found Application

Findly is a web application that helps users report and find lost items. It provides a platform for users to report lost items, report found items, and connect with others through matching and messaging.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Environment Setup
1. Create a `.env` file in the `backend` directory with the following variables:
```
JWT_SECRET=yoursecretkey
MONGODB_URI=mongodb://localhost:27017/findly
```

### Installation

1. Clone the repository
2. Install dependencies for both frontend and backend:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Database Setup
To populate the database with sample data, run:

```bash
cd backend
node seedData.js
```

This will create sample users, lost items, found items, matches, messages, notifications, and locations.

### Starting the Application
You can start both the frontend and backend servers simultaneously using:

```bash
node startServers.js
```

Or start them separately:

```bash
# Start backend server (from the backend directory)
node server.js

# Start frontend development server (from the frontend directory)
npm run dev
```

The backend will run on port 5001, and the frontend will typically run on port 5173 or 5174.

## Sample Login Credentials

After running the seed script, you can use the following credentials to log in:

**Regular User:**
- Email: john@example.com
- Password: password123

**Another User:**
- Email: jane@example.com
- Password: password123

**Admin User:**
- Email: admin@example.com
- Password: password123

## Features

- User authentication (register, login, profile management)
- Report lost items
- Report found items
- Match lost and found items
- In-app messaging
- Notifications
- Location tracking for items

## API Endpoints

### User Routes
- POST `/api/users/register` - Register a new user
- POST `/api/users/login` - Login a user
- GET `/api/users/profile` - Get user profile (requires authentication)
- PUT `/api/users/profile` - Update user profile (requires authentication)

### Lost Items Routes
- GET `/api/lost-items` - Get all lost items
- GET `/api/lost-items/user/myitems` - Get user's lost items
- GET `/api/lost-items/:id` - Get lost item by ID
- POST `/api/lost-items` - Create a new lost item
- PUT `/api/lost-items/:id` - Update a lost item
- DELETE `/api/lost-items/:id` - Delete a lost item

### Found Items Routes
- GET `/api/found-items` - Get all found items
- GET `/api/found-items/user/myitems` - Get user's found items
- GET `/api/found-items/:id` - Get found item by ID
- POST `/api/found-items` - Create a new found item
- PUT `/api/found-items/:id` - Update a found item
- DELETE `/api/found-items/:id` - Delete a found item

### Matches Routes
- GET `/api/matches` - Get all matches
- GET `/api/matches/mymatches` - Get user's matches
- GET `/api/matches/:id` - Get match by ID
- POST `/api/matches` - Create a new match
- PUT `/api/matches/:id` - Update match status

### Messages Routes
- GET `/api/messages` - Get all conversations
- GET `/api/messages/:userId` - Get conversation with a specific user
- POST `/api/messages` - Send a message

### Notifications Routes
- GET `/api/notifications` - Get user's notifications
- PUT `/api/notifications/:id` - Mark notification as read
- PUT `/api/notifications/read-all` - Mark all notifications as read
- DELETE `/api/notifications/:id` - Delete notification

### Locations Routes
- GET `/api/locations/:itemType` - Get all locations for a specific item type
- GET `/api/locations/:itemType/:itemId` - Get location for a specific item
- POST `/api/locations` - Add or update location for an item 