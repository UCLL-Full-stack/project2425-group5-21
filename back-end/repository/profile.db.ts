import { Profile } from '../model/profile';
import { set } from 'date-fns';

const startDate = set(new Date(), { hours: 8, minutes: 30 });

const profiles = [
    new Profile({
        id: 1,
        username: 'johndoe',
        bio: 'I love to program and to type fast.',
        avgWPM: 122.34,
        startDate: startDate,
        role: 'player',
    }),
    new Profile({
        id: 2,
        username: 'janetoe',
        bio: 'I love to solve puzzles and to type fast.',
        avgWPM: 98,
        startDate: startDate,
        role: 'player',
    }),
];

const getAllProfiles = (): Profile[] => {
    return profiles;
};

export default {
    getAllProfiles,
};
