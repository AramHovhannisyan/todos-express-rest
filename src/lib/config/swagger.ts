import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
      openapi: '3.0.0',
      info: {
          title: 'Book Management System',
          version: '1.0.0',
          description: 'This API should allow for the management of books and authors, including creating, reading, updating, and deleting records.',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      }
  },
  // Path to the API specs
  apis: ['./src/routes/*.ts'], // Your API routes
};

const specs = swaggerJsdoc(options);

export default specs;
