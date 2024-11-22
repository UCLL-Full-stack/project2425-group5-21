/**
 * @swagger
 *   components:
 *    schemas:
 *      User:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *              description: User ID.
 *            username:
 *              type: string
 *              description: Profile username.
 *            email:
 *              type: string
 *              description: User's email.
 *            password:
 *              type: string
 *              description: User's password.
 *            role:
 *              type: string
 *              description: Role of user.
 *            creationDate:
 *              type: string
 *              format: date-time
 *              description: Date when the user was created.
 *
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: 'error', errorMessage: error.message });
        }
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user.
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: A user with the given ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getUserById(Number(req.params.id));
        if (!user) {
            return res.status(404).json({
                status: 'error',
                errorMessage: `User with ID ${req.params.id} not found.`,
            });
        }
        res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: 'error', errorMessage: error.message });
        }
    }
});

/**
 * @swagger
 * /users/{id}/typingTests:
 *   get:
 *     summary: Get typing tests by user ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user.
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: A list of typing tests for the given user ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/TypingTest'
 */
userRouter.get('/:id/typingTests', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const typingTests = await userService.getTypingTestsByUser(Number(req.params.id));
        res.status(200).json(typingTests);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: 'error', errorMessage: error.message });
        }
    }
});

export { userRouter };
