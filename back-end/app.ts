import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { userRouter } from './controller/user.routes';
import { tournamentRouter } from './controller/tournament.routes';
import profileService from './service/profile.service';
import { profileRouter } from './controller/profile.routes';
import { typingtestRouter } from './controller/typingtest.routes';
import { challengeRouter } from './controller/challenge.routes';
import { leaderboardRouter } from './controller/leaderboard.router';
import { gameRouter } from './controller/game.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/users', userRouter);
app.use('/tournaments', tournamentRouter);
app.use('/profiles', profileRouter);
app.use('/typingtests', typingtestRouter);
app.use('/challenges', challengeRouter);
app.use('/leaderboards', leaderboardRouter);
app.use('/games', gameRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
