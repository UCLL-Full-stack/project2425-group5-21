import { Game } from '../model/game';
import gameDb from '../repository/game.db';

const getAllGamesWithUsers = async (): Promise<Game[]> => {
    return gameDb.getAllGamesWithUsers();
};

const getGameByIdWithUsers = async (id: number): Promise<Game | null> => {
    return gameDb.getGameByIdWithUsers(id);
};

export default {
    getAllGamesWithUsers,
    getGameByIdWithUsers,
};
