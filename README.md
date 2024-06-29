# Project Overview

This project is a RESTful API built with Node.js and Express.js. It provides endpoints for registration, authentication, and task management. Sequelize is used as the ORM (Object-Relational Mapping) tool for interacting with the MySQL database. The project follows the MVC (Model-View-Controller) architecture pattern for organizing code.

## Technologies Used

- **Express**: Web framework for Node.js.
- **Sequelize**: Promise-based ORM for Node.js.
- **bcryptjs**: Library for hashing passwords.
- **JWT**: JSON Web Tokens for authentication.
- **dotenv**: Loads environment variables from a `.env` file.
- **helmet**: Middleware for securing Express apps with various HTTP headers.
- **express-rate-limit**: middleware for Basic rate-limiting in Express apps.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express apps.
- **morgan**: HTTP request logger middleware for Node.js.
- **Swagger**: Tool for documenting and testing APIs.

## Documentation

You can access the Swagger documentation for this project at [http://localhost:${SERVER_PORT}/api-docs](http://localhost:${SERVER_PORT}/api-docs).

## Routes

### User Routes

- **POST /api/v1/user**: Register a new user.

### Authentication Routes

- **POST /api/v1/auth/login**: Log in an existing user.
- **POST /api/v1/auth/logout**: Log out the current user.
- **POST /api/v1/auth/refresh**: Refresh the access and refresh tokens for the logged in user.

### Task Routes

- **GET /api/v1/task**: Get a list of all tasks for the logged in user.
- **POST /api/v1/task**: Create a new task.
- **GET /api/v1/task/:id**: Get a specific task.
- **PUT /api/v1/task/:id**: Update a specific task (including partial update).
- **DELETE /api/v1/task/:id**: Delete a specific task.
- **PATCH /api/v1/task/{id}/{status}**:Mark task as provided status (pending | completed).

## Installation

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone git@github.com:AramHovhannisyan/todos-express-rest.git
   ```

2. Install dependencies:

  ```bash
  cd todos-express-rest
  npm install
   ```

3. Set up the environment variables by creating a .env.${NODE_ENV} file in the root directory::

  ```bash
  SERVER_PORT
  NODE_ENV
  JWT_ACCESS_SECRET
  JWT_REFRESH_SECRET
  JWT_SECRET_EXPIRES
  JWT_REFRESH_EXPIRES

  DB_HOST
  DB_USERNAME
  DB_PASSWORD
  DB_NAME
   ```

4. Start the server:

  ```bash
  npm run start or npm run prod
   ```

5. Testing:

  To run tests, use the following command:

  ```bash
  npm test
   ```
