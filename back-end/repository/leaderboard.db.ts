import { Leaderboard } from '../model/leaderboard';
import profileDb from './profile.db';
import { Profile } from '../model/profile';

const leaderboards = [
    new Leaderboard({
        id: 1,
        rankings: Array.from({ length: 5 }, (_, i) => profileDb.getProfileById(i + 1)).filter(user => user !== null) as Profile[],
        maxPlayers: 5,
        type: 15,
    }),
    new Leaderboard({
        id: 2,
        rankings: Array.from({ length: 5 }, (_, i) => profileDb.getProfileById(i + 1)).filter(user => user !== null) as Profile[],
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
