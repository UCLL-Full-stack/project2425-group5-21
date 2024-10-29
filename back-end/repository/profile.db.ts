import { Profile } from '../model/profile';
import { set } from 'date-fns';

const startDate = set(new Date(), { hours: 8, minutes: 30 });

const profiles = [
    new Profile({
        id: 1,
        username: 'johndoe',
        bio: 'I love to program and to type fast.',
        avgWPM: 122.34,
        highestWPM: 140.34,
        startDate: startDate,
        role: 'player',
    }),
    new Profile({
        id: 2,
        username: 'janetoe',
        bio: 'I love to solve puzzles and to type fast.',
        avgWPM: 98,
        highestWPM: 120.34,
        startDate: startDate,
        role: 'player',
    }),
    new Profile({
        id: 3,
        username: 'johndoe',
        bio: 'I love to program and to type fast.',
        avgWPM: 122.34,
        highestWPM: 140.34,
        startDate: startDate,
        role: 'player',
    }),
    new Profile({
        id: 4,
        username: 'janetoe',
        bio: 'I love to solve puzzles and to type fast.',
        avgWPM: 98,
        highestWPM: 120.34,
        startDate: startDate,
        role: 'player',
    }),
];

const getAllProfiles = (): Profile[] => {
    return profiles;
};

const getProfileById = (id: number): Profile | undefined => {
    return profiles.find((profile) => profile.getId() === id);
};

export default {
    getAllProfiles,
    getProfileById,
};
