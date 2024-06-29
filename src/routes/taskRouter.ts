import express from 'express';
import authMiddleware from '../lib/middlewares/authMiddleware';
import TaskController from '../controllers/TaskController';
import validateRequestParamId from '../lib/middlewares/validateRequestParamId';
import validateTaskUpdateRequestData from '../lib/middlewares/validateTaskUpdateRequestData';
import validateTaskCreationRequestData from '../lib/middlewares/validateTaskCreationRequest';
import validateTaskMarkAsRequestData from '../lib/middlewares/validateTaskMarkAsRequestData';

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

taskRouter.route('/:id/:status')
  .patch(validateRequestParamId, validateTaskMarkAsRequestData, TaskController.markAs)

export default taskRouter;

/**
 * @swagger
 * /api/v1/task:
 *   get:
 *     tags: [Task]
 *     summary: Get all tasks
 *     description: Retrieve a list of all tasks. Requires a valid JWT token.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved list of tasks
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
 *                     tasks:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           title:
 *                             type: string
 *                             example: Task title 1
 *                           content:
 *                             type: string
 *                             example: The explanation of the task 1...
 *                           status:
 *                             type: string
 *                             enum:
 *                               - pending
 *                               - completed
 *                             example: pending
 *       '401':
 *         description: Unauthorized. Missing or invalid token.
 *       '500':
 *         description: Internal server error
 *   post:
 *     tags: [Task]
 *     summary: Create a new task
 *     description: Create a new task. Requires a valid JWT token. The status field is optional and defaults to "pending".
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Task title 1
 *               content:
 *                 type: string
 *                 example: The explanation of the task 1...
 *               status:
 *                 type: string
 *                 enum:
 *                   - pending
 *                   - completed
 *                 example: pending
 *                 default: pending
 *     responses:
 *       '200':
 *         description: Successfully created a new task
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
 *                     task:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                           example: Task title 1
 *                         content:
 *                           type: string
 *                           example: The explanation of the task 1...
 *                         status:
 *                           type: string
 *                           enum:
 *                             - pending
 *                             - completed
 *                           example: pending
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized. Missing or invalid token.
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/task/{id}:
 *   get:
 *     tags: [Task]
 *     summary: Get a task by ID
 *     description: Retrieve a single task by its ID. Requires a valid JWT token.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the task to retrieve
 *     responses:
 *       '200':
 *         description: Successfully retrieved the task
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
 *                     task:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                           example: Task title 1
 *                         content:
 *                           type: string
 *                           example: The explanation of the task 1...
 *                         status:
 *                           type: string
 *                           enum:
 *                             - pending
 *                             - completed
 *                           example: pending
 *       '404':
 *         description: Task not found
 *       '401':
 *         description: Unauthorized. Missing or invalid token.
 *       '500':
 *         description: Internal server error
 *   put:
 *     tags: [Task]
 *     summary: Update a task by ID
 *     description: Update the details of a task by its ID. Requires a valid JWT token. At least one of the fields must be provided.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Task title
 *               content:
 *                 type: string
 *                 example: Updated explanation of the task...
 *               status:
 *                 type: string
 *                 enum:
 *                   - pending
 *                   - completed
 *                 example: pending
 *             required: []
 *     responses:
 *       '200':
 *         description: Successfully updated the task
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
 *                     task:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         title:
 *                           type: string
 *                           example: Updated Task title
 *                         content:
 *                           type: string
 *                           example: Updated explanation of the task...
 *                         status:
 *                           type: string
 *                           enum:
 *                             - pending
 *                             - completed
 *                           example: pending
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Task not found
 *       '401':
 *         description: Unauthorized. Missing or invalid token.
 *       '500':
 *         description: Internal server error
 *   delete:
 *     tags: [Task]
 *     summary: Delete a task by ID
 *     description: Delete a task by its ID. Requires a valid JWT token.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the task to delete
 *     responses:
 *       '204':
 *         description: Successfully deleted the task
 *       '404':
 *         description: Task not found
 *       '401':
 *         description: Unauthorized. Missing or invalid token.
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/task/{id}/{status}:
 *   patch:
 *     tags: [Task]
 *     summary: Update task status by ID
 *     description: Update the status of a task by its ID. Requires a valid JWT token.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the task to update
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - pending
 *             - completed
 *           example: pending
 *         description: The new value for the task status
 *     responses:
 *       '200':
 *         description: Successfully updated the task
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
 *                     task:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         title:
 *                           type: string
 *                           example: Updated Task title
 *                         content:
 *                           type: string
 *                           example: Updated explanation of the task...
 *                         status:
 *                           type: string
 *                           enum:
 *                             - pending
 *                             - completed
 *                           example: pending
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Task not found
 *       '401':
 *         description: Unauthorized. Missing or invalid token.
 */