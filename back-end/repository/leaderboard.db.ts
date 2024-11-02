import { Leaderboard } from '../model/leaderboard';
import profileDb from './profile.db';
import { Profile } from '../model/profile';

const getTopProfiles = (totalProfiles: Profile[], count: number): Profile[] => {
    const sortedProfiles = totalProfiles
        .sort((a, b) => (b.getHighestWPM() || 0) - (a.getHighestWPM() || 0));

    return sortedProfiles.slice(0, count);
};

const createLeaderboard = (id: number): Leaderboard => {
    const allProfiles = profileDb.getAllProfiles();
    return new Leaderboard({
        id,
        rankings: getTopProfiles(allProfiles, 10),
        maxPlayers: 10,
    });
};

const getAllLeaderboards = (): Leaderboard[] => {
    return [
        createLeaderboard(1)
    ];
};

export default {
    getAllLeaderboards,
};
