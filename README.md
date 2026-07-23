# ATC

A full-stack workforce management platform built with the MERN stack and Socket.IO.

## Overview

ATC is a role-based workforce management application designed to streamline employee administration, attendance tracking, departmental operations, and internal communication within an organization.

The application provides dedicated workspaces for administrators, managers, and employees, with access controlled through role-based authorization.

The project follows a client-server architecture using React for the frontend and Express with MongoDB for the backend. Real-time communication is powered by Socket.IO, enabling features such as instant messaging, typing indicators, online presence, and read receipts.

The repository is organized into separate client and server applications, with additional technical documentation available under the `docs/` directory.

## Features

- JWT-based authentication with secure password hashing using bcrypt.
- Role-based access control for administrators, managers, and employees.
- Employee registration and administrative role assignment workflow.
- Department and designation management with manager allocation.
- Employee management, including profile updates and status management.
- Attendance tracking with approval workflows for administrators and managers.
- Department-level access restrictions for manager operations.
- Real-time one-to-one messaging powered by Socket.IO.
- Chat features including conversation history, online/offline presence, typing indicators, and read receipts.
- Dashboard views tailored to user roles with relevant operational insights.
- Attendance data export in CSV and Excel formats.

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Axios
- Socket.IO Client
- React Toastify
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Socket.IO
- Nodemailer

### Tooling

- npm
- Nodemon
- Concurrently
- ExcelJS


## Project Structure

```text
ATC/
├── client/                 # React frontend
│   ├── src/
│   └── package.json
├── docs/                   # Technical documentation
│   ├── API.md
│   ├── ARCHITECTURE.md
│   ├── DATABASE.md
│   └── TESTING.md
├── server/                 # Express backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── socket/
│   └── package.json
└── package.json            # Root scripts
```

## Getting Started

Follow the steps below to set up the project locally.

### Prerequisites

Make sure the following software is installed on your machine:

- Node.js (v18 or later recommended)
- npm
- MongoDB Community Server or MongoDB Atlas
- Git

Verify your installation:

```bash
node -v
npm -v
mongod --version
git --version
```

---

### Clone the Repository

```bash
git clone <repository-url>
cd atc-mern
```

---

### Install Dependencies

Install the root dependencies:

```bash
npm install
```

Install frontend dependencies:

```bash
cd client
npm install
```

Install backend dependencies:

```bash
cd ../server
npm install
```

Return to the project root:

```bash
cd ..
```

---

### Configure Environment Variables

Create a `.env` file inside the `server` directory.

Example:

```env
PORT=4000

MONGO_URI=mongodb://127.0.0.1:27017/attendance_management

JWT_SECRET=your_jwt_secret

JWT_EXPIRES_IN=7d

NODE_ENV=development

SMTP_USER=your_email@example.com

SMTP_KEY=your_email_app_password

SENDER_MAIL=your_email@example.com
```

> **Note**
>
> - Replace the placeholder values with your own configuration.
> - Never commit the `.env` file or expose sensitive credentials.

---

### Start MongoDB

This project uses a local MongoDB instance by default. Before starting the application, ensure that the MongoDB server is running.

Open a new terminal and start the MongoDB service:

```bash
mongod
```

> **Note**
>
> Keep this terminal open while using the application. The backend requires an active MongoDB connection to function properly.
>
> If you prefer using MongoDB Atlas, update the `MONGO_URI` in your `.env` file with your Atlas connection string before starting the server.

---

### Run the Application

Open a new terminal in the project root and start both the frontend and backend:

```bash
npm start
```

This command uses **concurrently** to start both applications.

When the project starts successfully, you should see output similar to:

```text
> server
Server running on port 4000
MongoDB Connected

> client
VITE v7.x.x ready in xxx ms

➜  Local:   http://localhost:5173/
```

Once everything is running:

| Service | URL |
|---------|-------------------------|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:4000 |


## Available Scripts

### Root

Run these commands from the project root.

- `npm start`  
  Starts both the frontend and backend concurrently.

- `npm run client`  
  Starts only the React development server.

- `npm run server`  
  Starts only the Express backend server.

---

### Client (`client/`)

Run these commands inside the `client` directory.

- `npm run dev`  
  Starts the Vite development server.

- `npm run build`  
  Creates a production build.

- `npm run preview`  
  Previews the production build locally.

- `npm run lint`  
  Runs ESLint to check for code quality issues.

---

### Server (`server/`)

Run these commands inside the `server` directory.

- `npm run server`  
  Starts the backend using Nodemon.

- `npm start`  
  Starts the backend using Node.js.


  ## Documentation

Detailed technical documentation is available in the `docs/` directory.

- `API.md`  
  REST API endpoints, request and response formats, and HTTP status codes.

- `ARCHITECTURE.md`  
  Application architecture, project structure, authentication flow, and Socket.IO workflow.

- `DATABASE.md`  
  Database schema, model relationships, and collections.

- `TESTING.md`  
  Feature testing, validation checklist, and edge case testing.

  ## Future Enhancements

Planned improvements for future releases include:

- Leave management
- In-app notifications
- Email notifications
- Payroll management
- Performance evaluation
- File attachments in chat
- Profile image upload
- PDF report generation
