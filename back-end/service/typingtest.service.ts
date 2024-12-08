import { UnauthorizedError } from 'express-jwt';
import { TypingTest } from '../model/typingTest';
import typingtestDb from '../repository/typingtest.db';
import userDB from '../repository/user.db';

const getTypingTest = async ({
    username,
    role,
}: {
    username: string;
    role: string;
}): Promise<TypingTest[]> => {
    if (role === 'admin') {
        return typingtestDb.getAllTypingTests();
    } else if (role === 'player') {
        return typingtestDb.getTypingTestsByUsername(username);
    } else {
        throw new UnauthorizedError('credentials_required', {
            message: 'Wrong credentials, You are not authorized to access this resource.',
        });
    }
};

const getAllTypingTests = async (): Promise<TypingTest[]> => {
    return typingtestDb.getAllTypingTests();
};

const getTypingTestsByUser = async (userId: number): Promise<TypingTest[]> => {
    const user = await userDB.getUserById(userId);
    if (!user) {
        throw new Error(`User with ID ${userId} does not exist.`);
    }

    return typingtestDb.getTypingTestsByUser(userId);
};

const getTypingTestsByUserAndType = async (userId: number, type: string): Promise<TypingTest[]> => {
    const user = await userDB.getUserById(userId);
    if (!user) {
        throw new Error(`User with ID ${userId} does not exist.`);
    }

    if (type !== 'singleplayer' && type !== 'multiplayer') {
        throw new Error('Invalid type. Type must be either singleplayer or multiplayer.');
    }

    return typingtestDb.getTypingTestsByUserAndType(userId, type);
};

export default {
    getAllTypingTests,
    getTypingTest,
    getTypingTestsByUser,
    getTypingTestsByUserAndType,
};
