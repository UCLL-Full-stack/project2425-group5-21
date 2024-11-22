import { Leaderboard } from '../model/leaderboard';
import { Profile } from '../model/profile';
import leaderboardDb from '../repository/leaderboard.db';

const getAllLeaderboards = async (): Promise<Leaderboard[]> => {
    return await leaderboardDb.getAllLeaderboards();
};

const getLeaderboardByType = async (type: number): Promise<Leaderboard> => {
    const leaderboard = await leaderboardDb.getLeaderboardByType({ type });
    if (!leaderboard) throw new Error(`Leaderboard doesn't exist with type ${type}.`);
    return leaderboard;
};

const addProfileToLeaderboardType = async (
    profile: Profile,
    type: number
): Promise<Leaderboard> => {
    if (!profile.username) {
        throw new Error('Username is required');
    }
    if (!profile.bio) {
        throw new Error('Bio is required');
    }
    if (profile.avgWPM === undefined) {
        throw new Error('AvgWPM is required');
    }
    if (profile.highestWPM === undefined) {
        throw new Error('HighestWPM is required');
    }
    if (!profile.startDate) {
        throw new Error('Start date is required');
    }
    if (!profile.role) {
        throw new Error('Role is required');
    }

    const leaderboard = await leaderboardDb.getLeaderboardByType({ type });

    const newProfile = new Profile(profile);

    if (!leaderboard) {
        throw new Error(`Leaderboard doesn't exist with type ${type}.`);
    }

    leaderboard.addProfile(newProfile);

    leaderboardDb.updateLeaderboard(leaderboard);

    return leaderboard;
};

export default {
    getAllLeaderboards,
    getLeaderboardByType,
    addProfileToLeaderboardType,
};
