/**
 * @swagger
 *   components:
 *    schemas:
 *      Game:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            startDate:
 *              type: Date
 *              description: Game start date.
 *            endDate:
 *              type: Date
 *              description: Game end date.
 *            Players:
 *              type: array
 *              description: array of Players.
 *            status:
 *              type: string
 *              description: Game status.
 *
 */
import express, { Request, Response, NextFunction } from 'express';
import gameService from '../service/game.service';

const gameRouter = express.Router();

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Get a list of all games.
 *     responses:
 *       200:
 *         description: A list of games.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Game'
 */
gameRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const games = await gameService.getAllGamesWithUsers();
        res.status(200).json(games);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: 'error', errorMessage: error.message });
        }
    }
});

/**
 * @swagger
 * /games/{id}:
 *   get:
 *     summary: Get a game by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the game.
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: A game with the given ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 */
gameRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const game = await gameService.getGameByIdWithUsers(Number(req.params.id));
        if (!game) {
            return res.status(404).json({
                status: 'error',
                errorMessage: `Game with ID ${req.params.id} not found.`,
            });
        }
        res.status(200).json(game);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: 'error', errorMessage: error.message });
        }
    }
});

export { gameRouter };
