import express from 'express';
import authMiddleware from '../lib/middlewares/authMiddleware';
import TaskController from '../controllers/TaskController';
import validateRequestParamId from '../lib/middlewares/validateRequestParamId';
import validateTaskUpdateRequestData from '../lib/middlewares/validateTaskUpdateRequestData';
import validateTaskCreationRequestData from '../lib/middlewares/validateTaskCreationRequest';

const taskRouter = express.Router();

// Apply protection to all routes
taskRouter.use(authMiddleware);

taskRouter.route('/')
  .get(TaskController.getAllTasks)
  .post(validateTaskCreationRequestData, TaskController.create);

taskRouter.route('/:id')
  .get(validateRequestParamId, TaskController.get)
  .put(validateRequestParamId, validateTaskUpdateRequestData, TaskController.update)
  .delete(validateRequestParamId, TaskController.delete);

export default taskRouter;

/**
 * @swagger
 * /api/v1/author:
 *   get:
 *     tags: [Author]
 *     summary: Get all authors
 *     description: Retrieve a list of all authors. Requires a valid JWT token.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved list of authors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     authors:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: John Doe
 *                           biography:
 *                             type: string
 *                             example: An accomplished author known for...
 *                           dateOfBirth:
 *                             type: string
 *                             format: date
 *                             example: 1970-01-01
 *       '401':
 *         description: Unauthorized. Missing or invalid token.
 *       '500':
 *         description: Internal server error
 *   post:
 *     tags: [Author]
 *     summary: Create a new author
 *     description: Create a new author. Requires a valid JWT token.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               biography:
 *                 type: string
 *                 example: An accomplished author known for...
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: 1970-01-01
 *     responses:
 *       '200':
 *         description: Successfully created a new author
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     author:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: John Doe
 *                         biography:
 *                           type: string
 *                           example: An accomplished author known for...
 *                         dateOfBirth:
 *                           type: string
 *                           format: date
 *                           example: 1970-01-01
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized. Missing or invalid token.
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/author/{id}:
 *   get:
 *     tags: [Author]
 *     summary: Get an author by ID
 *     description: Retrieve a single author by its ID. Requires a valid JWT token.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the author to retrieve
 *     responses:
 *       '200':
 *         description: Successfully retrieved the author
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     author:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: John Doe
 *                         biography:
 *                           type: string
 *                           example: An accomplished author known for...
 *                         dateOfBirth:
 *                           type: string
 *                           format: date
 *                           example: 1970-01-01
 *       '404':
 *         description: Author not found
 *       '401':
 *         description: Unauthorized. Missing or invalid token.
 *       '500':
 *         description: Internal server error
 *   put:
 *     tags: [Author]
 *     summary: Update an author by ID
 *     description: Update the details of an author by its ID. Requires a valid JWT token.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the author to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Name
 *               biography:
 *                 type: string
 *                 example: Updated biography...
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: 1970-01-01
 *     responses:
 *       '200':
 *         description: Successfully updated the author
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     author:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: Updated Name
 *                         biography:
 *                           type: string
 *                           example: Updated biography...
 *                         dateOfBirth:
 *                           type: string
 *                           format: date
 *                           example: 1970-01-01
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Author not found
 *       '401':
 *         description: Unauthorized. Missing or invalid token.
 *       '500':
 *         description: Internal server error
 *   delete:
 *     tags: [Author]
 *     summary: Delete an author by ID
 *     description: Delete an author by its ID. Requires a valid JWT token.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the author to delete
 *     responses:
 *       '204':
 *         description: Successfully deleted the author
 *       '404':
 *         description: Author not found
 *       '401':
 *         description: Unauthorized. Missing or invalid token.
 *       '500':
 *         description: Internal server error
 */
