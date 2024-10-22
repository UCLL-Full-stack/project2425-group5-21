import express, { NextFunction, Request, Response } from 'express';
import challengeService from '../service/challenge.service';

const challengeRouter = express.Router();

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
