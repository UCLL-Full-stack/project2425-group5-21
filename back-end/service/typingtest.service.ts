import { TypingTest } from '../model/typingTest';
import typingtestDb from '../repository/typingtest.db';

const getAllTypingTests = async (): Promise<TypingTest[]> => {
    return typingtestDb.getAllTypingTests();
};

export default { getAllTypingTests };
