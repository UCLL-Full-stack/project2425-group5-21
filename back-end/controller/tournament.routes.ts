/**
 * @swagger
 *   components:
 *    schemas:
 *      Tournament:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *              description: Game end date.
 *           name:
 *              type: string
 *              description: Tournament name.
 *            startDate:
 *              type: Date
 *              description: Tournament start date.
 *            endDate:
 *              type: Date
 *              description: Tournament end date.
 *            difficulty:
 *              type: string
 *              description: Difficulty expertise.
 *
 */
import express, { NextFunction, Request, Response } from 'express';
import tournamentService from '../service/tournament.service';

const tournamentRouter = express.Router();

/**
 * @swagger
 * /tournaments:
 *   get:
 *     summary: Get a list of all tournaments.
 *     responses:
 *       200:
 *         description: A list of tournaments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Tournament'
 */
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
