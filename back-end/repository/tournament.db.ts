import { Tournament } from '../model/tournament';
import { set } from 'date-fns';

const startDate = set(new Date(), { hours: 8, minutes: 30 });
const endDate = set(new Date(), { hours: 10, minutes: 30 });

const tournaments = [
    new Tournament({
        id: 1,
        name: 'Progamming Java Cup',
        startDate: startDate,
        endDate: endDate,
        difficulity: 'hard',
    }),
    new Tournament({
        id: 2,
        name: 'Progamming Python cup',
        startDate: startDate,
        endDate: endDate,
        difficulity: 'medium',
    }),
];

const getAllTournaments = (): Tournament[] => {
    return tournaments;
};

export default {
    getAllTournaments,
};