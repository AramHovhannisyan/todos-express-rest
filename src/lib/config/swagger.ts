import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
      openapi: '3.0.0',
      info: {
          title: 'Task Management System',
          version: '1.0.0',
          description: 'This API allows you to manage tasks including creating, reading, updating, and deleting records. All endpoints are protected by Bearer type authentication.',
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
  apis: ['./src/routes/*.ts'], // All API routes
};

const specs = swaggerJsdoc(options);

export default specs;
