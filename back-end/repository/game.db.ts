import { Game } from '../model/game';
import { set } from 'date-fns';
import userDb from './user.db';
import { User } from '../model/user';

const startDate = set(new Date(), { hours: 8, minutes: 30 });
const endDate = set(new Date(), { hours: 10, minutes: 30 });

const createGames = async (): Promise<Game[]> => {
    const user1 = await userDb.getUserById(1);
    const user2 = await userDb.getUserById(2);
    const user3 = await userDb.getUserById(3);
    const user4 = await userDb.getUserById(4);
    const user5 = await userDb.getUserById(5);

    return [
        new Game({
            startDate: startDate,
            endDate: endDate,
            players: [user1, user2].filter((user): user is User => user !== null),
            status: 'active',
        }),
        new Game({
            startDate: startDate,
            endDate: endDate,
            players: [user1, user3].filter((user): user is User => user !== null),
            status: 'inactive',
        }),
        new Game({
            startDate: startDate,
            endDate: endDate,
            players: [user5, user4].filter((user): user is User => user !== null),
            status: 'active',
        }),
        new Game({
            startDate: startDate,
            endDate: endDate,
            players: [user4, user2].filter((user): user is User => user !== null),
            status: 'inactive',
        }),
    ];
};

const getAllGames = async (): Promise<Game[]> => {
    return createGames();
};

export default {
    getAllGames,
};
