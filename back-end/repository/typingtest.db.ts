import { TypingTest } from '../model/typingTest';

const typingTests = [
    new TypingTest({
        id: 1,
        wpm: 120,
        accuracy: 98,
        time: 15,
    }),
    new TypingTest({
        id: 2,
        wpm: 98,
        accuracy: 92,
        time: 30,
    }),
    new TypingTest({
        id: 3,
        wpm: 75,
        accuracy: 87,
        time: 60,
    }),
];

const getAllTypingTests = () : TypingTest[] => {
    return typingTests;
};

export default {
    getAllTypingTests,
};