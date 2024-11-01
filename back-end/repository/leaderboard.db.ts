import { Leaderboard } from '../model/leaderboard';
import profileDb from './profile.db';
import { Profile } from '../model/profile';

// Function to get random profiles and sort them by highest WPM
const getRandomProfiles = (totalProfiles: Profile[], count: number): Profile[] => {
    const shuffled = totalProfiles.sort(() => 0.5 - Math.random());
    const selectedProfiles = shuffled.slice(0, count);

    return selectedProfiles.sort((a, b) => {
        const aWPM = a.getHighestWPM() || 0;
        const bWPM = b.getHighestWPM() || 0;
        return bWPM - aWPM;
    });
};

const allProfiles = profileDb.getAllProfiles();

const leaderboards = [
    new Leaderboard({
        id: 1,
        rankings: getRandomProfiles(allProfiles, 10),
        maxPlayers: 10,
        type: 15,
    }),
    new Leaderboard({
        id: 2,
        rankings: getRandomProfiles(allProfiles, 10),
        maxPlayers: 10,
        type: 30,
    }),
    new Leaderboard({
        id: 3,
        rankings: getRandomProfiles(allProfiles, 10),
        maxPlayers: 10,
        type: 60,
    }),
];

const getAllLeaderboards = (): Leaderboard[] => {
    return leaderboards;
};

export default {
    getAllLeaderboards,
};
