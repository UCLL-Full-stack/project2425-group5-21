import { Game } from '../model/game';
import { set } from 'date-fns';
import userDb from './user.db';
import { User } from '../model/user';

// dates

const startDate = set(new Date(), { hours: 8, minutes: 30 });
const endDate = set(new Date(), { hours: 10, minutes: 30 });

const games = [
    new Game({
        startDate: startDate,
        endDate: endDate,
        players: [userDb.getUserById(1), userDb.getUserById(2)].filter((user) => user !== null) as User[],
        status: 'active',
    }),
    new Game({
        startDate: startDate,
        endDate: endDate,
        players: [userDb.getUserById(1), userDb.getUserById(3)].filter((user) => user !== null) as User[],
        status: 'inactive',
    }),
    new Game({
        startDate: startDate,
        endDate: endDate,
        players: [userDb.getUserById(5), userDb.getUserById(6)].filter((user) => user !== null) as User[],
        status: 'active',
    }),
    new Game({
        startDate: startDate,
        endDate: endDate,
        players: [userDb.getUserById(4), userDb.getUserById(7)].filter((user) => user !== null) as User[],
        status: 'inactive',
    }),
];

const getAllGames = (): Game[] => {
    return games;
};

export default {
    getAllGames,
};