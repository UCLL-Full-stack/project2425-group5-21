/**
 * @swagger
 *   components:
 *    schemas:
 *      Leaderboard:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *              description: Game end date.
 *            Rankings:
 *              type: array
 *              description: array of Profiles.
 *            maxPlayers:
 *              type: number
 *              description: Number of max players.
 *            type:
 *              type: number
 *              description: Type number leaderboard.
 *
 */
import express, { Request, Response, NextFunction } from 'express';
import leaderboardService from '../service/leaderboard.service';

const leaderboardRouter = express.Router();

/**
 * @swagger
 * /leaderboards:
 *   get:
 *     summary: Get a list of all leaderboards.
 *     responses:
 *       200:
 *         description: A list of leaderboards.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Leaderboard'
 */
leaderboardRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const leaderboards = await leaderboardService.getAllLeaderboards();
        res.status(200).json(leaderboards);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: 'error', errorMessage: error.message });
        }
    }
});

export { leaderboardRouter};
