import express, { Request, Response, NextFunction } from 'express';
import leaderboardService from '../service/leaderboard.service';

const leaderboardRouter = express.Router();

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

export { leaderboardRouter };
