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
 *              description: Game end date.
 *            username:
 *              type: string
 *              description: Profile username.
 *            firstName:
 *              type: string
 *              description: User's first name.
 *            lastName:
 *              type: string
 *              description: User's last name.
 *            email:
 *              type: string
 *              description: User's email.
 *            password:
 *              type: string
 *              description: User's password.
 *            role:
 *              type: Role
 *              description: Role of user.
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
 *         description: ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 */
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.id);
        const user = await userService.getUserById(userId);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ status: 'error', errorMessage: 'User not found' });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: 'error', errorMessage: error.message });
        }
    }
});

export { userRouter };
