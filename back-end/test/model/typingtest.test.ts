import { TypingTest } from '../../model/typingTest';

const typingTestData = {
    wpm: 120,
    accuracy: 98,
    time: 15,
    type: 'singleplayer',
    userId: 1,
    gameId: 1,
};

let typingTest: TypingTest;

beforeEach(() => {
    typingTest = new TypingTest(typingTestData);
});

const { wpm, accuracy, time, type, userId, gameId } = typingTestData;

const createTypingTest = (overrides = {}) => new TypingTest({ ...typingTestData, ...overrides });

test('given: valid values for typingtest, when: typingtest is created, then: typingtest is created with those values.', () => {
    expect(typingTest.getWpm()).toEqual(wpm);
    expect(typingTest.getAccuracy()).toEqual(accuracy);
    expect(typingTest.getTime()).toEqual(time);
    expect(typingTest.getType()).toEqual(type);
    expect(typingTest.getUserId()).toEqual(userId);
    expect(typingTest.getGameId()).toEqual(gameId);
});

test('given: missing wpm, when: typingtest is created, then: an error is thrown.', () => {
    expect(() => createTypingTest({ wpm: undefined })).toThrow('WPM is required');
});

test('given: negative wpm, when: typingtest is created, then: an error is thrown.', () => {
    expect(() => createTypingTest({ wpm: -1 })).toThrow('WPM must be a positive value');
});

test('given: missing accuracy, when: typingtest is created, then: an error is thrown.', () => {
    expect(() => createTypingTest({ accuracy: undefined })).toThrow('Accuracy is required');
});

test('given: accuracy below 0, when: typingtest is created, then: an error is thrown.', () => {
    expect(() => createTypingTest({ accuracy: -1 })).toThrow(
        'Accuracy must be a number between 0 and 100'
    );
});

test('given: accuracy above 100, when: typingtest is created, then: an error is thrown.', () => {
    expect(() => createTypingTest({ accuracy: 101 })).toThrow(
        'Accuracy must be a number between 0 and 100'
    );
});

test('given: missing time, when: typingtest is created, then: an error is thrown.', () => {
    expect(() => createTypingTest({ time: undefined })).toThrow('Time is required');
});

test('given: invalid time, when: typingtest is created, then: an error is thrown.', () => {
    expect(() => createTypingTest({ time: 10 })).toThrow('Time must be either 15, 30, or 60');
});

test('given: missing type, when: typingtest is created, then: an error is thrown.', () => {
    expect(() => createTypingTest({ type: '' })).toThrow('Type is required');
});

test('given: invalid type, when: typingtest is created, then: an error is thrown.', () => {
    expect(() => createTypingTest({ type: 'invalidType' })).toThrow(
        'Type must be either "singleplayer" or "multiplayer"'
    );
});
