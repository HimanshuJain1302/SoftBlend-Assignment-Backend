# Task Manager API Documentation
## Project Overview
This project is a RESTful API built with the MERN stack (MongoDB, Express.js, React.js, Node.js - although React is not present in this codebase, it's implied by the Readme) for managing tasks and users. It provides functionalities for user authentication, task management, and data persistence.
**Key Features:**
*   User authentication using JWT (JSON Web Tokens).
*   CRUD (Create, Read, Update, Delete) operations for tasks and users.
*   Filtering and pagination support for tasks.
*   MongoDB for data storage.
**Requirements:**
*   Node.js
*   npm (Node Package Manager)
*   MongoDB
## Getting Started
### Installation
1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd task-manager-api
    ```
    
2.  **Install dependencies:**
    ```bash
    npm install
    ```
    
3.  **Create a `.env` file:**
    Create a `.env` file in the root directory with the following environment variables:
        MONGO_URL=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    PORT=5000
    ```
    
    Replace `your_mongodb_connection_string` with your MongoDB connection string and `your_secret_key` with a secure secret key for JWT.
4.  **Run the server:**
    ```bash
    npm start
    # or
    npm run dev  (for development with nodemon)
    ```
    
### Dependencies
The project uses the following dependencies:
*   **bcrypt:** For password hashing.
*   **dotenv:** For loading environment variables from a `.env` file.
*   **express:** A web application framework for Node.js.
*   **jsonwebtoken:** For generating and verifying JWTs.
*   **mongoose:** An ODM (Object-Document Mapper) for MongoDB.
*   **nodemon:** (devDependencies) For automatically restarting the server during development.
## Code Structure
```
task-manager-api/
├── config/
│   └── db.js             # MongoDB connection configuration
├── controllers/
│   ├── taskController.js # Task-related API logic
│   └── userController.js # User-related API logic
├── middleware/
│   └── auth.js           # Authentication middleware
├── models/
│   ├── Task.js           # Task model
│   └── User.js           # User model
├── routes/
│   ├── taskroutes.js     # Task API routes
│   └── userRoutes.js     # User API routes
├── .gitignore            # Specifies intentionally untracked files that Git should ignore
├── app.js                # Express application setup and middleware
├── package.json          # Project metadata and dependencies
├── Readme.md             # Project documentation
└── server.js             # Entry point for the server
```
**Key Components:**
*   **`config/db.js`:**  Handles the connection to the MongoDB database.
*   **`controllers/taskController.js`:** Contains the logic for handling task-related API requests (create, get, update, delete).
*   **`controllers/userController.js`:** Contains the logic for handling user-related API requests (create, login, get).
*   **`middleware/auth.js`:**  Middleware function to authenticate users using JWTs.
*   **`models/Task.js`:** Defines the schema for the Task model in MongoDB.
*   **`models/User.js`:** Defines the schema for the User model in MongoDB, including password hashing.
*   **`routes/taskRoutes.js`:** Defines the routes for task-related API endpoints.
*   **`routes/userRoutes.js`:** Defines the routes for user-related API endpoints.
*   **`app.js`:** Configures the Express application, including middleware and routes.
*   **`server.js`:** The main entry point of the application, responsible for starting the server and connecting to the database.
## API Documentation
### Users
#### POST /users
*   **Description:** Registers a new user.
*   **Request Body:**
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string"
    }
    ```
    
*   **Response:**
    *   **Success (201 Created):**
        ```json
        {
          "_id": "string",
          "name": "string",
          "email": "string",
          "createdAt": "string",
          "updatedAt": "string",
          "__v": 0
        }
        ```
    *   **Error (400 Bad Request):**
        ```json
        {
          "error": "string"
        }
        ```
#### POST /users/login
*   **Description:** Logs in an existing user and returns a JWT.
*   **Request Body:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
    
*   **Response:**
    *   **Success (200 OK):**
        ```json
        {
          "token": "string"
        }
        ```
    *   **Error (401 Unauthorized):**
        ```json
        {
          "error": "Invalid credentials"
        }
        ```
#### GET /users/:id
*   **Description:** Gets a user by ID.
*   **Request Headers:**
    *   `Authorization`: `Bearer <token>` (Not required for this endpoint, but included for consistency)
*   **Response:**
    *   **Success (200 OK):**
        ```json
        {
          "_id": "string",
          "name": "string",
          "email": "string",
          "createdAt": "string",
          "updatedAt": "string",
          "__v": 0
        }
        ```
    *   **Error (404 Not Found):**
        ```json
        {
          "error": "User not found"
        }
        ```
    *   **Error (500 Internal Server Error):**
        ```json
        {
          "error": "string"
        }
        ```
#### GET /users
*   **Description:** Lists all users.
*   **Request Headers:**
    *   `Authorization`: `Bearer <token>` (Not required for this endpoint, but included for consistency)
*   **Response:**
    *   **Success (200 OK):**
        ```json
        [
          {
            "_id": "string",
            "name": "string",
            "email": "string",
            "createdAt": "string",
            "updatedAt": "string",
            "__v": 0
          }
        ]
        ```
    *   **Error (500 Internal Server Error):**
        ```json
        {
          "error": "string"
        }
        ```
### Tasks (Protected Routes - Requires JWT)
#### POST /tasks
*   **Description:** Creates a new task.
*   **Request Headers:**
    *   `Authorization`: `Bearer <token>`
*   **Request Body:**
    ```json
    {
      "title": "string",
      "description": "string",
      "dueDate": "string (ISO 8601 format)",
      "status": "pending | in progress | completed",
      "assignedUserId": "string (ObjectId of the assigned user)"
    }
    ```
    
*   **Response:**
    *   **Success (201 Created):**
        ```json
        {
          "_id": "string",
          "title": "string",
          "description": "string",
          "dueDate": "string",
          "status": "pending | in progress | completed",
          "assignedUserId": "string",
          "createdAt": "string",
          "updatedAt": "string",
          "__v": 0
        }
        ```
    *   **Error (400 Bad Request):**
        ```json
        {
          "error": "string"
        }
        ```
#### GET /tasks/:id
*   **Description:** Gets a task by ID.
*   **Request Headers:**
    *   `Authorization`: `Bearer <token>`
*   **Response:**
    *   **Success (200 OK):**
        ```json
        {
          "_id": "string",
          "title": "string",
          "description": "string",
          "dueDate": "string",
          "status": "pending | in progress | completed",
          "assignedUserId": "string",
          "createdAt": "string",
          "updatedAt": "string",
          "__v": 0
        }
        ```
    *   **Error (404 Not Found):**
        ```json
        {
          "error": "Task not found"
        }
        ```
    *   **Error (500 Internal Server Error):**
        ```json
        {
          "error": "string"
        }
        ```
#### GET /tasks
*   **Description:** Lists tasks with optional filters and pagination.
*   **Request Headers:**
    *   `Authorization`: `Bearer <token>`
*   **Query Parameters:**
    *   `status`: Filter by task status (`pending`, `in progress`, `completed`).
    *   `assignedUserId`: Filter by assigned user ID.
    *   `page`: Page number for pagination (default: 1).
    *   `limit`: Number of tasks per page (default: 10).
*   **Response:**
    *   **Success (200 OK):**
        ```json
        [
          {
            "_id": "string",
            "title": "string",
            "description": "string",
            "dueDate": "string",
            "status": "pending | in progress | completed",
            "assignedUserId": "string",
            "createdAt": "string",
            "updatedAt": "string",
            "__v": 0
          }
        ]
        ```
    *   **Error (500 Internal Server Error):**
        ```json
        {
          "error": "string"
        }
        ```
#### PUT /tasks/:id
*   **Description:** Updates a task.
*   **Request Headers:**
    *   `Authorization`: `Bearer <token>`
*   **Request Body:** (Same as POST /tasks, but only the fields to be updated are required)
    ```json
    {
      "title": "string",
      "description": "string",
      "dueDate": "string (ISO 8601 format)",
      "status": "pending | in progress | completed",
      "assignedUserId": "string (ObjectId of the assigned user)"
    }
    ```
    
*   **Response:**
    *   **Success (200 OK):**
        ```json
        {
          "_id": "string",
          "title": "string",
          "description": "string",
          "dueDate": "string",
          "status": "pending | in progress | completed",
          "assignedUserId": "string",
          "createdAt": "string",
          "updatedAt": "string",
          "__v": 0
        }
        ```
    *   **Error (400 Bad Request):**
        ```json
        {
          "error": "string"
        }
        ```
    *   **Error (404 Not Found):**
        ```json
        {
          "error": "Task not found"
        }
        ```
#### DELETE /tasks/:id
*   **Description:** Deletes a task.
*   **Request Headers:**
    *   `Authorization`: `Bearer <token>`
*   **Response:**
    *   **Success (200 OK):**
        ```json
        {
          "message": "Task deleted"
        }
        ```
    *   **Error (404 Not Found):**
        ```json
        {
          "error": "Task not found"
        }
        ```
    *   **Error (500 Internal Server Error):**
        ```json
        {
          "error": "string"
        }
        ```
