import express from 'express';
import AuthController from '../controllers/AuthController';
import validateLoginUserData from '../lib/middlewares/validateLoginUserData';

const authRouter = express.Router();

authRouter.route('/login').post(validateLoginUserData, AuthController.login);
authRouter.route('/logout').get(AuthController.logout);
authRouter.route('/refresh').get(AuthController.refreshToken);

export default authRouter;

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Log in an existing user
 *     description: Log in an existing user with their credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password of the user.
 *             oneOf:
 *               - required:
 *                   - email
 *                   - password
 *               - required:
 *                   - username
 *                   - password
 *     responses:
 *       '200':
 *         description: User logged in successfully
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
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJ1c2VybmFtZSI6InRlc3R1c2VyIiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIn0.KTFw7aR7wph8Gz4XDP7h6v6rtZ0iq1F6L1M7Pd2fsmo
 *       '400':
 *         description: Bad request. Either email or username along with password is required.
 *       '401':
 *         description: Unauthorized. Incorrect username/email or password.
 *       '404':
 *         description: Not found. User with the provided username/email was not found.
 *       '500':
 *         description: Internal server error..
 *
 * /api/v1/auth/logout:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Log out the current user
 *     description: Log out the current user and remove it's refresh token from db.
 *     responses:
 *       '205':
 *         description: User logged out successfully
 *       '401':
 *         description: Unauthorized. Refresh token is not provided.
 *
 * /api/v1/auth/refresh:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Refresh user tokens
 *     description: Refresh the access and refresh tokens for the current user.
 *     responses:
 *       '200':
 *         description: Tokens refreshed successfully
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
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         username:
 *                           type: string
 *                           example: user1
 *                         email:
 *                           type: string
 *                           example: user1@gmail.com
 *                     accessToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VyMSIsImVtYWlsIjoidXNlcjFAZ21haWwuY29tIiwiaWF0IjoxNzE5NjU5MjcyLCJleHAiOjE3MTk2NjA0NzJ9.-9bSRUleQP2Fj-FZnXKEr4drM85F08xG5G8TcyTP2GE
 *                     refreshToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VyMSIsImVtYWlsIjoidXNlcjFAZ21haWwuY29tIiwiaWF0IjoxNzE5NjU5MjcyLCJleHAiOjE3MjA5NTUyNzJ9.ue6etDEgB8Ci6NLiSioDDT7Mpke7uqRsp6G2GJrUuaU
 *       '401':
 *         description: Unauthorized. Invalid refresh token
 */
