import { User } from '../model/user';
import { TypingTest } from '../model/typingTest';
import userDb from '../repository/user.db';

const getAllUsers = async (): Promise<User[]> => {
    return userDb.getAllUsers();
};

const getUserById = async (id: number): Promise<User | null> => {
    return userDb.getUserById(id);
};

const getTypingTestsByUser = async (userId: number): Promise<TypingTest[]> => {
    return userDb.getTypingTestsByUser(userId);
};

export default {
    getAllUsers,
    getUserById,
    getTypingTestsByUser,
};
