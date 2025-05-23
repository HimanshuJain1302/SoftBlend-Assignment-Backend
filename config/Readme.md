Task Manager API (MERN Backend)

A simple RESTful API for managing tasks and users, with JWT authentication and pagination.

🚀 Features

User authentication using JWT

CRUD operations for tasks and users

Filtering and pagination support for tasks

MongoDB for persistent storage

📁 Project Structure

task-manager-api/
├── controllers/
├── middleware/
├── models/
├── routes/
├── .env
├── server.js
├── package.json
└── README.md

🔧 Setup Instructions

Clone the repository:

git clone <your-repo-url>
cd task-manager-api

Install dependencies:

npm install

Create a .env file:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Run the server:

node server.js

🔐 Authentication

All /tasks routes require a valid JWT token.

Register: POST /users

Login: POST /users/login

Response will include a token

Use token in headers:

Authorization: Bearer <token>

📚 API Endpoints

Users

POST /users - Register a new user (name, email, password)

POST /users/login - Login and get a token

GET /users/:id - Get user by ID

GET /users - List all users

Tasks (protected routes)

POST /tasks - Create a task

GET /tasks/:id - Get task by ID

GET /tasks?status=&assignedUserId=&page=1&limit=10 - List tasks with optional filters & pagination

PUT /tasks/:id - Update task

DELETE /tasks/:id - Delete task

🧪 Sample Request (with Postman)

Login:

POST /users/login
{
  "email": "test@example.com",
  "password": "password123"
}

Get tasks:

GET /tasks?page=1&limit=5
Authorization: Bearer <token>

