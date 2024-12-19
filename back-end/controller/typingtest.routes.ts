/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Typingtest:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *              description: Game end date.
 *            wpm:
 *              type: number
 *              description: Typing test wpm.
 *            accuracy:
 *              type: number
 *              description: Typing test accuracy.
 *            time:
 *              type: number
 *              description: Typing test time.
 *            type:
 *              type: string
 *              description: Typing test type.
 *
 */
import express, { NextFunction, Request, Response } from 'express';
import typingtestService from '../service/typingtest.service';

const typingtestRouter = express.Router();

/**
 * @swagger
 * /typingtests:
 *   get:
 *     tags: [Typingtest]
 *     security:
 *      - bearerAuth: []
 *     summary: Get a list of all typingtest.
 *     responses:
 *       200:
 *         description: A list of typingtest.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Typingtest'
 */
typingtestRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: string } };
        const { username, role } = request.auth;
        const typingTests = await typingtestService.getTypingTest({ username, role });
        res.status(200).json(typingTests);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /typingtests/user/{id}:
 *   get:
 *     tags: [Typingtest]
 *     security:
 *      - bearerAuth: []
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
 *                  $ref: '#/components/schemas/Typingtest'
 */
typingtestRouter.get('/user/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const typingTests = await typingtestService.getTypingTestsByUser(Number(req.params.id));
        res.status(200).json(typingTests);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: 'error', errorMessage: error.message });
        }
    }
});

/**
 * @swagger
 * /typingtests/user/{id}/{type}:
 *   get:
 *     tags: [Typingtest]
 *     security:
 *      - bearerAuth: []
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
 *         description: Type of the typing test.
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
 *                  $ref: '#/components/schemas/Typingtest'
 */
typingtestRouter.get('/user/:id/:type', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const typingTests = await typingtestService.getTypingTestsByUserAndType(
            Number(req.params.id),
            req.params.type
        );
        res.status(200).json(typingTests);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: 'error', errorMessage: error.message });
        }
    }
});

/**
 * @swagger
 * /typingtests:
 *   post:
 *     tags: [Typingtest]
 *     security:
 *      - bearerAuth: []
 *     summary: Create a new typing test with game.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               wpm:
 *                 type: number
 *               accuracy:
 *                 type: number
 *               time:
 *                 type: number
 *               type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created typing test
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Typingtest'
 */
typingtestRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: string } };
        const { username } = request.auth;
        const { wpm, accuracy, time, type } = req.body;

        const typingTest = await typingtestService.createTypingTest({
            wpm,
            accuracy,
            time,
            type,
            username
        });

        res.status(201).json(typingTest);
    } catch (error) {
        next(error);
    }
});


export { typingtestRouter };
