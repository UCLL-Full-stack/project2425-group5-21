import { Leaderboard } from '../model/leaderboard';
import profileDb from './profile.db';
import { Profile } from '../model/profile';

let leaderboards: Leaderboard[] = [];

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
            id: 1,
            rankings: getTopProfiles(allProfiles, 10),
            maxPlayers: 10,
            type: 15,
        }),
        new Leaderboard({
            id: 2,
            rankings: getTopProfiles(allProfiles, 3),
            maxPlayers: 10,
            type: 30,
        }),
        new Leaderboard({
            id: 3,
            rankings: getTopProfiles(allProfiles, 2),
            maxPlayers: 10,
            type: 60,
        }),
    ];
};

const getAllLeaderboards = async (): Promise<Leaderboard[]> => {
    return await createLeaderboards();
};

const getLeaderboardByType = async ({ type }: { type: number }): Promise<Leaderboard | null> => {
    const leaderboards = await createLeaderboards();
    return leaderboards.find((leaderboard) => leaderboard.getType() === type) || null;
};

const updateLeaderboard = (updatedLeaderboard: Leaderboard) => {
    const index = leaderboards.findIndex(
        (leaderboard) => leaderboard.getId() === updatedLeaderboard.getId()
    );
    if (index !== -1) {
        leaderboards[index] = updatedLeaderboard;
    }
};
export default {
    getAllLeaderboards,
    getLeaderboardByType,
    updateLeaderboard,
};
