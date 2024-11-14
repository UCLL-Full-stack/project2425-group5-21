import { Leaderboard } from '../model/leaderboard';
import profileDb from './profile.db';
import { Profile } from '../model/profile';
import database from './database';

const getTopProfiles = (totalProfiles: Profile[], count: number): Profile[] => {
    const sortedProfiles = totalProfiles.sort(
        (a, b) => (b.getHighestWPM() || 0) - (a.getHighestWPM() || 0)
    );

    return sortedProfiles.slice(0, count);
};

const createLeaderboards = async (): Promise<Leaderboard[]> => {
    const allProfiles = await profileDb.getAllProfiles();
    return [
        new Leaderboard({
            maxPlayers: 10,
            type: 15,
            profiles: getTopProfiles(allProfiles, 10),
        }),
        new Leaderboard({
            maxPlayers: 10,
            type: 30,
            profiles: getTopProfiles(allProfiles, 3),
        }),
        new Leaderboard({
            maxPlayers: 10,
            type: 60,
            profiles: getTopProfiles(allProfiles, 2),
        }),
    ];
};

const getAllLeaderboards = async (): Promise<Leaderboard[]> => {
    try {
        const leaderboardsPrisma = await database.leaderboard.findMany({
            include: {
                profiles: true,
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
                profiles: true,
            },
        });
        return leaderboardPrisma ? Leaderboard.from(leaderboardPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateLeaderboard = async (updatedLeaderboard: Leaderboard): Promise<void> => {
    try {
        await database.leaderboard.update({
            where: { id: updatedLeaderboard.getId() },
            data: {
                maxPlayers: updatedLeaderboard.getMaxPlayers(),
                type: updatedLeaderboard.getType(),
                profiles: {
                    set: updatedLeaderboard
                        .getProfiles()
                        .map((profile) => ({ id: profile.getId() })),
                },
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllLeaderboards,
    getLeaderboardByType,
    updateLeaderboard,
};
