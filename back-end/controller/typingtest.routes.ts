import express, { NextFunction, Request, Response } from 'express';
import typingtestService from '../service/typingtest.service';

const typingtestRouter = express.Router();

typingtestRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const typingTests = await typingtestService.getAllTypingTests();
        res.status(200).json(typingTests);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ status: 'error', errorMessage: error.message });
        }
    }
});

export { typingtestRouter };
