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
 *            scores:
 *              type: array
 *              description: array of TypingTests.
 *            maxPlayers:
 *              type: number
 *              description: Number of max players.
 *            type:
 *              type: number
 *              description: Type of leaderboard.
 *
 */
import express, { Request, Response, NextFunction } from 'express';
import leaderboardService from '../service/leaderboard.service';

const leaderboardRouter = express.Router();

/**
 * @swagger
 * /leaderboards:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all leaderboards.
 *     responses:
 *       200:
 *         description: A list of leaderboards.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Leaderboard'
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

/**
 * @swagger
 * /leaderboards/{type}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a leaderboard by type.
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         description: Type of leaderboard.
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: A leaderboard with the given type.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Leaderboard'
 */
leaderboardRouter.get('/:type', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const leaderboard = await leaderboardService.getLeaderboardByType(Number(req.params.type));
        if (!leaderboard) {
            return res.status(404).json({
                status: 'error',
                errorMessage: `Leaderboard with type ${req.params.type} not found.`,
            });
        }
        res.status(200).json(leaderboard);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: 'error', errorMessage: error.message });
        }
    }
});

export { leaderboardRouter };
