import express, { NextFunction, Request, Response } from 'express';
import tournamentService from '../service/tournament.service';

const tournamentRouter = express.Router();

tournamentRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tournaments = await tournamentService.getAllTournaments();
        res.status(200).json(tournaments);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: 'error', errorMessage: error.message });
        }
    }
});

export { tournamentRouter };
