import { Profile } from '../model/profile';

const profiles = [
    new Profile({
        id: 1,
        username: 'johndoe',
        bio: 'I love to program and to type fast.',
        avgWPM: 122.34,
        highestWPM: 140.34,
        startDate: new Date(2024, 10, 2),
        role: 'player',
    }),
    new Profile({
        id: 2,
        username: 'janedoe',
        bio: 'I enjoy solving puzzles and achieving high typing speeds.',
        avgWPM: 98,
        highestWPM: 120.34,
        startDate: new Date(2024, 12, 2),
        role: 'player',
    }),
    new Profile({
        id: 3,
        username: 'michaelking',
        bio: 'Competitive typist and coder.',
        avgWPM: 115.2,
        highestWPM: 130.5,
        startDate: new Date(2022, 10, 2),
        role: 'player',
    }),
    new Profile({
        id: 4,
        username: 'lindawalker',
        bio: 'Typing enthusiast and tech aficionado.',
        avgWPM: 105.6,
        highestWPM: 125.0,
        startDate: new Date(2017, 10, 2),
        role: 'player',
    }),
    new Profile({
        id: 5,
        username: 'chrisjohnson',
        bio: 'Admin by day, typist by night.',
        avgWPM: 110.8,
        highestWPM: 135.2,
        startDate: new Date(2022, 10, 2),
        role: 'admin',
    }),
];

const getAllProfiles = (): Profile[] => {
    return profiles;
};

const getProfileById = (id: number): Profile | undefined => {
    return profiles.find((profile) => profile.getId() === id);
};

const createProfile = (profile: Profile): Profile => {
    profiles.push(profile);
    return profile;
};

const clearProfiles = (): void => {
    profiles.length = 0;
};

export default {
    getAllProfiles,
    getProfileById,
    createProfile,
    clearProfiles,
};
