import { User } from '../model/user';
import { TypingTest } from '../model/typingTest';
import database from '../util/database';
import { UserInput } from '../types';

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
            include: { TypingTests: { include: { user: true } } },
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

const getTypingTestsByUserAndType = async (userId: number, type: string): Promise<TypingTest[]> => {
    try {
        const typingTestsPrisma = await database.typingTest.findMany({
            where: { userId, type },
            include: { user: true },
        });
        return typingTestsPrisma.map((typingTestPrisma) => TypingTest.from(typingTestPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByUsername = async ({ username }: { username: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: { username },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByEmail = async ({ email }: { email: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: { email },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createUser = async ({
    username,
    email,
    password,
    creationDate,
    role,
}: UserInput): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: { username, email, password, creationDate, role },
        });

        return User.from(userPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See error log for details.');
    }
};

const deleteUser = async (userId: number): Promise<void> => {
    try {
        await database.user.delete({
            where: { id: userId },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllUsers,
    getUserById,
    getTypingTestsByUser,
    getTypingTestsByUserAndType,
    createUser,
    getUserByUsername,
    getUserByEmail,
    deleteUser,
};
