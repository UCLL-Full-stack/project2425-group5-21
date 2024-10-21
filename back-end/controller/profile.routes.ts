import express, { NextFunction, Request, Response } from 'express';
import { tr } from 'date-fns/locale';
import userService from '../service/user.service';
import profileService from '../service/profile.service';

const profileRouter = express.Router();

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

export { profileRouter };
