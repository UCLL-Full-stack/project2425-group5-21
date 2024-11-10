import { Leaderboard } from '../model/leaderboard';
import { Profile } from '../model/profile';
import leaderboardDb from '../repository/leaderboard.db';
import profileDb from '../repository/profile.db';
import { ProfileInput } from '../types';

const getAllLeaderboards = async (): Promise<Leaderboard[]> => {
    return leaderboardDb.getAllLeaderboards();
};

const getLeaderboardByType = (type: number): Leaderboard => {
    const leaderboard = leaderboardDb.getLeaderboardByType({ type });
    if (!leaderboard) throw new Error(`Leaderboard doesn't exist with type ${type}.`);
    return leaderboard;
};

const addProfileToLeaderboardType = async (
    profileInput: ProfileInput,
    type: number
): Promise<Leaderboard> => {
    if (!profileInput.id) {
        throw new Error('Profile ID is required');
    }
    if (!profileInput.username) {
        throw new Error('Username is required');
    }
    if (!profileInput.bio) {
        throw new Error('Bio is required');
    }
    if (profileInput.avgWPM === undefined) {
        throw new Error('AvgWPM is required');
    }
    if (profileInput.highestWPM === undefined) {
        throw new Error('HighestWPM is required');
    }
    if (!profileInput.startDate) {
        throw new Error('Start date is required');
    }
    if (!profileInput.role) {
        throw new Error('Role is required');
    }

    const leaderboard = leaderboardDb.getLeaderboardByType({ type });

    const newProfile = new Profile(profileInput);

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
