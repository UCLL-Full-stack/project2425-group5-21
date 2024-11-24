/**
 * @swagger
 *   components:
 *    schemas:
 *      AuthenticationResponse:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 *              description: Authentication response.
 *            token:
 *              type: string
 *              description: JWT access token.
 *            username:
 *              type: string
 *              description: User name.
 *      AuthenticationRequest:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *              description: User name.
 *            password:
 *              type: string
 *              description: User password.
 *      User:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            username:
 *              type: string
 *              description: User name.
 *            email:
 *              type: string
 *              description: E-mail.
 *            password:
 *              type: string
 *              description: User password.
 *            creationDate:
 *              type: string
 *              format: date-time
 *              description: Date when the user was created.
 *            role:
 *               $ref: '#/components/schemas/Role'
 *      UserInput:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *              description: User name.
 *            email:
 *              type: string
 *              description: E-mail.
 *            password:
 *              type: string
 *              description: User password.
 *            creationDate:
 *              type: string
 *              format: date-time
 *              description: Date when the user was created.
 *            role:
 *               $ref: '#/components/schemas/Role'
 *      Role:
 *          type: string
 *          enum: [player, admin]
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     security:
 *       - bearerAuth: []
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
 *     security:
 *       - bearerAuth: []
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
 * /users/{username}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a user by username.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username of the user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A user with the given Username.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.get('/:username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getUserByUsername({ username: req.params.username });
        if (!user) {
            return res.status(404).json({
                status: 'error',
                errorMessage: `User with username ${req.params.username} not found.`,
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
 *     security:
 *       - bearerAuth: []
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

/**
 * @swagger
 * /users/{id}/typingTests/{type}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get typing tests by user ID and type.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user.
 *         schema:
 *           type: number
 *       - in: path
 *         name: type
 *         required: true
 *         description: Type of the typing test (singleplayer or multiplayer).
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of typing tests for the given user ID and type.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/TypingTest'
 */
userRouter.get(
    '/:id/typingTests/:type',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = Number(req.params.id);
            const type = req.params.type;
            const typingTests = await userService.getTypingTestsByUserAndType(userId, type);
            res.status(200).json(typingTests);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ status: 'error', errorMessage: error.message });
            }
        }
    }
);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login using username/password. Returns an object with JWT token and user name when successful.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthenticationRequest'
 *     responses:
 *       200:
 *         description: The created user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationResponse'
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const response = await userService.authenticate(userInput);
        res.status(200).json({ message: 'Authentication succesful', ...response });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Create a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: The created user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const user = await userService.createUser(userInput);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

export { userRouter };
