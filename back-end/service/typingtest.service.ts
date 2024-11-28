import { UnauthorizedError } from 'express-jwt';
import { TypingTest } from '../model/typingTest';
import typingtestDb from '../repository/typingtest.db';

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
            message: 'You are not authorized to access this resource.',
        });
    }
};

const getAllTypingTests = async (): Promise<TypingTest[]> => {
    return typingtestDb.getAllTypingTests();
};

export default { getAllTypingTests, getTypingTest };
