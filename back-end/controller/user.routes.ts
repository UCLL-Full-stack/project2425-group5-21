/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
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
 *              type: string
 *              description: User's role.
 *              $ref: '#/components/schemas/Role'
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
 *          enum: [player, admin, guest]
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [User]
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
 *     tags: [User]
 *     security:
 *      - bearerAuth: []
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
 *     tags: [User]
 *     security:
 *      - bearerAuth: []
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
        res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: 'error', errorMessage: error.message });
        }
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags: [User]
 *     summary: Login using username/password. Returns an object with JWT token, user name and role when successful.
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
 *     tags: [User]
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

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [User]
 *     security:
 *      - bearerAuth: []
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.id, 10);
    try {
        await userService.deleteUser(userId);
        res.status(200).json({ message: 'User succesfully deleted' });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /user/{id}/username:
 *   put:
 *     tags: [User]
 *     security:
 *      - bearerAuth: []
 *     summary: Update a user's username
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *       - in: body
 *         name: username
 *         schema:
 *           type: object
 *           required:
 *             - username
 *           properties:
 *             username:
 *               type: string
 *         required: true
 *         description: The new username
 *     responses:
 *       200:
 *         description: Username updated successfully
 *       404:
 *         description: User not found
 *       409:
 *         description: Username already taken
 *       500:
 *         description: Internal server error
 */
userRouter.put('/:id/username', async (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.id, 10);
    const { username } = req.body;

    try {
        await userService.updateUsername(userId, username);
        res.status(200).send({ message: 'Username updated successfully' });
    } catch (error) {
        if (error instanceof Error && error.message.includes('does not exist')) {
            res.status(404).send({ error: error.message });
        } else if (error instanceof Error && error.message.includes('is already taken')) {
            res.status(409).send({ error: error.message });
        } else {
            next(error);
        }
    }
});

export { userRouter };
