/**
 * @swagger
 *   components:
 *    schemas:
 *      Challenge:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Challenge name.
 *            description:
 *              type: string
 *              description: Description expertise.
 *            difficulty:
 *              type: string
 *              description: Difficulty expertise.
 *
 */
import express, { NextFunction, Request, Response } from 'express';
import challengeService from '../service/challenge.service';

const challengeRouter = express.Router();

/**
 * @swagger
 * /challenges:
 *   get:
 *     summary: Get a list of all challenges.
 *     responses:
 *       200:
 *         description: A list of challenges.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Challenge'
 */
challengeRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const challenges = await challengeService.getAllChallenges();
        res.status(200).json(challenges);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: 'error', errorMessage: error.message });
        }
    }
});

export { challengeRouter };
