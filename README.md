# Project Overview

This project is a RESTful API built with Node.js and Express.js. It provides endpoints for managing users, authentication, books, and authors. Sequelize is used as the ORM (Object-Relational Mapping) tool for interacting with the MySQL database. The project follows the MVC (Model-View-Controller) architecture pattern for organizing code.

## Technologies Used

- **Express**: Web framework for Node.js.
- **Sequelize**: Promise-based ORM for Node.js.
- **bcryptjs**: Library for hashing passwords.
- **JWT**: JSON Web Tokens for authentication.
- **dotenv**: Loads environment variables from a `.env` file.
- **helmet**: Middleware for securing Express apps with various HTTP headers.
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

### Book Routes

- **GET /api/v1/book**: Get all books.
- **POST /api/v1/book**: Create a new book.
- **GET /api/v1/book/:id**: Get a specific book.
- **PUT /api/v1/book/:id**: Update a specific book.
- **DELETE /api/v1/book/:id**: Delete a specific book.

### Author Routes

- **GET /api/v1/author**: Get all authors.
- **POST /api/v1/author**: Create a new author.
- **GET /api/v1/author/:id**: Get a specific author.
- **PUT /api/v1/author/:id**: Update a specific author.
- **DELETE /api/v1/author/:id**: Delete a specific author.

## Installation

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone git@github.com:AramHovhannisyan/express-auth-rest-books-authors.git
   ```

2. Install dependencies:

  ```bash
  cd express-auth-rest-books-authors
  npm install
   ```

3. Set up the environment variables by creating a .env.${NODE_ENV} file in the root directory::

  ```bash
  SERVER_PORT
  NODE_ENV
  JWT_SECRET
  JWT_SECRET_EXPIRES

  DB_HOST
  DB_USERNAME
  DB_PASSWORD
  DB_NAME
   ```

4. Start the server:

  ```bash
  npm start or npm run prod
   ```

5. Testing:

  To run tests, use the following command:

  ```bash
  npm test
   ```
