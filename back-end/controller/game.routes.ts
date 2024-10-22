import express, { Request, Response, NextFunction } from 'express';
import gameService from '../service/game.service';

const gameRouter = express.Router();

gameRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const games = await gameService.getAllGames();
        res.status(200).json(games);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: 'error', errorMessage: error.message });
        }
    }
});

export { gameRouter };