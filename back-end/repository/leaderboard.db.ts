import { Leaderboard } from '../model/leaderboard';
import database from './database';

const getAllLeaderboards = async (): Promise<Leaderboard[]> => {
    try {
        const leaderboardsPrisma = await database.leaderboard.findMany({
            include: {
                scores: true,
            },
        });
        return leaderboardsPrisma.map((leaderboardPrisma) => Leaderboard.from(leaderboardPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getLeaderboardByType = async ({ type }: { type: number }): Promise<Leaderboard | null> => {
    try {
        const leaderboardPrisma = await database.leaderboard.findFirst({
            where: { type },
            include: {
                scores: true,
            },
        });
        return leaderboardPrisma ? Leaderboard.from(leaderboardPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllLeaderboards,
    getLeaderboardByType,
};
