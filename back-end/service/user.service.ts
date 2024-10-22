import { User } from '../model/user';
import userDb from '../repository/user.db';

const getAllUsers = async (): Promise<User[]> => {
    return userDb.getAllUsers();
};

const getUserById = async (id: number): Promise<User | null> => {
    const user = userDb.getUserById(id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

export default {
    getAllUsers,
    getUserById,
};
