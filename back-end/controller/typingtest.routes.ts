/**
 * @swagger
 *   components:
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
 *     security:
 *       - bearerAuth: []
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

export { typingtestRouter };
