import { TypingTest } from '../model/typingTest';
import database from '../util/database';

const getAllTypingTests = async (): Promise<TypingTest[]> => {
    try {
        const typingTestsPrisma = await database.typingTest.findMany();
        return typingTestsPrisma.map((typingTestPrisma) => TypingTest.from(typingTestPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};
const getTypingTestsByUsername = async (username: string): Promise<TypingTest[]> => {
    try {
        const typingTestsPrisma = await database.typingTest.findMany({
            where: {
                user: {
                    username,
                },
            },
        });
        return typingTestsPrisma.map((typingTestPrisma) => TypingTest.from(typingTestPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllTypingTests,
    getTypingTestsByUsername,
};
