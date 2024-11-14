import { Game } from '../model/game';
import database from './database';

const getAllGames = async (): Promise<Game[]> => {
    try {
        const gamesPrisma = await database.game.findMany({
            include: {
                users: true,
            },
        });
        return gamesPrisma.map((gamePrisma) => Game.from(gamePrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllGames,
};
