import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';

const userRouter = express.Router();

userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
   try {
       const users = await userService.getAllUsers();
       res.status(200).json(users);
   } catch (error) {
       if (error instanceof Error) {
           res.status(400).json({ status: 'error', errorMessage: error.message });
       }
   }
});

userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.id);
        const user = await userService.getUserById(userId);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ status: 'error', errorMessage: 'User not found' });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: 'error', errorMessage: error.message });
        }
    }
});

export { userRouter };
