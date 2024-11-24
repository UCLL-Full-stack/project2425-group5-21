import { Game } from '../model/game';
import database from '../util/database';

const getAllGamesWithUsers = async (): Promise<Game[]> => {
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

const getGameByIdWithUsers = async (id: number): Promise<Game | null> => {
    try {
        const gamePrisma = await database.game.findUnique({
            where: { id },
            include: {
                users: true,
            },
        });

        return gamePrisma ? Game.from(gamePrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllGamesWithUsers,
    getGameByIdWithUsers,
};
