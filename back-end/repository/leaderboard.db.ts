import { Leaderboard } from '../model/leaderboard';
import userDb from './user.db';
import { User } from '../model/user';

const leaderboards = [
    new Leaderboard({
        id: 1,
        rankings: Array.from({ length: 7 }, (_, i) => userDb.getUserById(i + 1)).filter(user => user !== null) as User[],
        maxPlayers: 10,
    }),
];

const getAllLeaderboards = (): Leaderboard[] => {
    return leaderboards;
};

export default {
    getAllLeaderboards,
};
