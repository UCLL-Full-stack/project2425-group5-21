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
 *     summary: Get a list of all typingtests.
 *     responses:
 *       200:
 *         description: A list of typingtests.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Typingtest'
 */
typingtestRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const typingTests = await typingtestService.getAllTypingTests();
        res.status(200).json(typingTests);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: 'error', errorMessage: error.message });
        }
    }
});

export { typingtestRouter };
