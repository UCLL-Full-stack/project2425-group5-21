/**
 * @swagger
 *   components:
 *    schemas:
 *      Profile:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *              description: Game end date.
 *            username:
 *              type: string
 *              description: Profile username.
 *            bio:
 *              type: string
 *              description: Profile bio.
 *            avgWPM:
 *              type: number
 *              description: Profile average WPM.
 *            highestWPM:
 *              type: number
 *              description: Profile's highest WPM.
 *            role:
 *              type: Role
 *              description: Role of profile.
 *
 */
import express, { NextFunction, Request, Response } from 'express';
import profileService from '../service/profile.service';
import leaderboardService from '../service/leaderboard.service';
import { ProfileInput } from '../types';

const profileRouter = express.Router();

/**
 * @swagger
 * /profiles:
 *   get:
 *     summary: Get a list of all profiles.
 *     responses:
 *       200:
 *         description: A list of profiles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Profile'
 */
profileRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profiles = await profileService.getAllProfiles();
        res.status(200).json(profiles);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: 'error', errorMessage: error.message });
        }
    }
});

/**
 * @swagger
 * /profiles:
 *   post:
 *      summary: Create a new profile.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProfileInput'
 *      responses:
 *         200:
 *            description: The created profile.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Profile'
 */
profileRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profile = <ProfileInput>req.body;
        const result = await profileService.createProfile(profile);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /profiles/{type}:
 *   post:
 *      summary: Create a new profile and add it to a leaderboard by type (e.g., 15, 30, 60).
 *      parameters:
 *        - in: path
 *          name: type
 *          required: true
 *          description: The leaderboard type (e.g., 15, 30, 60).
 *          schema:
 *            type: number
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProfileInput'
 *      responses:
 *         200:
 *            description: The created profile and updated leaderboard.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Leaderboard'
 */

profileRouter.post('/:type', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profileInput = <ProfileInput>req.body;
        const leaderboardType: number = parseInt(req.params.type, 10);

        const newProfile = await profileService.createProfile(profileInput);
        const leaderboard = await leaderboardService.addProfileToLeaderboardType(
            newProfile,
            leaderboardType
        );

        res.status(200).json(leaderboard);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: 'error', errorMessage: error.message });
        }
    }
});

export { profileRouter };
