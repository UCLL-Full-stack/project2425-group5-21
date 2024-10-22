import { Leaderboard } from '../model/leaderboard';
import leaderboardDb from '../repository/leaderboard.db';

const getAllLeaderboards = async  (): Promise<Leaderboard[]> => {
    return leaderboardDb.getAllLeaderboards();
};

export default { getAllLeaderboards };