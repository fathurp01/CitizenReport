# Citizen Report

A web application with Express.js backend and React frontend for citizen reporting.

## Project Structure

```
CitizenReport/
├── backend/         # Express.js server
├── frontend/        # React application
└── package.json     # Root package.json for running both services
```

## Prerequisites

- Node.js (v14 or newer)
- npm (v6 or newer)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/fathurp01/CitizenReport.git
cd CitizenReport
```

### 2. Install dependencies

You can install all dependencies at once using:

```bash
npm run install-all
```

Or install them separately:

```bash
# Root dependencies
npm install

# Backend dependencies
cd backend
npm install
cd ..

# Frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Environment Setup

Create a `.env` file in the backend directory based on the example:

```bash
cd backend
copy .env.example .env
cd ..
```

Modify the `.env` file if needed.

### 4. Running the Application

To run both backend and frontend concurrently:

```bash
npm start
```

To run them separately:

```bash
# Backend only
npm run server

# Frontend only
npm run client
```

## Access the Application

- Backend API: http://localhost:5001/api
- Frontend: http://localhost:3000

## API Endpoints

- `GET /api` - Welcome message

## Development

- Backend code is in the `backend` directory
- Frontend code is in the `frontend` directory
- Make sure to update the `.env.example` file if you add new environment variables

## Project Configuration

### Backend (Express.js)

The backend is configured with:
- Express.js for API routes
- CORS for cross-origin requests
- dotenv for environment variables

Main files:
- `server.js` - Main entry point
- `.env` - Environment variables (port configuration)

### Frontend (React)

The frontend is created with Create React App and configured with:
- Axios for API requests
- Proxy setting to forward API requests to the backend

Main files:
- `src/App.js` - Main React component
- `package.json` - Dependencies and scripts

### Root Configuration

The root directory contains:
- `package.json` - Scripts to run both services concurrently
- `concurrently` package to run multiple commands

## Troubleshooting

- If port 5001 is already in use, you can change it in the backend `.env` file
- Make sure the proxy in `frontend/package.json` matches the backend port
- If you encounter CORS issues, check that the backend CORS configuration is correct
- For npm errors, try deleting the `node_modules` folder and running `npm install` again

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

