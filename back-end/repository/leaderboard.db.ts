import { Leaderboard } from '../model/leaderboard';
import userDb from './user.db';
import { User } from '../model/user';

const leaderboards = [
    new Leaderboard({
        id: 1,
        rankings: Array.from({ length: 5 }, (_, i) => userDb.getUserById(i + 1)).filter(user => user !== null) as User[],
        maxPlayers: 5,
        type: 15,
    }),
    new Leaderboard({
        id: 2,
        rankings: Array.from({ length: 5 }, (_, i) => userDb.getUserById(i + 6)).filter(user => user !== null) as User[],
        maxPlayers: 5,
        type: 30,
    }),
];

const getAllLeaderboards = (): Leaderboard[] => {
    return leaderboards;
};

export default {
    getAllLeaderboards,
};
