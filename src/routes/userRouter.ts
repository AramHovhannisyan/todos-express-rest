import express from 'express';
import UserController from '../controllers/UserController';
import validateCreateUserData from '../lib/middlewares/validateCreateUserData';

const userRouter = express.Router();
userRouter.route('/').post(validateCreateUserData, UserController.register);

export default userRouter;

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Operations related to user management such as registration
 *   - name: Authentication
 *     description: Operations related to user authentication such as login, logout, refresh token update
 *   - name: Task
 *     description: CRUD Operations related to task management
 */

/**
 * @swagger
 * /api/v1/user:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with a unique username and a valid email address.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: User registered successfully
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
 *                     user:
 *                       type: object
 *                       properties:
 *                         username:
 *                           type: string
 *                           example: johndoe
 *                         email:
 *                           type: string
 *                           example: johndoe@example.com
 *                     token:
 *                       type: string
 *                       example: abc123xyz456
 *       400:
 *         description: Bad request
 *       409:
 *         description: Conflict (user already exists)
 *       500:
 *         description: Internal server error
 */

