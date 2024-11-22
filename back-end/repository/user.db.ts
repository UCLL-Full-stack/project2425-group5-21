import { User } from '../model/user';
import { TypingTest } from '../model/typingTest';
import database from './database';

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany();
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserById = async (id: number): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getTypingTestsByUser = async (userId: number): Promise<TypingTest[]> => {
    try {
        const userTypingTests = await database.user.findUnique({
            where: { id: userId },
            include: { TypingTests: true },
        });

        if (!userTypingTests) {
            throw new Error(`User with ID ${userId} not found.`);
        }

        return userTypingTests.TypingTests.map((typingTestPrisma) =>
            TypingTest.from(typingTestPrisma)
        );
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllUsers,
    getUserById,
    getTypingTestsByUser,
};
