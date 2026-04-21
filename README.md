# Smart Agriculture Management System

A full-stack MERN application for managing smart agriculture operations with role-based access control.

## Features

- **User Roles**: Admin, Farmer, Agricultural Expert, Supplier
- **Modules**:
  - User Management
  - Crop Management
  - Soil & Fertility Management
  - Irrigation Management
  - Weather Monitoring
  - Equipment Management
  - Fertilizer & Pesticide Tracking
  - Yield Analytics
  - Smart Recommendations
  - Supplier Marketplace
- **Smart Features**:
  - Crop recommendation system based on soil pH
  - Irrigation reminders for growing crops
  - Fertilizer recommendations based on nutrient levels
  - Disease alerts and pest monitoring
- **Authentication**: JWT-based with bcrypt hashing
- **UI**: Responsive React app with Tailwind CSS

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, JWT, bcrypt
- **Frontend**: React.js, Tailwind CSS, Axios, React Router DOM
- **Deployment**: Vercel (Frontend), Render (Backend), MongoDB Atlas (Database)

## Installation

### Backend

1. Navigate to backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create `.env` file with:
   ```
   MONGO_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Start server: `npm run dev`

### Frontend

1. Navigate to frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start app: `npm start`

## API Endpoints

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/crops` - Get crops (authenticated)
- `GET /api/soil` - Get soil data
- `GET /api/irrigation` - Get irrigation schedules
- `GET /api/equipment` - Get equipment
- `GET /api/fertilizer` - Get fertilizer applications
- `GET /api/yield` - Get yield records
- `GET /api/suppliers` - Get suppliers
- `GET /api/recommendations` - Get smart recommendations

## Deployment

### Backend on Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables: MONGO_URI, JWT_SECRET, PORT

### Frontend on Vercel

1. Create a new project on Vercel
2. Connect your GitHub repository
3. Set root directory to `frontend`
4. Deploy (vercel.json handles the config)

### Database on MongoDB Atlas

1. Create a cluster on MongoDB Atlas
2. Get connection string
3. Whitelist IP addresses or use 0.0.0.0/0 for testing
4. Update MONGO_URI in backend .env

## Project Structure

```
smartagriculture/
├── backend/
│   ├── models/ (8 models)
│   ├── controllers/ (8 controllers with CRUD)
│   ├── routes/ (10 routes with auth)
│   ├── middleware/ (auth & role-based)
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/ (10 components)
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css (Tailwind)
│   ├── package.json
│   └── vercel.json
└── README.md
```

## Usage

1. Register as a user with appropriate role
2. Login to access dashboard
3. Navigate to different modules to manage data
4. View smart recommendations based on your data
5. Monitor analytics on the dashboard

## Smart Features Implementation

- **Crop Recommendations**: Based on average soil pH levels
- **Irrigation Reminders**: Alerts for growing crops
- **Fertilizer Recommendations**: When nutrient levels are low
- **Disease Alerts**: General pest monitoring advice
- **Role-specific Recommendations**: Tailored advice for each user type
